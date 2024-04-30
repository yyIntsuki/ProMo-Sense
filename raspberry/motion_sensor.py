"""
Module for handling motion sensor main functionality
    gpiozero: https://gpiozero.readthedocs.io/en/latest/api_input.html#gpiozero.MotionSensor
    PIR: .\docs\HC-SR501 PIR Sensor_EN.pdf
"""

from threading import Thread
from utils import sleep, get_current_time, get_running_time
from firebase import push_to_db
from gpiozero import MotionSensor

# Pin configuration
PIR_PIN_3 = 17  # GPIO17, pin 11 on Raspberry
pir = MotionSensor(PIR_PIN_3)

# Global variables
COMPONENT_NAME = "motion_sensor"
CURRENT_RUNNING_TIME = 0
LAST_TIME_DETECTED = None


def status(init=True, detected=False):
    """Sensor status template"""
    global LAST_TIME_DETECTED
    if detected:
        time_detected = get_current_time()
        LAST_TIME_DETECTED = time_detected
    else:
        time_detected = LAST_TIME_DETECTED

    time_running = get_running_time(CURRENT_RUNNING_TIME)

    return {
        "init": init,
        "detected": detected,
        "time_detected": time_detected,
        "time_running": time_running,
    }


def timer():
    """Sensor alive status with threading, refreshes every 30 seconds to save quota"""
    global CURRENT_RUNNING_TIME
    while True:
        push_to_db(COMPONENT_NAME, status())
        sleep(30)
        CURRENT_RUNNING_TIME += 30


# Sensor initialization
push_to_db(COMPONENT_NAME, status(init=False))
print("Sensor initializing, Please wait for one minute...")
sleep(60)
push_to_db(COMPONENT_NAME, status())
print("Initializing complete.")

# Keep track of alive status
timer_thread = Thread(target=timer, daemon=True)
timer_thread.start()

# Detection loop
while True:
    print("Waiting for motion...")
    pir.wait_for_motion()
    push_to_db(COMPONENT_NAME, status())

    print("Motion detected!")
    pir.wait_for_no_motion()
    push_to_db(COMPONENT_NAME, status(detected=True))
