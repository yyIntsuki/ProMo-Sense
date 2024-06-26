'''
Provides functions for Firebase database and storage access
    Pyrebase: https://github.com/thisbejim/Pyrebase
    Storage bucket API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.bucket.Bucket
    Storage blob API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.blob.Blob
'''

import pyrebase
from firebase_config import config
from utils import create_folder, check_path_exist, min_to_sec

# Initialize firebase app
firebase = pyrebase.initialize_app(config)
database = firebase.database()
storage = firebase.storage()

# Global variables
## Paths
STORAGE_REMOTE_PATH = 'user_files'
STORAGE_LOCAL_PATH = 'downloads'
## User
CURRENT_ACTIVE_USER = None
CURRENT_USER_CHANGED = False
## Audio Sample
CURRENT_AUDIO_SAMPLE = None
CURRENT_SAMPLE_CHANGED = False
## Audio Volume
CURRENT_AUDIO_VOLUME = None
CURRENT_VOLUME_CHANGED = False
## Code Lock
CURRENT_LOCK_STATUS = False
CURRENT_LOCK_TIME = None
CURRENT_LOCK_DURATION = None
CURRENT_LOCK_CHANGED = False

def get_audio_samples():
    '''Gets file names from Firebase storage path and downloads them for current user'''
    path = f'{STORAGE_REMOTE_PATH}/{CURRENT_ACTIVE_USER}'
    name_list = storage.bucket.list_blobs(prefix=path)
    
    if check_path_exist(STORAGE_LOCAL_PATH) is False:
        create_folder(STORAGE_LOCAL_PATH)

    for file in name_list:
        user_folder = file.name.split('/')[1]
        file_name = file.name.split('/')[2]
        # full_path = f'{STORAGE_LOCAL_PATH}/{user_folder}/{file_name}'
        full_path = f'{STORAGE_LOCAL_PATH}/{file_name}'

        # create_folder(f'{STORAGE_LOCAL_PATH}/{user_folder}')
        create_folder(f'{STORAGE_LOCAL_PATH}/')
        if not check_path_exist(full_path):
            file.download_to_filename(full_path)
            print(f'Downloading {full_path}.')


def set_data_to_database(component_name, data):
    '''Adds data to firebase, set overrides other data in same path'''
    database.child('data').child(component_name).set(data)


def update_data_to_database(component_name, data):
    '''Update data, does not reset other unspecified data in same path'''
    database.child('data').child(component_name).update(data)


def listen_for_changes(selection):
    '''Indicates if the active data has been changed, possible arguments: user, sample, volume'''

    def stream_handler(message):
        global CURRENT_USER_CHANGED
        global CURRENT_ACTIVE_USER
        
        global CURRENT_AUDIO_SAMPLE
        global CURRENT_SAMPLE_CHANGED
        
        global CURRENT_VOLUME_CHANGED
        global CURRENT_AUDIO_VOLUME
        
        global CURRENT_LOCK_CHANGED
        global CURRENT_LOCK_STATUS
        global CURRENT_LOCK_TIME
        global CURRENT_LOCK_DURATION

        if selection == 'user':
            CURRENT_USER_CHANGED = True
            CURRENT_ACTIVE_USER = message['data']['uid']
            print(f'User: {message["data"]["uid"]}')
            
        if selection == 'sample':
            CURRENT_SAMPLE_CHANGED = True
            CURRENT_AUDIO_SAMPLE = message['data']['name']
            print(f'Sample: {message["data"]["name"]}')
            
        if selection == 'volume':
            CURRENT_VOLUME_CHANGED = True
            CURRENT_AUDIO_VOLUME = message['data']
            print(f'Volume: {message["data"]}')
            
        if selection == 'codelock':
            CURRENT_LOCK_CHANGED = True
            if 'activated' in message['data']:
                CURRENT_LOCK_STATUS = message['data']['activated']
            if 'timestamp' in message['data']:
                CURRENT_LOCK_TIME = message['data']['timestamp']
            if 'duration' in message['data']:
                CURRENT_LOCK_DURATION = min_to_sec(message['data']['duration'])
            print(f'Code-lock: STATUS({CURRENT_LOCK_STATUS}), TIME({CURRENT_LOCK_TIME}), DURATION({CURRENT_LOCK_DURATION})')
            
    if selection == 'user':
        path = 'users/active_user'
    if selection == 'sample':
        path = 'data/audio_module/chosen_sound'
    if selection == 'volume':
        path = 'data/audio_module/volume'
    if selection == 'codelock':
        path = 'data/code_lock'

    database.child(path).stream(stream_handler)
    print(f'Listening to changes for {selection}...')
