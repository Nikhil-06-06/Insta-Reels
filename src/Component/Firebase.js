import firebase from 'firebase/compat/app'
import 'firebase/compat/auth' 
import 'firebase/compat/storage' 
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAFwDCRAAI65PtZv_p7L_sQnnzZHjLRuuE",
    authDomain: "reels-ea583.firebaseapp.com",
    projectId: "reels-ea583",
    storageBucket: "reels-ea583.appspot.com",
    messagingSenderId: "1037229030618",
    appId: "1:1037229030618:web:6e496cbeba793ca27639e3"
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