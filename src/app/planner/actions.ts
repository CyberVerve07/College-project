'use server';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

function getDb() {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    return getFirestore(app);
}

export async function saveBooking(bookingData: any) {
    try {
        const db = getDb();
        const bookingsCollection = collection(db, 'bookings');
        const docRef = await addDoc(bookingsCollection, {
            ...bookingData,
            createdAt: new Date().toISOString(),
            status: 'paid'
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving booking:', error);
        return { success: false, error: 'Failed to save booking' };
    }
}
