import time
from datetime import datetime
from firebase import firebase
firebase = firebase.FirebaseApplication('https://theredbrickinn-f566b.firebaseio.com/', None)
# input = raw_input("Enter your deal!\n")
for x in range(1):
    firebase.post("/deals/", {'deal':"check" + str(x),'timestamp':datetime.now()})
