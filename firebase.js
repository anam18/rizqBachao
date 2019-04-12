import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {};

const config = {
    apiKey: "AIzaSyAw2CKo_2wIb0r86HgkLJL0aTmKafbjQmQ",
    authDomain: "test-5a904.firebaseapp.com",
    databaseURL: "https://test-5a904.firebaseio.com",
    projectId: "test-5a904",
    storageBucket: "test-5a904.appspot.com",
    messagingSenderId: "1063116636334"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }
firebase.firestore().settings(settings);

export default firebase;