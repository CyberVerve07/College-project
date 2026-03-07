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

// This server action is no longer responsible for database writes.
// All Firestore logic has been moved to the <ContactForm /> client component
// to resolve a build error caused by importing client code into a server file.
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
  console.log(
    'Server action received data (no-op):',
    parsedData.data.subject
  );

  return { success: true };
}
