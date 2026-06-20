'use client';

import { useFirebase, useMemoFirebase } from '@/backend/firebase/provider';
import { useCollection } from '@/backend/firebase/firestore/use-collection';
import { collection, query, where, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/frontend/components/ui/card';
import { Badge } from '@/frontend/components/ui/badge';
import { Calendar, User, MapPin, Phone, LogOut, ArrowRight, Car, Compass, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/frontend/hooks/use-toast';
import { Booking } from '@/frontend/lib/db-schema';

export default function DashboardPage() {
  const { auth, firestore, user, userData, loading: authLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Query User's Bookings
  const bookingsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'bookings'), where('userId', '==', user.uid));
  }, [user, firestore]);

  const { data: bookings, isLoading: bookingsLoading } = useCollection<Booking>(bookingsQuery);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have successfully signed out.",
      });
      router.push('/login');
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: err.message,
      });
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!firestore) return;
    setCancellingId(bookingId);
    try {
      const docRef = doc(firestore, 'bookings', bookingId);
      await updateDoc(docRef, { status: 'cancelled' });
      toast({
        title: "Booking Cancelled",
        description: "Your taxi booking has been successfully cancelled.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
        description: err.message || "Failed to cancel the booking.",
      });
    } finally {
      setCancellingId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b1a] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b1a] text-white px-4 text-center">
        <Card className="max-w-md w-full border-white/10 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <CardHeader className="space-y-2">
            <Compass className="w-12 h-12 text-primary mx-auto animate-pulse" />
            <CardTitle className="text-2xl font-headline font-bold">Authentication Required</CardTitle>
            <CardDescription className="text-slate-400">
              Please sign in to view your dashboard, itineraries, and past bookings.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full bg-gradient-to-r from-primary to-purple-600">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
              <Link href="/signup">Create Account</Link>
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
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar / Profile Card */}
          <div className="w-full lg:w-1/3 space-y-6">
            <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700" />
              
              <CardHeader className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-white/5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-3xl font-black shadow-lg">
                  {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{userData?.displayName || 'User'}</h2>
                  <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                </div>
                <Badge className="bg-primary/20 hover:bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[9px] font-bold">
                  {userData?.role || 'Traveler'}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4 pt-6 text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <User className="w-4 h-4 text-primary shrink-0" />
                  <span>UID: <span className="font-mono text-xs text-slate-400">{user.uid.slice(0, 10)}...</span></span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span>Joined: <span className="text-slate-400">{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</span></span>
                </div>
                {userData?.role === 'admin' && (
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl mt-4">
                    <Link href="/admin">Go to Admin Panel</Link>
                  </Button>
                )}
              </CardContent>

              <CardFooter className="pt-2">
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  className="w-full border-white/10 hover:bg-red-950/20 hover:text-red-400 hover:border-red-500/20 text-slate-300 rounded-xl flex items-center justify-center gap-2 h-11 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions Panel */}
            <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl text-white">
              <CardTitle className="text-lg font-bold mb-4 font-headline flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" /> Quick Travel Tools
              </CardTitle>
              <div className="grid grid-cols-1 gap-3">
                <Button asChild variant="outline" className="w-full justify-between border-white/10 text-white hover:bg-white/5 rounded-xl h-12">
                  <Link href="/planner" className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-primary" />
                    <span>AI Itinerary Planner</span>
                  </Link>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button asChild variant="outline" className="w-full justify-between border-white/10 text-white hover:bg-white/5 rounded-xl h-12">
                  <Link href="/calculator" className="flex items-center gap-3">
                    <Car className="w-4 h-4 text-secondary" />
                    <span>Live Route Cost Estimator</span>
                  </Link>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button asChild variant="outline" className="w-full justify-between border-white/10 text-white hover:bg-white/5 rounded-xl h-12">
                  <Link href="/packages" className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span>Popular Packages</span>
                  </Link>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Bookings & History Section */}
          <div className="w-full lg:w-2/3 space-y-6">
            <h1 className="text-3xl font-headline font-black tracking-tight mb-2">Your Bookings</h1>
            
            {bookingsLoading ? (
              <div className="h-60 flex items-center justify-center border border-white/10 bg-slate-900/40 rounded-3xl">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : bookings && bookings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking: Booking) => (
                  <Card key={booking.id} className="border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2.5rem p-6 text-white hover:border-primary/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className="bg-primary/20 hover:bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[9px] font-bold px-2 py-0.5">
                          ID: {booking.id.slice(0, 8)}
                        </Badge>
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
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> {booking.pickupDate} at {booking.pickupTime}</span>
                          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" /> {booking.customerPhone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end justify-between gap-3 sm:text-right">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Estimated Cost</p>
                        <p className="text-2xl font-black text-white">₹{booking.totalFare}</p>
                      </div>

                      {booking.status === 'pending' && (
                        <Button 
                          onClick={() => cancelBooking(booking.id)}
                          disabled={cancellingId === booking.id}
                          variant="destructive" 
                          size="sm" 
                          className="rounded-xl h-9 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 transition-all font-bold"
                        >
                          {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Trip'}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-white/10 bg-slate-900/40 rounded-3xl p-12 text-center text-white">
                <Compass className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Bookings Found</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                  You haven't scheduled any taxi bookings or Himachal trips yet. Choose a vehicle and get started!
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-6">
                  <Link href="/services">Book a Cab</Link>
                </Button>
              </Card>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
