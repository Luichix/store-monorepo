import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Coloca tus credenciales de Firebase aquí
};

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;

// Initialize Firebase
if (getApps().length < 1) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = initializeAuth(firebaseApp);
} else {
  firebaseApp = getApp();
  auth = getAuth();
}

export { firebaseApp, auth };
