var firebaseAdmin = require("firebase-admin")
var serviceAccount = require("/public/data/firebase-adminsdk.json")

if (firebaseAdmin.apps.length == 0) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  })
}

export default firebaseAdmin;