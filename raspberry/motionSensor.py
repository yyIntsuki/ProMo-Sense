import time

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

# Sensor initialization
print("Sensor initializing, Please wait for one minute...")
time.sleep(60)
print("Initializing complete.")

# Detection loop
while True:
    print("Waiting for motion...")
    pir.wait_for_motion()
    print("Motion detected!")
    pir.wait_for_no_motion()
