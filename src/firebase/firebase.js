const firebase = require('firebase');

/*
    - use syntax for node
    - Initialize Firebase
    - firebase auth (email + password)
*/ 

const config = {
    apiKey: 'AIzaSyDBkIm1Ol3CPfITQ4bEIgARgDPf4QTsNlU',
    authDomain: 'forever-react.firebaseapp.com',
    databaseURL: 'https://forever-react.firebaseio.com',
    projectId: 'forever-react',
    storageBucket: 'forever-react.appspot.com',
    messagingSenderId: '442013972694'
};

firebase.initializeApp(config);

module.exports = firebase
