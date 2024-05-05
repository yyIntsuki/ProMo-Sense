"""
Provides functions for Firebase database and storage access
    Pyrebase: https://github.com/thisbejim/Pyrebase
    Storage bucket API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.bucket.Bucket
    Storage blob API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.blob.Blob
"""

import pyrebase
from firebase_config import config
from utils import create_folder, check_path_exist

# Initialize firebase app
firebase = pyrebase.initialize_app(config)
database = firebase.database()
storage = firebase.storage()

# Global variables
STORAGE_REMOTE_PATH = "user_files/"
STORAGE_LOCAL_PATH = "../downloads/"


def get_current_user():
    """Gets currently active user on web app and set and user to serve"""
    active_user = database.child("users").child("active_user").get()
    for user in active_user.each():
        print("Successfully found user with UID: " + user.val())
        return user.val()


def set_data_to_database(component_name, data):
    """Adds data to firebase, set overrides other data in same path"""
    database.child("data").child(component_name).set(data)


def update_data_to_database(component_name, data):
    """Update data, does not reset other unspecified data in same path"""
    database.child("data").child(component_name).update(data)


def fetch_from_database(component_name):
    """Fetches data from firebase"""
    return database.child("data").child(component_name).get().val()


def get_from_storage(user):
    """Gets file names from Firebase storage path"""
    path = STORAGE_REMOTE_PATH + user
    name_list = storage.bucket.list_blobs(prefix=path)

    create_folder(STORAGE_LOCAL_PATH)

    for file in name_list:
        user_folder = file.name.split("/")[1] + "/"
        file_name = file.name.split("/")[2]
        full_path = STORAGE_LOCAL_PATH + user_folder + file_name

        create_folder(STORAGE_LOCAL_PATH + user_folder)
        if not check_path_exist(full_path):
            file.download_to_filename(full_path)
            print("get_from_storage: " + full_path)
        elif check_path_exist(full_path):
            print("get_from_storage: " + file_name + " already exists.")
