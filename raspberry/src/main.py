"""
Main program to execute other components
"""

import audio
import motion_sensor

try:
    # Initialize audio
    audio.init_audio()
    audio.load_audio()
    audio.set_volume()
    # Initialize motion sensor
    motion_sensor.initialize()
    motion_sensor.main()

except KeyboardInterrupt:
    print("\nProgram exited.")
