
import firebase from 'firebase/compat/app';


import 'firebase/compat/auth';
import 'firebase/compat/analytics'
import 'firebase/compat/firestore';


const firebaseConfig = {
   apiKey: "AIzaSyDevQ-QfqrP4j_3ZVwU9jiIksrzXPjYE6o",
   authDomain: "mikey-the-chat.firebaseapp.com",
   projectId: "mikey-the-chat",
   storageBucket: "mikey-the-chat.appspot.com",
   messagingSenderId: "341064645073",
   appId: "1:341064645073:web:683c410caaf4ce5b3688f0",
   measurementId: "G-H7RN2EW98C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()



const auth = firebase.auth()
const db = firebase.firestore()


auth.useEmulator('http://localhost:9099')
if (window.location.hostname === 'localhost') {
   db.useEmulator('localhost', 8080) 
}


export { db, auth }
export default firebase
