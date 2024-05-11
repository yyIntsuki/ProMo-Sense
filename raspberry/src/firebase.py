"""
Provides functions for Firebase database and storage access
    Pyrebase: https://github.com/thisbejim/Pyrebase
    Storage bucket API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.bucket.Bucket
    Storage blob API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.blob.Blob
"""

import pyrebase
from firebase_config import config
from utils import create_folder, check_path_exist

# Initialize firebase app
firebase = pyrebase.initialize_app(config)
database = firebase.database()
storage = firebase.storage()

# Global variables
STORAGE_REMOTE_PATH = "user_files"
STORAGE_LOCAL_PATH = "../downloads"
## User
CURRENT_ACTIVE_USER = None
CURRENT_USER_CHANGED = False
## Audio Sample
CURRENT_AUDIO_SAMPLE = None
CURRENT_SAMPLE_CHANGED = False
## Audio Volume
CURRENT_AUDIO_VOLUME = None
CURRENT_VOLUME_CHANGED = False


def get_current_user():
    """Gets currently active user on web app and set and user to serve"""
    global CURRENT_ACTIVE_USER
    active_user = database.child("users").child("active_user").get()
    for user in active_user.each():
        CURRENT_ACTIVE_USER = user.val()
        return user.val()


def get_current_volume():
    """Gets currently active user on web app and set and user to serve"""
    global CURRENT_AUDIO_VOLUME
    audio_module = database.child("data").child("audio_module").get()
    for data in audio_module.each():
        if data.key() == "volume":
            CURRENT_AUDIO_VOLUME = data.val()
            return data.val()


def get_audio_samples(user):
    """Gets file names from Firebase storage path"""
    path = f"{STORAGE_REMOTE_PATH}/{user}"
    name_list = storage.bucket.list_blobs(prefix=path)

    create_folder(STORAGE_LOCAL_PATH)

    for file in name_list:
        user_folder = file.name.split("/")[1]
        file_name = file.name.split("/")[2]
        full_path = f"{STORAGE_LOCAL_PATH}/{user_folder}/{file_name}"

        create_folder(STORAGE_LOCAL_PATH + user_folder)
        if not check_path_exist(full_path):
            file.download_to_filename(full_path)
            print(f"get_from_storage: {full_path}")
        elif check_path_exist(full_path):
            print(f"get_from_storage: {file_name} already exists.")


def set_data_to_database(component_name, data):
    """Adds data to firebase, set overrides other data in same path"""
    database.child("data").child(component_name).set(data)


def update_data_to_database(component_name, data):
    """Update data, does not reset other unspecified data in same path"""
    database.child("data").child(component_name).update(data)


def listen_for_user_change():
    """Indicates if the active user has been changed"""

    def stream_handler(message):
        print("Event type:", message["event"])  # can be put, patch, or cancel
        print("Path:", message["path"])
        print("Data:", message["data"])

    my_stream = database.child("data/motion_sensor").stream(stream_handler)
