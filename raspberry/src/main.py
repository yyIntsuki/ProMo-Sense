'''
Main program to execute other components
'''

from threading import Thread
import firebase
import audio
import motion_sensor

motion_sensor_thread = Thread(target=motion_sensor.main) # Parallelize motion sensor loop

try:
    # Initialize database and storage connections
    firebase.listen_for_changes('user')
    firebase.listen_for_changes('sample')
    firebase.listen_for_changes('volume')
    # Initialize audio
    audio.initialize()
    audio.load_audio()
    audio.set_volume()
    # Initialize motion sensor
    motion_sensor.initialize()
    motion_sensor_thread.start()
    # Detect and handle user changes
    while True:
        if firebase.CURRENT_USER_CHANGED or firebase.CURRENT_SAMPLE_CHANGED:
            audio.load_audio()
        if firebase.CURRENT_VOLUME_CHANGED:
            audio.set_volume()
except KeyboardInterrupt:
    print('\nProgram exited.')
