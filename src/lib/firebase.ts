import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD0uA1p7ryN5iyY7tZoJCGceom4vIDByLE",
  authDomain: "syllabus3-d2f8c.firebaseapp.com",
  databaseURL: "https://syllabus3-d2f8c-default-rtdb.firebaseio.com",
  projectId: "syllabus3-d2f8c",
  storageBucket: "syllabus3-d2f8c.firebasestorage.app",
  messagingSenderId: "507725006951",
  appId: "1:507725006951:web:3ca1d354fc0a9af5a3acc2"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

export { database };
