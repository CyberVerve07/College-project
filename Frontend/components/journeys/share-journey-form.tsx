'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/frontend/components/ui/button';
import { Input } from '@/frontend/components/ui/input';
import { Textarea } from '@/frontend/components/ui/textarea';
import { Label } from '@/frontend/components/ui/label';
import { Star, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const journeySchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    story: z.string().min(20, 'Share a bit more (at least 20 characters)').max(2000),
    location: z.string().min(2, 'Location is required'),
    date: z.string().min(1, 'Date is required'),
    imageUrl: z.string().url('Please enter a valid image URL').or(z.literal('')),
    author: z.string().min(2, 'Your name is required'),
    rating: z.number().min(1, 'Please select a rating').max(5),
});

type JourneyFormData = z.infer<typeof journeySchema>;

interface ShareJourneyFormProps {
    onSuccess: (data: JourneyFormData) => void;
}

export function ShareJourneyForm({ onSuccess }: ShareJourneyFormProps) {
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<JourneyFormData>({
        resolver: zodResolver(journeySchema),
        defaultValues: {
            title: '',
            story: '',
            location: '',
            date: '',
            imageUrl: '',
            author: '',
            rating: 0,
        },
    });

    const currentRating = watch('rating');
    const storyValue = watch('story');

    const onSubmit = async (data: JourneyFormData) => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsSubmitting(false);
        setIsSuccess(true);
        onSuccess(data);
        setTimeout(() => setIsSuccess(false), 3000);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" strokeWidth={1.75} />
                </div>
                <h3 className="!text-xl font-bold font-headline text-foreground mb-1">Story Shared! 🎉</h3>
                <p className="!text-sm text-muted-foreground">Thank you for sharing your experience.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Row 1: Name + Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label htmlFor="author" className="!text-sm font-semibold">Your Name</Label>
                    <Input
                        id="author"
                        placeholder="e.g. Rahul Sharma"
                        {...register('author')}
                        className="bg-background/50 border-border focus:border-primary h-10 rounded-lg !text-sm"
                    />
                    {errors.author && <p className="!text-xs text-destructive">{errors.author.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="title" className="!text-sm font-semibold">Journey Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g. Sunrise at Triund Peak"
                        {...register('title')}
                        className="bg-background/50 border-border focus:border-primary h-10 rounded-lg !text-sm"
                    />
                    {errors.title && <p className="!text-xs text-destructive">{errors.title.message}</p>}
                </div>
            </div>

            {/* Row 2: Location + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label htmlFor="location" className="!text-sm font-semibold">Location</Label>
                    <Input
                        id="location"
                        placeholder="e.g. Manali, Himachal"
                        {...register('location')}
                        className="bg-background/50 border-border focus:border-primary h-10 rounded-lg !text-sm"
                    />
                    {errors.location && <p className="!text-xs text-destructive">{errors.location.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="date" className="!text-sm font-semibold">Travel Date</Label>
                    <Input
                        id="date"
                        type="date"
                        {...register('date')}
                        className="bg-background/50 border-border focus:border-primary h-10 rounded-lg !text-sm"
                    />
                    {errors.date && <p className="!text-xs text-destructive">{errors.date.message}</p>}
                </div>
            </div>

            {/* Story — bigger area with character count */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <Label htmlFor="story" className="!text-sm font-semibold">Your Story</Label>
                    <span className={`!text-xs ${(storyValue?.length || 0) > 1800 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {storyValue?.length || 0}/2000
                    </span>
                </div>
                <Textarea
                    id="story"
                    placeholder="Tell us about your adventure... What made it special? What sights, sounds, and feelings will you never forget?"
                    rows={6}
                    {...register('story')}
                    className="bg-background/50 border-border focus:border-primary rounded-lg resize-y !text-sm !leading-relaxed"
                />
                {errors.story && <p className="!text-xs text-destructive">{errors.story.message}</p>}
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
                <Label htmlFor="imageUrl" className="!text-sm font-semibold">
                    Photo URL <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                    id="imageUrl"
                    placeholder="https://example.com/my-photo.jpg"
                    {...register('imageUrl')}
                    className="bg-background/50 border-border focus:border-primary h-10 rounded-lg !text-sm"
                />
                {errors.imageUrl && <p className="!text-xs text-destructive">{errors.imageUrl.message}</p>}
            </div>

            {/* Star Rating */}
            <div className="space-y-1.5">
                <Label className="!text-sm font-semibold">Rate Your Experience</Label>
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setValue('rating', star, { shouldValidate: true })}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="p-0.5 transition-transform duration-150 hover:scale-110 active:scale-90"
                        >
                            <Star
                                className={`w-7 h-7 transition-colors duration-150 ${star <= (hoveredStar || currentRating)
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-muted-foreground/30'
                                    }`}
                                strokeWidth={1.75}
                            />
                        </button>
                    ))}
                </div>
                {errors.rating && <p className="!text-xs text-destructive">{errors.rating.message}</p>}
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 !text-sm font-bold rounded-lg bg-gradient-to-r from-primary via-cyan-600 to-teal-500 shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" strokeWidth={1.75} />
                        Sharing...
                    </>
                ) : (
                    'Share My Journey ✨'
                )}
            </Button>
        </form>
    );
}
