import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCkxg6E6LlZD7azUR_vmk0jIWKGe_j4HSk',
  authDomain: 'ak-clothing-6a00a.firebaseapp.com',
  projectId: 'ak-clothing-6a00a',
  storageBucket: 'ak-clothing-6a00a.appspot.com',
  messagingSenderId: '747394707583',
  appId: '1:747394707583:web:811c6d7f9783aa12354f4a',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // we can have multiple provider
provider.getCustomParameters({
  prompt: 'select-account', // only allow to select acc
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
