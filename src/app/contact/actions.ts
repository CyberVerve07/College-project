'use server';

import * as z from 'zod';
import { initializeFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

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
  
  addDocumentNonBlocking(submissionsCollection, {
    ...parsedData.data,
    submissionDate: new Date().toISOString(),
  });

  // Since it's non-blocking, we optimistically return success.
  // The error will be caught by the global error handler if it fails.
  return { success: true };
}
