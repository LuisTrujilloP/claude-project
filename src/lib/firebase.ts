import { getApp } from '@react-native-firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged as rnOnAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as rnSignOut,
  type User,
} from '@react-native-firebase/auth';

/**
 * React Native Firebase initialises the default app natively from the
 * `google-services.json` (Android) / `GoogleService-Info.plist` (iOS) files that
 * are compiled into the dev/release build.
 *
 * `getApp()` / `getAuth()` throw at import time if that native config is missing.
 * That is intentional — the app cannot run without a real Firebase project.
 * See README.md -> "2. Firebase setup".
 */
export const firebaseApp = getApp();
export const firebaseAuth = getAuth(firebaseApp);

export type FirebaseUser = User;

/** Subscribe to sign-in / sign-out changes. Returns an unsubscribe function. */
export function subscribeToAuthState(listener: (user: FirebaseUser | null) => void): () => void {
  return rnOnAuthStateChanged(firebaseAuth, listener);
}

export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
}

export function signUpWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
}

export function signOut() {
  return rnSignOut(firebaseAuth);
}
