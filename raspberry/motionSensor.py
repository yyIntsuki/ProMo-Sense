from utils import sleep, get_current_time, get_running_time
from threading import Thread
from firebase import push_to_db

# gpiozero Documentation: https://gpiozero.readthedocs.io/en/latest/api_input.html#gpiozero.MotionSensor
from gpiozero import MotionSensor

## PIR Sensor datasheet: https://docs.rs-online.com/6a22/0900766b8125a3ed.pdf
## PIN Positions, top-left: GND
# PIR pin_1 - GND: Ground: 0 V
# PIR pin_2 - V_cc: Supply Voltage: 5V
# PIR pin_3 - OUT: PIR signaling; HIGH = movement / LOW = no movement

# Pin configuration
PIR_pin_3 = 17  # GPIO17, pin 11 on Raspberry
pir = MotionSensor(PIR_pin_3)

# Global variables
component_name = "motion_sensor"
last_time_detected = None
current_running_time = 0


# Sensor status template
def status(init=True, detected=False):
    global last_time_detected
    global current_running_time

    if detected == True:
        time_detected = get_current_time()
        last_time_detected = time_detected
    else:
        time_detected = last_time_detected

    time_running = get_running_time(current_running_time)

    return {
        "init": init,
        "detected": detected,
        "time_detected": time_detected,
        "time_running": time_running,
    }


# Sensor alive status with threading, refreshes every 30 seconds to save quota
def timer():
    global current_running_time
    while True:
        push_to_db(component_name, status())
        sleep(30)
        current_running_time += 30


# Sensor initialization
push_to_db(component_name, status(init=False))
print("Sensor initializing, Please wait for one minute...")
sleep(60)
push_to_db(component_name, status())
print("Initializing complete.")

# Keep track of alive status
timer_thread = Thread(target=timer, daemon=True)
timer_thread.start()

# Detection loop
while True:
    print("Waiting for motion...")
    pir.wait_for_motion()
    push_to_db(component_name, status())

    print("Motion detected!")
    pir.wait_for_no_motion()
    push_to_db(component_name, status(detected=True))
