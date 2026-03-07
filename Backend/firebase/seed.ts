
'use client';
import { collection, getDocs, writeBatch, Firestore, doc } from 'firebase/firestore';
import { initialServices } from '@/images/services-data';
import { initialDestinations } from '@/images/destinations-data';
import { errorEmitter, FirestorePermissionError } from '@/backend/firebase';

// This function should only be called from the client-side.
/**
 * Seeds the 'services' collection in Firestore with initial data.
 * CAUTION: This deletes all existing services before adding new ones.
 *
 * @param {Firestore} firestore - Firestore instance.
 */
export async function seedServices(firestore: Firestore) {
  const servicesCollection = collection(firestore, 'services');

  // 1. Delete all existing documents to ensure no duplicates/old data
  const snapshot = await getDocs(servicesCollection);
  const deleteBatch = writeBatch(firestore);
  snapshot.docs.forEach((doc) => {
    deleteBatch.delete(doc.ref);
  });
  await deleteBatch.commit();
  console.log('Cleared existing services data.');

  // 2. Add strict new data
  const batch = writeBatch(firestore);
  console.log('Seeding strict services data...');

  initialServices.forEach((service) => {
    const docRef = service.id
      ? doc(servicesCollection, service.id)
      : doc(servicesCollection);

    batch.set(docRef, service);
  });

  try {
    await batch.commit();
    console.log('Successfully seeded strict services list (8 unique vehicles).');
  } catch (error) {
    const contextualError = new FirestorePermissionError({
      operation: 'create',
      path: servicesCollection.path,
      requestResourceData: initialServices,
    });
    errorEmitter.emit('permission-error', contextualError);
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

export async function seedRoutes(firestore: Firestore) {
  const routesCollection = collection(firestore, 'routes');

  let snapshot;
  try {
    snapshot = await getDocs(routesCollection);
  } catch (error) {
    console.error('Error reading routes:', error);
    return;
  }

  if (snapshot.empty) {
    console.log('Routes collection is empty. Seeding initial data...');
    const batch = writeBatch(firestore);

    const initialRoutes = [
      { id: 'kangra_manali', distanceKm: 215, estimatedTime: '7 hours' },
      { id: 'kangra_shimla', distanceKm: 220, estimatedTime: '7.5 hours' },
      { id: 'kangra_dharamshala', distanceKm: 20, estimatedTime: '1 hour' },
      { id: 'manali_shimla', distanceKm: 250, estimatedTime: '8 hours' },
    ];

    initialRoutes.forEach((route) => {
      const { id, ...data } = route;
      const docRef = doc(routesCollection, id);
      batch.set(docRef, data);
    });

    try {
      await batch.commit();
      console.log('Successfully seeded routes data.');
    } catch (error) {
      console.error('Error seeding routes:', error);
    }
  }
}
