'''
Main program to execute other components
'''

from time import sleep
from threading import Thread
import firebase
import audio
import motion_sensor

# TEMP_SAMPLE = 'police-car-sirens-smartsound-fx-1-00-05.mp3'

try:
    # Parallelize motion sensor loop
    motion_sensor_thread = Thread(target=motion_sensor.main)
    
    # Initialize database and storage connections
    firebase.listen_for_changes('user')
    firebase.listen_for_changes('sample')
    firebase.listen_for_changes('volume')
    
    # Make sure database data are properly retrieved
    print('Waiting for database values...')
    while firebase.CURRENT_ACTIVE_USER == firebase.CURRENT_AUDIO_SAMPLE == firebase.CURRENT_AUDIO_VOLUME == None:
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
        if firebase.CURRENT_VOLUME_CHANGED:
            audio.set_volume(firebase.CURRENT_AUDIO_VOLUME)
    
except KeyboardInterrupt:
    print('\nProgram exited.')
