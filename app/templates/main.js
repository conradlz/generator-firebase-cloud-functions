// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
// initializes the app
admin.initializeApp(functions.config().firebase);

// add more dependencies here
// const yourFunction = require('./<your function>.js')

// add your functions here
// exports.test = functions.https.onRequest(yourFunction);