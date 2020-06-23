import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyABJkHp1tqra6z4ASu0P6hihbb0haKmloM',
	authDomain: 'fertilizerapp-ae380.firebaseapp.com',
	databaseURL: 'https://fertilizerapp-ae380.firebaseio.com',
	projectId: 'fertilizerapp-ae380',
	storageBucket: 'fertilizerapp-ae380.appspot.com',
	messagingSenderId: '280214718585',
	appId: '1:280214718585:web:9010b65d2b6f2c9b10eca8',
	measurementId: 'G-PDN1W2WZEM'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Initialize FireStore
const db = firebase.firestore();
const functions = firebase.functions();
const auth = firebase.auth();

export { functions, auth };
export default db;
