angular.module('app', ['app.controllers']);

firebase.initializeApp({
    apiKey: "AIzaSyCKx4qN-94uD9TQBckIz5hdA6cX5eugaeA",
    authDomain: "sisdm-396f0.firebaseapp.com",
    databaseURL: "https://sisdm-396f0.firebaseio.com",
    projectId: "sisdm-396f0",
    storageBucket: "sisdm-396f0.appspot.com",
    messagingSenderId: "198119365483"
});

var database = firebase.database();

