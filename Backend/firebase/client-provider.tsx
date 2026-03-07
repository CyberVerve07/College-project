'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/backend/firebase/provider';
import { initializeFirebase } from '@/backend/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

/**
 * Wrapper component to initialize Firebase on the client side.
 * Ensures Firebase is initialized only once and provides the context to children.
 *
 * @param {FirebaseClientProviderProps} props - Children elements.
 */
export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount



  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
