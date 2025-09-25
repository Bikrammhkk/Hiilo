import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAikfOiv-v127CXBY6pr7E22v9D9nnJhbc",
  authDomain: "syllabus4-95fc2.firebaseapp.com",
  databaseURL: "https://syllabus4-95fc2-default-rtdb.firebaseio.com",
  projectId: "syllabus4-95fc2",
  storageBucket: "syllabus4-95fc2.firebasestorage.app",
  messagingSenderId: "413981967107",
  appId: "1:413981967107:web:ebe531ad21e78c8ae11f36"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

export { database };
