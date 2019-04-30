const firebase = require('firebase');

/*
    - use syntax for node
    - Initialize Firebase
    - firebase auth (email + password)
*/ 
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
console.log('FIREBASE CONFIG: ', JSON.stringify(config, undefined, 2));
firebase.initializeApp(config);

const database = firebase.database();

module.exports = firebase;
