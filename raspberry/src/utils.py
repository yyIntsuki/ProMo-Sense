"""
Module for various utility functions to be used in different modules
"""

import time
import datetime


def sleep(seconds):
    """Sleep for n seconds"""
    time.sleep(seconds)


def get_current_time():
    """Gets and formats call-time in %m/%d/%Y, %H:%M:%S format"""
    current_time = time.localtime()
    formatted_time = time.strftime("%m/%d/%Y, %H:%M:%S", current_time)
    return formatted_time


def get_running_time(seconds):
    """Formats given seconds to a time string"""
    return str(datetime.timedelta(seconds=seconds))
