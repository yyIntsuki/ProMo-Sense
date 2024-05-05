"""
Module for handling motion sensor main functionality
    gpiozero: https://gpiozero.readthedocs.io/en/latest/api_input.html#gpiozero.MotionSensor
    PIR: raspberry/docs/HC-SR501 PIR Sensor_EN.pdf
"""

from gpiozero import MotionSensor
from utils import sleep, get_current_time, get_current_formatted_time
from firebase import (
    set_data_to_database,
    update_data_to_database,
    get_current_user,
    get_from_storage,
)
from audio import init_audio, load_audio, play_audio

# Pin configuration
PIR_PIN_OUT = 21  # GPIO21, pin 40 on Raspberry
pir = MotionSensor(PIR_PIN_OUT)

# Global variables
COMPONENT_NAME = "motion_sensor"
CURRENT_RUNNING_TIME = None
LAST_TIME_DETECTED = None
CURRENT_ACTIVE_USER = get_current_user()
CURRENT_AUDIO_SAMPLE = "And His Name is JOHN CENA - Sound Effect (HD).mp3"


def status_initialization():
    """Function to reset all data values"""
    return {
        "initialized": False,
        "detected": False,
        "time_detected": False,
        "time_running": False,
    }


def initialize_sensor():
    """Sensor initialization"""
    global CURRENT_RUNNING_TIME

    set_data_to_database(COMPONENT_NAME, status_initialization())
    print("Sensor initializing, Please wait...")

    seconds = 0
    while seconds < 30:
        if pir.motion_detected:
            break
        sleep(1)
        seconds += 1

    update_data_to_database(COMPONENT_NAME, {"initialized": True, "time_running": 0})
    CURRENT_RUNNING_TIME = get_current_time()
    print("Initialization complete.")


get_from_storage(CURRENT_ACTIVE_USER)
initialize_sensor()
init_audio()
load_audio(CURRENT_ACTIVE_USER, CURRENT_AUDIO_SAMPLE)

# Detection loop
CURRENT_STATE = False
PREVIOUS_STATE = False
RUNTIME_INTERVAL = 20

while True:
    CURRENT_STATE = pir.motion_detected

    if CURRENT_STATE is True and PREVIOUS_STATE is False:
        print("Motion detected!")
        update_data_to_database(
            COMPONENT_NAME,
            {"detected": True, "time_detected": get_current_formatted_time()},
        )
        play_audio()
        PREVIOUS_STATE = True

    elif CURRENT_STATE is False and PREVIOUS_STATE is True:
        print("Waiting for motion...")
        update_data_to_database(COMPONENT_NAME, {"detected": False})
        PREVIOUS_STATE = False

    sleep(1)
    current_time = get_current_time()
    time_delta = current_time - CURRENT_RUNNING_TIME

    if time_delta % RUNTIME_INTERVAL == 0:
        update_data_to_database(COMPONENT_NAME, {"time_running": time_delta})
