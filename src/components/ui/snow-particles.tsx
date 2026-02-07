'use client';

import { useEffect, useRef } from 'react';

interface SnowParticlesProps {
    count?: number;
}

export function SnowParticles({ count = 50 }: SnowParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 1 + 0.5,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.3,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();

                p.y += p.speed;
                p.x += Math.sin(p.y * 0.01) * 0.5; // Swaying effect

                if (p.y > canvas.height) {
                    p.y = 0;
                    p.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        createParticles();
        draw();

        window.addEventListener('resize', resize);
        window.addEventListener('resize', createParticles);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('resize', createParticles);
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
