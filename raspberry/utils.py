import time
import datetime


def sleep(n):
    time.sleep(n)


def get_current_time():
    current_time = time.localtime()
    formatted_time = time.strftime("%m/%d/%Y, %H:%M:%S", current_time)
    return formatted_time


def get_running_time(second):
    return str(datetime.timedelta(seconds=second))
