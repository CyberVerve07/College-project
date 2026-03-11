'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

type FormState = {
  success: boolean;
  error?: string;
};

/**
 * Server action handler for contact form submissions.
 * 
 * NOTE: This server action is no longer responsible for database writes.
 * All Firestore logic has been moved to the <ContactForm /> client component
 * to resolve a build error caused by importing client code into a server file.
 * 
 * @param data - The contact form data containing name, email, subject, and message
 * @returns Promise<FormState> - Object indicating success or failure of the submission
 */
export async function submitContactForm(
  data: z.infer<typeof formSchema>
): Promise<FormState> {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, error: 'Invalid data provided.' };
  }

  // No database operation is performed here.
  // This function is kept to prevent potential build errors if other parts
  // of the application were importing it, but it is no longer used by the form itself.
  // In production, replace this with proper logging service
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '[submitContactForm] Server action received data (no-op):',
      parsedData.data.subject
    );
  }

  return { success: true };
}
