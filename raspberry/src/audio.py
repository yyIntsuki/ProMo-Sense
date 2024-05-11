"""
Module for handling audio playback from Raspberry Pi
"""

from glob import glob
from random import choice
from pygame import mixer
import firebase

SAMPLE_FILE_NAME = None
FILE_PATH = "../downloads"


def init_audio():
    """Initialize pygame mixer"""
    mixer.init()
    print("Mixer initialized.")


def load_audio():
    """Load a file into the pygame mixer music module"""
    global SAMPLE_FILE_NAME

    if not SAMPLE_FILE_NAME:
        SAMPLE_FILE_NAME = choice(glob(f"{FILE_PATH}/{firebase.CURRENT_ACTIVE_USER}/*"))
    else:
        SAMPLE_FILE_NAME = f"{FILE_PATH}{firebase.CURRENT_ACTIVE_USER}/{SAMPLE_FILE_NAME}"

    mixer.music.load(SAMPLE_FILE_NAME)
    print(f"Sample loaded: {SAMPLE_FILE_NAME}")


def set_volume():
    """Sets speficied volume from data in database"""
    mixer.music.set_volume(firebase.CURRENT_AUDIO_VOLUME)
    print(f"Set volume successfully: {str(firebase.CURRENT_AUDIO_VOLUME * 100)}%")


def play_audio():
    """Plays the loaded audio sample if not already playing"""
    if not mixer.music.get_busy():
        mixer.music.play()
