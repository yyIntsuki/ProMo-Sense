"""
Module for various utility functions to be used in different modules
"""

import os
import time


def sleep(seconds):
    """Sleep for n seconds"""
    time.sleep(seconds)


def get_current_time():
    """Gets time since the Epoch in seconds, returns seconds"""
    return time.mktime(time.localtime())


def get_current_formatted_time():
    """Gets and formats call-time in %m/%d/%Y, %H:%M:%S format"""
    return time.strftime("%m/%d/%Y, %H:%M:%S", time.localtime())


def create_folder(path):
    """Creates folder at specified path"""
    if not check_path_exist(path):
        os.mkdir(path)


def check_path_exist(path):
    """Checks if file / folder exists at specified path"""
    return os.path.exists(path)
