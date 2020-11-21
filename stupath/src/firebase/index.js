import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCGqrfk-oxGNEFWGW9FGbsHunLZL4LYmog",
  authDomain: "study-path-6d5db.firebaseapp.com",
  databaseURL: "https://study-path-6d5db.firebaseio.com",
  projectId: "study-path-6d5db",
  storageBucket: "study-path-6d5db.appspot.com",
  messagingSenderId: "102402963203",
  appId: "1:102402963203:web:b88b4686d5b951b9cb1b36"
};

firebase.initializeApp(config);

let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

export default {
  db,
  auth,
  storage
};
