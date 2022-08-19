import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  // signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from 'firebase/firestore';
// getFirestore = database , doc = instance of doc, getDoc = snapshot of ur doc, setDoc = update doc

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

// Initialize Provider(instance) and Auth
const googleProvider = new GoogleAuthProvider(); // we can have multiple provider
googleProvider.getCustomParameters({
  prompt: 'select-account', // only allow to select acc
});
export const auth = getAuth();

// Sign In Functions

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

// FireStore

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userDocSnapshot = await getDoc(userDocRef);

  /* if user does not exist
  user create karna hai
  if exist
  give back user doc ref */
  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('There is a error in users', error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserDocWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback);
