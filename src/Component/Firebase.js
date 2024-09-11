import firebase from 'firebase/compat/app'
import 'firebase/compat/auth' 
import 'firebase/compat/storage' 
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCGMt8vUE6-RMeKFKwrRvQ8j6To4JqhyMQ",
  authDomain: "reelify-7a429.firebaseapp.com",
  projectId: "reelify-7a429",
  storageBucket: "reelify-7a429.appspot.com",
  messagingSenderId: "632413269432",
  appId: "1:632413269432:web:98b769fa5ab1f34e54b34d",
  measurementId: "G-693L082CJR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();

const firestore=firebase.firestore();
export const database={
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  comments : firestore.collection('comments'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage= firebase.storage();