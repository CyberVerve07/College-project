/**
 * Represents a user in the system.
 * Corresponds to the 'users' collection in Firestore.
 */
export interface User {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber?: string;
    role: 'user' | 'driver' | 'admin';
    /** Timestamp of user creation (ms) */
    createdAt: number;
}

/**
 * Represents a taxi booking/reservation.
 * Corresponds to the 'bookings' collection.
 */
export interface Booking {
    id: string;
    userId: string;
    customerName: string;
    customerPhone: string;
    serviceId: string; // Refers to the cab/fleet type
    pickupLocation: string;
    dropLocation: string;
    pickupDate: string;
    pickupTime: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    totalFare: number;
    razorpayOrderId?: string;
    paymentStatus: 'pending' | 'paid';
    /** Timestamp of booking creation (ms) */
    createdAt: number;
}

/**
 * Represents a predefined travel route.
 * Used for calculating fares or displaying popular routes.
 */
export interface Route {
    id: string;
    from: string;
    to: string;
    distanceKm: number;
    basePrice: number;
}
