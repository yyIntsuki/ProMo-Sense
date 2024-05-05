"""
Module for handling audio playback from Raspberry Pi
"""

from pygame import mixer
from firebase import get_files_from_storage, get_current_user, get_current_volume

CURRENT_ACTIVE_USER = get_current_user()
get_files_from_storage(CURRENT_ACTIVE_USER)
SAMPLE_FILE_NAME = "And His Name is JOHN CENA - Sound Effect (HD).mp3"
FILE_PATH = "../downloads/"


def init_audio():
    """Initialize pygame mixer"""
    mixer.init()
    print("Mixer initialized.")


def load_audio():
    """Load a file into the pygame mixer music module"""
    mixer.music.load(FILE_PATH + CURRENT_ACTIVE_USER + "/" + SAMPLE_FILE_NAME)
    print("Sample loaded.")


def set_volume():
    """Sets speficied volume from data in database"""
    mixer.music.set_volume(get_current_volume())
    print("Set volume successfully.")


def play_audio():
    """Plays the loaded audio sample if not already playing"""
    if not mixer.music.get_busy():
        mixer.music.play()


def audio():
    """Main audio module program"""
    init_audio()
    load_audio()
    set_volume()
