import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// const settings = {};

const config = {
    apiKey: "AIzaSyBoA-Xqgm6GBfgf0Sz5id44WaYL1hja7ks",
    authDomain: "rizq-b09d3.firebaseapp.com",
    databaseURL: "https://rizq-b09d3.firebaseio.com",
    projectId: "rizq-b09d3",
    storageBucket: "rizq-b09d3.appspot.com",
    messagingSenderId: "128600397297"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }
// firebase.firestore().settings(settings);

export default firebase;