'use client';

import { useState } from 'react';
import { useFirebase, useMemoFirebase } from '@/backend/firebase/provider';
import { useCollection } from '@/backend/firebase/firestore/use-collection';
import { collection, addDoc, query, where } from 'firebase/firestore';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent } from '@/frontend/components/ui/card';
import { Textarea } from '@/frontend/components/ui/textarea';
import { Star, MessageSquare, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/frontend/hooks/use-toast';
import Link from 'next/link';

interface Review {
  id: string;
  targetId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export default function ReviewSection({ targetId }: { targetId: string }) {
  const { firestore, user, userData } = useFirebase();
  const { toast } = useToast();
  
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews for targetId
  const reviewsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'reviews'), where('targetId', '==', targetId));
  }, [firestore, targetId]);

  const { data: reviews, isLoading } = useCollection<Review>(reviewsQuery);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) return;
    if (!comment.trim()) {
      toast({
        variant: "destructive",
        title: "Comment Required",
        description: "Please share a few words about your experience.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(firestore, 'reviews'), {
        targetId,
        userId: user.uid,
        userName: userData?.displayName || user.displayName || user.email?.split('@')[0] || 'Anonymous Traveler',
        rating,
        comment: comment.trim(),
        createdAt: Date.now(),
      });

      toast({
        title: "Review Submitted",
        description: "Thank you for sharing your feedback!",
      });
      setComment('');
      setRating(5);
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: err.message || "Failed to submit review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews && reviews.length > 0 
    ? (reviews.reduce((acc: number, curr: Review) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="space-y-6 pt-6 border-t border-white/5 text-white">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-headline font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" /> Ratings & Reviews
        </h4>
        {avgRating && (
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-black">{avgRating} / 5</span>
            <span className="text-xs text-slate-400">({reviews?.length || 0})</span>
          </div>
        )}
      </div>

      {/* Review list */}
      {isLoading ? (
        <div className="py-4 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {[...reviews].sort((a: Review, b: Review) => b.createdAt - a.createdAt).map((review: Review) => (
            <Card key={review.id} className="border-white/5 bg-white/5 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-xs text-slate-200">{review.userName}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{review.comment}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">No reviews yet. Be the first to share your experience!</p>
      )}

      {/* Submission form */}
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-300">Your Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => setRating(starValue)}
                  className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    className={`w-6 h-6 ${starValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Share your travel experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-slate-950/50 border-white/10 text-white rounded-xl text-xs placeholder:text-slate-500 focus:border-primary min-h-[70px]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      ) : (
        <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-3">Please log in to submit a review.</p>
          <Button asChild size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl text-xs font-bold">
            <Link href="/login">Log In to Review</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
