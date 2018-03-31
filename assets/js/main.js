"use strict";

// Initialize the Firebase connection
var config = {
    apiKey: "AIzaSyDmoyIPkRW6mPdQOSnj0uXIOipmiU_1gc4",
    authDomain: "recipe-app-52f20.firebaseapp.com",
    databaseURL: "https://recipe-app-52f20.firebaseio.com",
    projectId: "recipe-app-52f20",
    storageBucket: "recipe-app-52f20.appspot.com",
    messagingSenderId: "1016364414039"
  };
  firebase.initializeApp(config);

// create database object
var database = firebase.database();

// How to make something happen when a value changes in the database

// database.ref().on("value", function(snapshot) { something happens
// }, function(errorObject) {
//  console.log("The read failed: " + errorObject.code); });

// how to set a value in the database

// database.ref().set({
// clickCount: clickCounter

// how to read a value from the database

// variable = snapshot.val().KeyValueIdentifierFromDatabase;


// END DATABASE SECTION --- END DATABASE SECTION ---  END DATABASE SECTION

// START API QUERY BUILDER SECTION --- START API QUERY BUILDER SECTION --- 

function buildQueryURL() {
    
    // queryURL is the url we'll use to query the API
    var queryURL = "ourAPI";
    
    // anything else we need to build the query goes here...
    return queryURL;
  }

  // END API QUERY BUILDER SECTION --- END API QUERY BUILDER SECTION ---  