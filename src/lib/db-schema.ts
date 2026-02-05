export interface User {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber?: string;
    role: 'user' | 'driver' | 'admin';
    createdAt: number;
}

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
    createdAt: number;
}

export interface Route {
    id: string;
    from: string;
    to: string;
    distanceKm: number;
    basePrice: number;
}
