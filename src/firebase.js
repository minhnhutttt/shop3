import firebase from 'firebase'
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDKLsFvsrAYfWRGdXlrcwXES-9oZRBRjcM",
    authDomain: "vue-shop-93ce4.firebaseapp.com",
    databaseURL: "https://vue-shop-93ce4.firebaseio.com",
    projectId: "vue-shop-93ce4",
    storageBucket: "vue-shop-93ce4.appspot.com",
    messagingSenderId: "1010780981397",
    appId: "1:1010780981397:web:783df52c0c5e75088cb39c",
    measurementId: "G-9RJCX12LQE"
  };
  // Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
 export {fb,db}
  firebase.analytics();