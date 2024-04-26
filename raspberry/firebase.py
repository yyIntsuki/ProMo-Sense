import pyrebase  # Documentation: https://github.com/thisbejim/Pyrebase
import firebaseConfig

# Initialize firebase app
firebase = pyrebase.initialize_app(firebaseConfig.config)
db = firebase.database()


# Push data to firebase
def push_to_db(component_name, data):
    db.child("data").child(component_name).set(data)


# Fetch data from firebase
def fetch_from_db(component_name):
    return db.child("data").child(component_name).get()
