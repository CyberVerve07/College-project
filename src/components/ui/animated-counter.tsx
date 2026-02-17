'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
    end: number;
    start?: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export function AnimatedCounter({
    end,
    start = 0,
    duration = 2,
    className,
    prefix = '',
    suffix = '',
    decimals = 0,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(start);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const steps = 60;
        const increment = (end - start) / steps;
        const stepDuration = (duration * 1000) / steps;
        let current = start;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;

            if (step >= steps) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isVisible, start, end, duration]);

    return (
        <span ref={ref} className={cn('tabular-nums', className)}>
            {prefix}
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
}
