'use client';

import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
    cursor?: boolean;
}

export function Typewriter({
    text,
    className,
    speed = 50,
    delay = 0,
    onComplete,
    cursor = true,
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (delay > 0) {
            const delayTimer = setTimeout(() => {
                setCurrentIndex(0);
            }, delay);
            return () => clearTimeout(delayTimer);
        }
    }, [delay]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timer);
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [currentIndex, text, speed, onComplete, isComplete]);

    return (
        <span className={cn('inline-block', className)}>
            {displayedText}
            {cursor && !isComplete && (
                <span className="inline-block w-[2px] h-[1em] bg-current ml-1 animate-pulse" />
            )}
        </span>
    );
}
