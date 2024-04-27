"""
Provides functions for firebase access
    Pyrebase: https://github.com/thisbejim/Pyrebase
"""

import pyrebase
import firebaseConfig

# Initialize firebase app
firebase = pyrebase.initialize_app(firebaseConfig.config)
db = firebase.database()


def push_to_db(component_name, data):
    """Push data to firebase"""
    db.child("data").child(component_name).set(data)


def fetch_from_db(component_name):
    """Fetch data from firebase"""
    return db.child("data").child(component_name).get()
