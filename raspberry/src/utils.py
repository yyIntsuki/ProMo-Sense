'''
Module for various utility functions to be used in different modules
'''

from os import path, mkdir
from time import mktime, localtime, strftime


def get_current_time():
    '''Gets time since the Epoch in seconds, returns seconds'''
    return mktime(localtime())


def get_current_formatted_time():
    '''Gets and formats call-time in %m/%d/%Y, %H:%M:%S format'''
    return strftime('%m/%d/%Y, %H:%M:%S', localtime())


def create_folder(path_string):
    '''Creates folder at specified path'''
    if not check_path_exist(path_string):
        mkdir(path_string)


def check_path_exist(path_string):
    '''Checks if file / folder exists at specified path'''
    return path.exists(path_string)
