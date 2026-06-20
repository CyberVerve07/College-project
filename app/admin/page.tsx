'use client';

import { useFirebase, useMemoFirebase } from '@/backend/firebase/provider';
import { useCollection } from '@/backend/firebase/firestore/use-collection';
import { collection, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { useState } from 'react';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/frontend/components/ui/card';
import { Badge } from '@/frontend/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/frontend/components/ui/tabs';
import { Loader2, ShieldAlert, CheckCircle, Clock, Trash2, Mail, Phone, MapPin, Sparkles, User, RefreshCw } from 'lucide-react';
import { useToast } from '@/frontend/hooks/use-toast';
import { Booking } from '@/frontend/lib/db-schema';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submissionDate: string;
}

export default function AdminDashboardPage() {
  const { firestore, user, userData, loading: authLoading } = useFirebase();
  const { toast } = useToast();
  
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Queries
  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'bookings'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const submissionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'contact_form_submissions'), orderBy('submissionDate', 'desc'));
  }, [firestore]);

  const { data: bookings, isLoading: bookingsLoading } = useCollection<Booking>(bookingsQuery);
  const { data: submissions, isLoading: submissionsLoading } = useCollection<ContactSubmission>(submissionsQuery);

  const updateBookingStatus = async (bookingId: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    if (!firestore) return;
    setUpdatingId(bookingId);
    try {
      const docRef = doc(firestore, 'bookings', bookingId);
      await updateDoc(docRef, { status: newStatus });
      toast({
        title: "Status Updated",
        description: `Booking is now marked as ${newStatus}.`,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: err.message || "Failed to update booking status.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteSubmission = async (submissionId: string) => {
    if (!firestore) return;
    setDeletingId(submissionId);
    try {
      const docRef = doc(firestore, 'contact_form_submissions', submissionId);
      await deleteDoc(docRef);
      toast({
        title: "Submission Deleted",
        description: "Contact inquiry deleted successfully.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: err.message || "Failed to delete submission.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b1a] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Restrict access to Admin role
  if (!user || userData?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b1a] text-white px-4 text-center">
        <Card className="max-w-md w-full border-red-500/20 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <CardHeader className="space-y-2">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
            <CardTitle className="text-2xl font-headline font-bold text-red-400">Access Denied</CardTitle>
            <CardDescription className="text-slate-400">
              Only authorized administrators can access this panel.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-4">
            <Button asChild className="w-full bg-primary">
              <a href="/">Go to Home</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-[#050b1a] text-white relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <Badge className="bg-primary/20 hover:bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[9px] font-bold py-1 px-3">
            Admin Mode
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-headline font-black tracking-tight">Control Center</h1>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-slate-950/60 border border-white/10 rounded-2xl p-1 gap-1">
            <TabsTrigger value="bookings" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              Bookings ({bookings ? bookings.length : 0})
            </TabsTrigger>
            <TabsTrigger value="submissions" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              Contact Submissions ({submissions ? submissions.length : 0})
            </TabsTrigger>
          </TabsList>

          {/* Bookings tab */}
          <TabsContent value="bookings">
            {bookingsLoading ? (
              <div className="h-60 flex items-center justify-center bg-slate-900/40 rounded-3xl">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : bookings && bookings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking: Booking) => (
                  <Card key={booking.id} className="border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2.5rem p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-semibold text-slate-300">Name: {booking.customerName}</span>
                        <Badge className={`uppercase tracking-widest text-[9px] font-bold px-2 py-0.5 ${
                          booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          booking.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span className="font-bold">{booking.pickupLocation}</span>
                          <span className="text-slate-500">to</span>
                          <span className="font-bold">{booking.dropLocation}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {booking.pickupDate} at {booking.pickupTime}</span>
                          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" /> {booking.customerPhone}</span>
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> UID: {booking.userId.slice(0, 8)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Estimated Cost</p>
                        <p className="text-xl font-black text-white">₹{booking.totalFare}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {booking.status === 'pending' && (
                          <Button 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            disabled={updatingId === booking.id}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl h-9"
                          >
                            Confirm
                          </Button>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button 
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            disabled={updatingId === booking.id}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-9"
                          >
                            Complete
                          </Button>
                        )}
                        {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                          <Button 
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            disabled={updatingId === booking.id}
                            variant="destructive"
                            size="sm"
                            className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/20 font-bold rounded-xl h-9"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center border border-white/10 bg-slate-900/40 rounded-3xl text-slate-500 italic">
                No bookings scheduled yet.
              </div>
            )}
          </TabsContent>

          {/* Submissions tab */}
          <TabsContent value="submissions">
            {submissionsLoading ? (
              <div className="h-60 flex items-center justify-center bg-slate-900/40 rounded-3xl">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {submissions.map((sub: ContactSubmission) => (
                  <Card key={sub.id} className="border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2.5rem p-6 text-white relative group">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-slate-100 font-headline leading-tight">{sub.subject}</h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> {sub.name}</span>
                          <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary" /> {sub.email}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {new Date(sub.submissionDate).toLocaleString()}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => deleteSubmission(sub.id)}
                        disabled={deletingId === sub.id}
                        variant="destructive"
                        size="icon"
                        className="rounded-xl h-9 w-9 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-slate-300 text-sm leading-relaxed bg-black/35 rounded-2xl p-4 border border-white/5 font-medium">
                      {sub.message}
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center border border-white/10 bg-slate-900/40 rounded-3xl text-slate-500 italic">
                No inquiries or contact submissions found.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
