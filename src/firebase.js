import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD9Eh0A4niPMlnDzoTrGaFDcfet6gbBM3I",
    authDomain: "quoraclone-e7ecd.firebaseapp.com",
    projectId: "quoraclone-e7ecd",
    storageBucket: "quoraclone-e7ecd.appspot.com",
    messagingSenderId: "39469838820",
    appId: "1:39469838820:web:2a39cfa574441268af97f1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider();

export const db = firebaseApp.firestore();

export { auth, provider};
// export default db;

export const firestore = firebase.firestore();

export const database = {
    users: firestore.collection("users"),
    // questions: firestore.collection("questions"),
    getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();