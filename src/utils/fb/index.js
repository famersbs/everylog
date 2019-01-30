import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyBy4nC6QyjF9c5vGEelyB5sHKVz36n8Np0",
  authDomain: "everylog-538f6.firebaseapp.com",
  databaseURL: "https://everylog-538f6.firebaseio.com",
  projectId: "everylog-538f6",
  storageBucket: "everylog-538f6.appspot.com",
  messagingSenderId: "888015752192"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase
export const store = firebase.firestore()
export const auth = firebase.auth
