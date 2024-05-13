'''
Main program to execute other components
'''

from time import sleep
from threading import Thread
from utils import get_current_unix_time, convert_to_str_time
import firebase
import audio
import motion_sensor

MODULE_DEACTIVATE = False

try:
    # Parallelize motion sensor loop
    motion_sensor_thread = Thread(target=motion_sensor.main)
    
    # Initialize database and storage connections
    firebase.listen_for_changes('user')
    firebase.listen_for_changes('sample')
    firebase.listen_for_changes('volume')
    firebase.listen_for_changes('codelock')
    
    # Make sure database data are properly retrieved
    print('Waiting for database values...')
    while any(variable is None for variable in (firebase.CURRENT_ACTIVE_USER, firebase.CURRENT_AUDIO_SAMPLE, firebase.CURRENT_AUDIO_VOLUME)):
        sleep(1)
    print('Database values retrieved.')
    firebase.get_audio_samples()
    
    # Initialize audio
    audio.initialize()
    audio.load_audio(firebase.STORAGE_LOCAL_PATH, firebase.CURRENT_ACTIVE_USER, firebase.CURRENT_AUDIO_SAMPLE)
    audio.set_volume(firebase.CURRENT_AUDIO_VOLUME)
    
    # Initialize motion sensor
    motion_sensor.initialize()
    motion_sensor_thread.start()
    
    # Detect and handle user changes
    while True:
        if firebase.CURRENT_USER_CHANGED or firebase.CURRENT_SAMPLE_CHANGED:
            firebase.get_audio_samples()
            audio.load_audio(firebase.STORAGE_LOCAL_PATH, firebase.CURRENT_ACTIVE_USER, firebase.CURRENT_AUDIO_SAMPLE)
            firebase.CURRENT_USER_CHANGED = False
            firebase.CURRENT_SAMPLE_CHANGED = False
        if firebase.CURRENT_VOLUME_CHANGED:
            audio.set_volume(firebase.CURRENT_AUDIO_VOLUME)
            firebase.CURRENT_VOLUME_CHANGED = False
        if firebase.CURRENT_LOCK_CHANGED:
            if firebase.CURRENT_LOCK_TIME + firebase.CURRENT_LOCK_DURATION > get_current_unix_time():
                print(f'''Code-lock is active!
                    Current time: {convert_to_str_time(get_current_unix_time())}
                    locked until: {convert_to_str_time(firebase.CURRENT_LOCK_TIME + firebase.CURRENT_LOCK_DURATION)}''')
            firebase.CURRENT_LOCK_CHANGED = False
        sleep(1)
    
except KeyboardInterrupt:
    print('\nProgram exited.')
