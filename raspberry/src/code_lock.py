import RPi.GPIO as GPIO
import firebase
from time import sleep
from utils import get_current_unix_time

# Set up GPIO using BCM numbering
GPIO.setmode(GPIO.BCM)
CODELOCK_PIN_OUT = 20
GPIO.setup(CODELOCK_PIN_OUT, GPIO.IN)

COMPONENT_NAME = 'code_lock'

# Status template
def status_active():
    '''Function to update active status and timestamp'''
    return { 'activated': True, 'timestamp': get_current_unix_time()}


def main():
    '''Main code-lock program'''
    # Due to signal noise, we have to set a threshold to not activate the code-lock on accident
    active_time = 0
    active_time_threshold = 20
    
    while True:
        # Read the state of the GPIO pin
        input_state = GPIO.input(CODELOCK_PIN_OUT)
        if input_state == GPIO.HIGH and active_time < active_time_threshold:
            active_time += .1
        if input_state == GPIO.LOW and active_time > 0:
            active_time = 0
            
        # Update firebase if code-lock was active for longer than a specific time.
        if active_time >= active_time_threshold and get_current_unix_time() > firebase.CURRENT_LOCK_TIME + firebase.CURRENT_LOCK_DURATION:
            firebase.update_data_to_database(COMPONENT_NAME, status_active())
            sleep(5)

        sleep(.1)
