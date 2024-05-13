'''
Module for various utility functions to be used in different modules
'''

from os import path, mkdir
from time import time, mktime, localtime, strftime, strptime, gmtime


def get_current_unix_time():
    '''Gets time since the Epoch in seconds, returns seconds'''
    return int(time())


def get_current_formatted_time():
    '''Gets and formats call-time in %m/%d/%Y, %H:%M:%S format'''
    return strftime('%m/%d/%Y, %H:%M:%S', localtime())

def convert_to_unix_time(time):
    '''Converts a formatted time to UNIX format'''
    return int(mktime(strptime(time, "%Y-%m-%d %H:%M:%S")))

def convert_to_str_time(time):
    '''Converts a UNIX time to formatted format'''
    return strftime('%m/%d/%Y, %H:%M:%S', gmtime(time))

def min_to_sec(minutes):
    '''Converts minutes to seconds'''
    return int(minutes) * 60

def create_folder(path_string):
    '''Creates folder at specified path'''
    if not check_path_exist(path_string):
        mkdir(path_string)


def check_path_exist(path_string):
    '''Checks if file / folder exists at specified path'''
    return path.exists(path_string)
