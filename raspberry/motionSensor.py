from utils import sleep, get_time
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

component_name = "motion_sensor"


# Sensor status template
def status(init, detect):
    return {"initialized": init, "time": get_time(), "detected": detect}


# Sensor initialization
push_to_db(component_name, status(False, False))
print("Sensor initializing, Please wait for one minute...")
sleep(60)
push_to_db(component_name, status(True, False))
print("Initializing complete.")

# Detection loop
while True:
    print("Waiting for motion...")
    pir.wait_for_motion()
    push_to_db(component_name, status(True, True))
    print("Motion detected!")
    pir.wait_for_no_motion()
    push_to_db(component_name, status(True, True))
