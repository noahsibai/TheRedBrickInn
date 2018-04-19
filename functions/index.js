//import firebase functions modules
const functions = require('firebase-functions');
//import admin module
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var hours = 1460; // Change this to length or shorten time before database

// Listens for new messages added to messages/:pushId
exports.pushNotification = functions.database.ref('/deals/{pushId}').onWrite( (change, context) => {

    console.log('Push notification event triggered');
    //  Grab the current value of what was written to the Realtime Database.
    const deal = change.after.val();
    console.log(deal['deal']);


  // Create a notification
    const payload = {
        notification: {
            title:"The Red Brick Inn - New Special",
            body: deal['deal'],
            sound: "default"
        },
    };

  //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    return admin.messaging().sendToTopic("pushNotifications", payload, options);
});

exports.deleteOldItems = functions.database.ref('/deals/{pushId}').onWrite((change, context) => {
  const ref = change.after.ref.parent; // reference to the items
  const now = Date.now();
  const cutoff = now - hours * 60 * 60 * 1000;
  console.log(now + " " + cutoff);
  const oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
  return oldItemsQuery.once('value', function(snapshot) {
    // create a map with all children that need to be removed
    const updates = {};
    snapshot.forEach(function(child) {
      updates[child.key] = null
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
  });
});
