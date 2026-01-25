
'use client';
import { collection, getDocs, writeBatch, Firestore, doc } from 'firebase/firestore';
import { initialServices } from '@/lib/services-data';
import { initialDestinations } from '@/lib/destinations-data';
import { errorEmitter, FirestorePermissionError } from '@/firebase';

// This function should only be called from the client-side.
export async function seedServices(firestore: Firestore) {
  const servicesCollection = collection(firestore, 'services');
  
  let snapshot;
  try {
    snapshot = await getDocs(servicesCollection);
  } catch (error) {
    const contextualError = new FirestorePermissionError({
      operation: 'list',
      path: servicesCollection.path,
    });
    errorEmitter.emit('permission-error', contextualError);
    return; // Stop execution if we can't read the collection
  }

  if (snapshot.empty) {
    console.log('Services collection is empty. Seeding initial data...');
    const batch = writeBatch(firestore);
    
    initialServices.forEach((service) => {
      const docRef = doc(servicesCollection);
      batch.set(docRef, service);
    });
    
    try {
      await batch.commit();
      console.log('Successfully seeded services data.');
    } catch (error) {
      const contextualError = new FirestorePermissionError({
        operation: 'create',
        path: servicesCollection.path,
        requestResourceData: initialServices,
      });
      errorEmitter.emit('permission-error', contextualError);
    }
  }
}


export async function seedDestinations(firestore: Firestore) {
  const destinationsCollection = collection(firestore, 'destinations');
  
  let snapshot;
  try {
    snapshot = await getDocs(destinationsCollection);
  } catch (error) {
    const contextualError = new FirestorePermissionError({
      operation: 'list',
      path: destinationsCollection.path,
    });
    errorEmitter.emit('permission-error', contextualError);
    return;
  }

  if (snapshot.empty) {
    console.log('Destinations collection is empty. Seeding initial data...');
    const batch = writeBatch(firestore);
    
    initialDestinations.forEach((destination) => {
      const docRef = doc(destinationsCollection);
      batch.set(docRef, destination);
    });
    
    try {
      await batch.commit();
      console.log('Successfully seeded destinations data.');
    } catch (error) {
      const contextualError = new FirestorePermissionError({
        operation: 'create',
        path: destinationsCollection.path,
        requestResourceData: initialDestinations,
      });
      errorEmitter.emit('permission-error', contextualError);
    }
  }
}
