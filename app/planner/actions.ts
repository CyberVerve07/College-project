'use server';

import { z } from 'zod';
import { firebaseConfig } from '@/backend/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const bookingSchema = z.object({
    userId: z.string().min(1),
    customerName: z.string().min(2).max(100),
    customerPhone: z.string().min(8).max(20),
    serviceId: z.string().min(1),
    pickupLocation: z.string().min(2).max(200),
    dropLocation: z.string().min(2).max(200),
    pickupDate: z.string().min(1),
    pickupTime: z.string().min(1),
    totalFare: z.number().nonnegative(),
    razorpayOrderId: z.string().optional(),
});

function getDb() {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    return getFirestore(app);
}

export async function saveBooking(bookingData: unknown) {
    try {
        const parsedBooking = bookingSchema.parse(bookingData);
        const db = getDb();
        const bookingsCollection = collection(db, 'bookings');
        const docRef = await addDoc(bookingsCollection, {
            ...parsedBooking,
            createdAt: Date.now(),
            status: 'pending',
            paymentStatus: 'pending',
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        // Log error details for debugging without exposing sensitive info to client
        if (error instanceof z.ZodError) {
            console.warn('[saveBooking] Validation failed:', error.flatten());
        } else {
            console.error('[saveBooking] Database error:', error instanceof Error ? error.message : 'Unknown error');
        }
        return { success: false, error: 'Failed to save booking' };
    }
}
