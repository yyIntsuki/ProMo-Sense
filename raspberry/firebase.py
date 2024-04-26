import pyrebase  # Documentation: https://github.com/thisbejim/Pyrebase
import firebaseConfig

# Initialize firebase app
firebase = pyrebase.initialize_app(firebaseConfig.config)
db = firebase.database()

# Push data to firebase
data = {
    "firstName": "John",
    "lastName": "Cena",
}
db.child("dummy-data").child("set").set(data)

# Fetch data from firebase
response = db.child("dummy-data").child("set").get()
print(response.val())
