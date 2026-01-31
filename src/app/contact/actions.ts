'use server';

import * as z from 'zod';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

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

export async function submitContactForm(
  data: z.infer<typeof formSchema>
): Promise<FormState> {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, error: 'Invalid data provided.' };
  }

  // The `initializeFirebase` function can be called multiple times,
  // but it will only initialize the app once.
  const { firestore } = initializeFirebase();
  const submissionsCollection = collection(firestore, 'contact_form_submissions');

  try {
    await addDoc(submissionsCollection, {
      ...parsedData.data,
      submissionDate: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error:
        'A problem occurred while submitting your message. Please try again.',
    };
  }
}
