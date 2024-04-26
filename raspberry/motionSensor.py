import time
import vlc
# gpiozero Documentation: https://gpiozero.readthedocs.io/en/latest/api_input.html#gpiozero.MotionSensor
from gpiozero import MotionSensor

player = vlc.MediaPlayer()

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


def play_audio(audio_url):
    player.set_media(vlc.Media(audio_url))
    player.play()

def stream_handler(message):
    if message['event'] == 'put':  
        data = message['data']
        if isinstance(data, dict):  
            audio_url = data.get('url')
        else:  
            audio_url = data
        if audio_url:
            play_audio(audio_url)

my_stream = db.child("selected-audio-url").stream(stream_handler)

# Detection loop
while True:
    print("Waiting for motion...")
    pir.wait_for_motion()
    print("Motion detected!")
   if current_audio_url: 
        play_audio(current_audio_url)
    time.sleep(10) 
    pir.wait_for_no_motion()
