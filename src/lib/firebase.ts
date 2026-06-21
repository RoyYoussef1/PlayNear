import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, Auth } from 'firebase/auth';
// getReactNativePersistence exists in the React Native build of firebase/auth
// but is missing from the web type defs, so we silence the type error here.
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCakynKBEDr7tgtI4zB4D4LCxY4QvOSsU0',
  authDomain: 'amiable-variety-412520.firebaseapp.com',
  projectId: 'amiable-variety-412520',
  storageBucket: 'amiable-variety-412520.firebasestorage.app',
  messagingSenderId: '541254440382',
  appId: '1:541254440382:web:b73b0226572ea8456055ef',
  measurementId: 'G-1C2CEEY9R4',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { auth };