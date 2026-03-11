import { firebaseConfig } from '@/backend/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
/**
 * Initializes Firebase app and returns the core SDKs.
 * Handles singleton pattern - only initializes once even if called multiple times.
 * 
 * @returns Object containing firebaseApp and firestore instances
 * @throws Error if Firebase initialization fails and fallback also fails
 */
export function initializeFirebase() {
  if (!getApps().length) {
    // Initialize with the generated config.
    // In typical Vercel/NextJS deployments, this static config is sufficient.
    let firebaseApp;
    try {
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      // Log warning but don't expose sensitive error details
      if (process.env.NODE_ENV === 'development') {
        console.warn('[initializeFirebase] Firebase initialization with config failed, attempting fallback:', e);
      }
      // Fallback if there's any App Hosting or environment defaults
      firebaseApp = initializeApp();
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

/**
 * Extracts and returns the core Firebase SDKs from a FirebaseApp instance.
 * 
 * @param firebaseApp - The initialized Firebase app instance
 * @returns Object containing firebaseApp and firestore instances
 */
export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
