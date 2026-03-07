'use client';


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/frontend/components/ui/button';
import { Sparkles, Send } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/frontend/components/ui/form';
import { Input } from '@/frontend/components/ui/input';
import { Textarea } from '@/frontend/components/ui/textarea';
import { useToast } from '@/frontend/hooks/use-toast';
import { useState } from 'react';
import { useFirestore } from '@/backend/firebase';
import { collection, addDoc } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Database connection not available.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionsCollection = collection(
        firestore,
        'contact_form_submissions'
      );
      await addDoc(submissionsCollection, {
        ...values,
        submissionDate: new Date().toISOString(),
      });
      toast({
        title: 'Message Sent!',
        description:
          'Thank you for contacting us. We will get back to you shortly.',
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'A problem occurred while submitting your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-foreground/80 pl-1">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="h-14 px-6 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-lg"
                />
              </FormControl>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-foreground/80 pl-1">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className="h-14 px-6 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-lg"
                />
              </FormControl>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-foreground/80 pl-1">Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Booking Inquiry"
                  {...field}
                  className="h-14 px-6 rounded-2xl bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-lg"
                />
              </FormControl>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-foreground/80 pl-1">Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help you..."
                  className="min-h-[160px] p-6 rounded-3xl bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-lg resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-16 rounded-2xl text-xl font-bold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
          disabled={isSubmitting || !firestore}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-spin" /> Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send Message <Send className="w-5 h-5 ml-1" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
