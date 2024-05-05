"""
Main program to execute other components
"""

from audio import audio
from motion_sensor import motion_sensor

try:
    audio()
    motion_sensor()

except KeyboardInterrupt:
    print("\nProgram exited.")
