'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        // In production, send this to a service like Firebase Crashlytics
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center space-y-6">
                    <div className="bg-destructive/10 p-6 rounded-full">
                        <AlertTriangle className="w-16 h-16 text-destructive animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-bold font-headline">Something went wrong.</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        We've encountered an unexpected error. Don't worry, our team has been notified. Please try refreshing the page.
                    </p>
                    <Button onClick={() => window.location.reload()} size="lg" className="rounded-full px-8">
                        Refresh Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
