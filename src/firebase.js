import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyC039f2FA8E_0HvUsfJE2PbBa3VoE6e0L4',
	authDomain: 'todo-vuetify-fb908.firebaseapp.com',
	databaseURL: 'https://todo-vuetify-fb908.firebaseio.com',
	projectId: 'todo-vuetify-fb908',
	storageBucket: 'todo-vuetify-fb908.appspot.com',
	messagingSenderId: '308685952823',
	appId: '1:308685952823:web:bd4303d3d7aca736f1ecb2',
	measurementId: 'G-WXDTHXVYH1'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Initialize FireStore
const db = firebase.firestore();

export default db;
