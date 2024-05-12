'''
Module for handling audio playback from Raspberry Pi
'''

from pygame import mixer
from firebase import STORAGE_LOCAL_PATH, CURRENT_ACTIVE_USER, CURRENT_AUDIO_SAMPLE, CURRENT_AUDIO_VOLUME, get_audio_samples
from utils import check_path_exist

def initialize():
    '''Initialize pygame mixer'''
    mixer.init()
    print('Mixer initialized.')


def load_audio():
    '''Load a file into the pygame mixer music module'''
    global SAMPLE_FILE_NAME
    SAMPLE_FILE_NAME = f'{STORAGE_LOCAL_PATH}{CURRENT_ACTIVE_USER}/{CURRENT_AUDIO_SAMPLE}'
    
    if not check_path_exist(SAMPLE_FILE_NAME):
        get_audio_samples(CURRENT_ACTIVE_USER)

    mixer.music.load(SAMPLE_FILE_NAME)
    print(f'Sample loaded: {SAMPLE_FILE_NAME}')


def set_volume():
    '''Sets speficied volume from data in database'''
    mixer.music.set_volume(CURRENT_AUDIO_VOLUME)
    print(f'Set volume successfully: {str(CURRENT_AUDIO_VOLUME * 100)}%')


def play_audio():
    '''Plays the loaded audio sample if not already playing'''
    if not mixer.music.get_busy():
        mixer.music.play()
