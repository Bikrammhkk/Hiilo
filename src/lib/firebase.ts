import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAQpdt1J7N_9bbiW3IozgEKPISc3F8-7JY",
  authDomain: "syllabus-2.firebaseapp.com",
  databaseURL: "https://syllabus-2-default-rtdb.firebaseio.com",
  projectId: "syllabus-2",
  storageBucket: "syllabus-2.firebasestorage.app",
  messagingSenderId: "406594599435",
  appId: "1:406594599435:web:31640b722c24c016f9a50e"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

export { database };
