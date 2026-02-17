'use client';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    threshold?: number;
}

const animationClasses: Record<AnimationType, string> = {
    'fade': 'opacity-0',
    'slide-up': 'opacity-0 translate-y-10',
    'slide-down': 'opacity-0 -translate-y-10',
    'slide-left': 'opacity-0 translate-x-10',
    'slide-right': 'opacity-0 -translate-x-10',
    'scale': 'opacity-0 scale-95',
    'none': '',
};

const activeClasses: Record<AnimationType, string> = {
    'fade': 'opacity-100',
    'slide-up': 'opacity-100 translate-y-0',
    'slide-down': 'opacity-100 translate-y-0',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0',
    'scale': 'opacity-100 scale-100',
    'none': '',
};

export function AnimatedSection({
    children,
    className,
    animation = 'fade',
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
}: AnimatedSectionProps) {
    const { ref, isInView } = useInView({ threshold, triggerOnce: true });

    return (
        <section
            ref={ref as any}
            className={cn(
                'transition-all ease-out',
                !isInView && animationClasses[animation],
                isInView && activeClasses[animation],
                className
            )}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </section>
    );
}
