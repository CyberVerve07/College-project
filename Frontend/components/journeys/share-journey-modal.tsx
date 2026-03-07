'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/frontend/components/ui/dialog';
import { ShareJourneyForm } from './share-journey-form';
import { ScrollArea } from '@/frontend/components/ui/scroll-area';

interface ShareJourneyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (data: any) => void;
}

export function ShareJourneyModal({ open, onOpenChange, onSuccess }: ShareJourneyModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] max-h-[90vh] p-0 rounded-2xl border-border bg-card shadow-2xl">
                <DialogHeader className="px-5 pt-5 pb-1">
                    <DialogTitle className="!text-xl font-black font-headline tracking-tight">
                        Share Your <span className="text-gradient">Journey</span>
                    </DialogTitle>
                    <DialogDescription className="!text-sm text-muted-foreground">
                        Tell the world about your travel adventure.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[72vh]">
                    <div className="px-5 pb-5">
                        <ShareJourneyForm
                            onSuccess={(data) => {
                                onSuccess(data);
                                setTimeout(() => onOpenChange(false), 3000);
                            }}
                        />
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
