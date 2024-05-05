"""
Module for handling audio playback from Raspberry Pi
"""

from glob import glob
from random import choice
from pygame import mixer
from firebase import get_files_from_storage, get_current_user, get_current_volume

CURRENT_ACTIVE_USER = get_current_user()
get_files_from_storage(CURRENT_ACTIVE_USER)
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
        SAMPLE_FILE_NAME = choice(glob(f"{FILE_PATH}/{CURRENT_ACTIVE_USER}/*"))
    else:
        SAMPLE_FILE_NAME = FILE_PATH + CURRENT_ACTIVE_USER + "/" + SAMPLE_FILE_NAME

    mixer.music.load(SAMPLE_FILE_NAME)
    print("Sample loaded: " + SAMPLE_FILE_NAME)


def set_volume():
    """Sets speficied volume from data in database"""
    current_volume = get_current_volume()
    mixer.music.set_volume(current_volume)
    print("Set volume successfully: " + str(current_volume * 100) + "%")


def play_audio():
    """Plays the loaded audio sample if not already playing"""
    if not mixer.music.get_busy():
        mixer.music.play()


def audio():
    """Main audio module program"""
    init_audio()
    load_audio()
    set_volume()
