'''
Module for handling audio playback from Raspberry Pi
'''

from pygame import mixer
from utils import check_path_exist

def initialize():
    '''Initialize pygame mixer'''
    mixer.init()
    print('Mixer initialized.')


def load_audio(root_path, user, file_name):
    '''Load a file into the pygame mixer music module'''
    sample_path = f'{root_path}/{user}/{file_name}'
    if check_path_exist(sample_path):
        mixer.music.load(sample_path)
        print(f'Sample loaded: {sample_path}')
    else:
        print(f'Sample not found: {sample_path}')


def set_volume(volume):
    '''Sets speficied volume from data in database'''
    mixer.music.set_volume(volume)
    print(f'Set volume successfully: {str(volume * 100)}%')


def play_audio():
    '''Plays the loaded audio sample if not already playing'''
    if not mixer.music.get_busy():
        mixer.music.play()
