import { z } from 'zod';

// Chat Request Schema
export const ChatRequestSchema = z.object({
    message: z.string(),
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string()
    })).optional(),
});

// Chat Response Schema
export const ChatResponseSchema = z.object({
    answer: z.string(),
    suggestedActions: z.array(z.string()).optional(),
});

// Fare Request Schema
export const FareRequestSchema = z.object({
    from: z.string().describe('Pickup location'),
    to: z.string().describe('Destination location'),
    distance: z.string().optional().describe('Distance in km'),
    vehicleType: z.string().optional().describe('Preferred vehicle (Sedan, SUV, etc.)'),
});

// Fare Response Schema
export const FareResponseSchema = z.object({
    estimatedFare: z.number().describe('Calculated total fare in INR'),
    distanceKm: z.number().describe('Estimated distance in Kilometers'),
    breakdown: z.string().describe('Short explanation of the cost'),
    vehicle: z.string().describe('The vehicle type used for calculation'),
});

// Type exports
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type FareRequest = z.infer<typeof FareRequestSchema>;
export type FareResponse = z.infer<typeof FareResponseSchema>;
