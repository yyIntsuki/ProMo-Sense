"""
Module for various utility functions to be used in different modules
"""

import os
import time


def sleep(seconds):
    """Sleep for n seconds"""
    time.sleep(seconds)


def get_current_time():
    """Gets and formats call-time in %m/%d/%Y, %H:%M:%S format"""
    current_time = time.localtime()
    formatted_time = time.strftime("%m/%d/%Y, %H:%M:%S", current_time)
    return formatted_time


def create_folder(path):
    """Creates folder at desired path"""
    if not os.path.exists(path):
        os.mkdir(path)
