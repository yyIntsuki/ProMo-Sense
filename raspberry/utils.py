import time


def sleep(n):
    time.sleep(n)


def get_time():
    current_time = time.localtime()
    formatted_time = time.strftime("%m/%d/%Y, %H:%M:%S", current_time)
    return formatted_time
