"""
Module for handling audio playback from Raspberry Pi
"""

import pygame

FILE_PATH = "../downloads/"


def init_audio():
    pygame.mixer.init()


def load_audio(current_active_user, file_name):
    pygame.mixer.music.load(FILE_PATH + current_active_user + "/" + file_name)


def play_audio():
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        continue
