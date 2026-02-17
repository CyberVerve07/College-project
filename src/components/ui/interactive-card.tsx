'use client';

import { ReactNode, useRef, MouseEvent } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InteractiveCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    enableTilt?: boolean;
    enableMagnetic?: boolean;
    enableRipple?: boolean;
}

export function InteractiveCard({
    children,
    className,
    onClick,
    enableTilt = true,
    enableMagnetic = false,
    enableRipple = true,
}: InteractiveCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        if (enableTilt) {
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }

        if (enableMagnetic) {
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = '';
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!enableRipple || !rippleRef.current) {
            onClick?.();
            return;
        }

        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        rippleRef.current.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        onClick?.();
    };

    return (
        <Card
            ref={cardRef}
            className={cn(
                'relative overflow-hidden transition-all duration-300 cursor-pointer',
                'hover:shadow-2xl hover:shadow-primary/20',
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div ref={rippleRef} className="absolute inset-0 pointer-events-none" />
            {children}
        </Card>
    );
}
