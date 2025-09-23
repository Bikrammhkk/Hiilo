import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAvrVLQPuADdu-8iZ3OvSPqh0J6oxaZbMI",
  authDomain: "syllabus-d093d.firebaseapp.com",
  databaseURL: "https://syllabus-d093d-default-rtdb.firebaseio.com",
  projectId: "syllabus-d093d",
  storageBucket: "syllabus-d093d.firebasestorage.app",
  messagingSenderId: "643456343266",
  appId: "1:643456343266:web:f01652bb7f6dc25a5752bb"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

export { database };
