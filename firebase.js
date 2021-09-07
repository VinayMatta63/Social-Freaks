import firebase from "firebase/compat/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDsUnytM9TcgLQQG2Jt9MDETXtjeasuiho",
  authDomain: "social-freaks-3201.firebaseapp.com",
  projectId: "social-freaks-3201",
  storageBucket: "social-freaks-3201.appspot.com",
  messagingSenderId: "251290366984",
  appId: "1:251290366984:web:4a116351161d0a75ed8dbd",
  measurementId: "G-91PF9E4W6G",
};

let app = null;
// if (!getApps()) {
app = initializeApp(firebaseConfig);
// app = firebase.initializeApp(firebaseConfig);
// } else {
// app = getApp(); // if already initialized, use that one
// }
const tStamp = serverTimestamp();
const db = getFirestore(app);
const storage = getStorage();
export { db, storage, tStamp };
