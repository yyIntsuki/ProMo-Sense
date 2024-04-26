import time
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

component_name = "MotionSensor"


def get_time():
    current_time = time.localtime()
    formatted_time = time.strftime("%m/%d/%Y, %H:%M:%S", current_time)
    return formatted_time


# Sensor initialization
print("Sensor initializing, Please wait for one minute...")
time.sleep(60)
print("Initializing complete.")

# Detection loop
while True:
    print("Waiting for motion...")
    pir.wait_for_motion()
    push_to_db("Motion Sensor", {"time": get_time(), "detected": True})
    print("Motion detected!")
    pir.wait_for_no_motion()
    push_to_db("Motion Sensor", {"time": get_time(), "detected": False})
