'''
Module for handling motion sensor main functionality
    gpiozero: https://gpiozero.readthedocs.io/en/latest/api_input.html#gpiozero.MotionSensor
    PIR: raspberry/docs/HC-SR501 PIR Sensor_EN.pdf
'''

from time import sleep
from gpiozero import MotionSensor
from firebase import set_data_to_database, update_data_to_database
from utils import get_current_time, get_current_formatted_time
from audio import play_audio

# Pin configuration
PIR_PIN_OUT = 21  # GPIO21, pin 40 on Raspberry
pir = MotionSensor(PIR_PIN_OUT)

# Global variables
COMPONENT_NAME = 'motion_sensor'
RUNNING_START_TIME = None
LAST_TIME_DETECTED = None


# Status templates
def status_init_start():
    '''Function to reset all data values'''
    return {
        'initialized': False,
        'detected': False,
        'time_detected': False,
        'time_running': False,
    }


def status_init_end():
    '''For finished initialization'''
    return {'initialized': True, 'time_running': 0}


def status_detected():
    '''For when motion is detected'''
    return {'detected': True, 'time_detected': get_current_formatted_time()}


def status_undetected():
    '''For when motion is not detected'''
    return {'detected': False}


def status_running_time(time_delta):
    '''For reporting to db about running time'''
    return {'time_running': time_delta}


def initialize():
    '''Sensor initialization'''
    global RUNNING_START_TIME
    
    set_data_to_database(COMPONENT_NAME, status_init_start())
    print('Sensor initializing, Please wait...')

    seconds = 0
    while seconds < 30:
        if pir.motion_detected:
            break
        sleep(1)
        seconds += 1

    update_data_to_database(COMPONENT_NAME, status_init_end())
    RUNNING_START_TIME = get_current_time()
    print('Initialization complete.')


def main():
    '''Main motion sensor program'''
    current_state = False
    previous_state = False
    runtime_interval = 20
    # Detection loop
    while True:
        current_state = pir.motion_detected

        if current_state is True and previous_state is False:
            print('Motion detected!')
            update_data_to_database(COMPONENT_NAME, status_detected())
            play_audio()
            previous_state = True

        elif current_state is False and previous_state is True:
            update_data_to_database(COMPONENT_NAME, status_undetected())
            previous_state = False

        sleep(1)
        current_time = get_current_time()
        time_delta = current_time - RUNNING_START_TIME

        if time_delta % runtime_interval == 0:
            update_data_to_database(COMPONENT_NAME, status_running_time(time_delta))
