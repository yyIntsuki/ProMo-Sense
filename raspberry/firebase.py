"""
Provides functions for Firebase database and storage access
    Pyrebase: https://github.com/thisbejim/Pyrebase
    Storage bucket API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.bucket.Bucket
    Storage blob API: https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.blob.Blob
"""

import os
import pyrebase
from firebase_config import config

# Initialize firebase app
firebase = pyrebase.initialize_app(config)
database = firebase.database()
storage = firebase.storage()

# Global variables
STORAGE_REMOTE_PATH = ""
STORAGE_LOCAL_PATH = "downloads/"


def push_to_database(component_name, data):
    """Push data to firebase"""
    database.child("data").child(component_name).set(data)


def fetch_from_database(component_name):
    """Fetch data from firebase"""
    return database.child("data").child(component_name).get()


def get_from_storage(path):
    """Gets file names from Firebase storage path"""
    name_list = storage.bucket.list_blobs(prefix=path)

    # Creates the downloads folder
    if not os.path.exists(STORAGE_LOCAL_PATH):
        os.mkdir(STORAGE_LOCAL_PATH)

    for file in name_list:
        print(file.media_link)
        file.download_to_filename(STORAGE_LOCAL_PATH + file.name)


# TEST
get_from_storage(STORAGE_REMOTE_PATH)
