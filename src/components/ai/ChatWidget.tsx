'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, RefreshCw, ChevronDown, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateChatResponse } from '@/app/actions/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

type Message = {
    id: string;
    role: 'user' | 'model';
    content: string;
    suggestions?: string[];
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'welcome', role: 'model', content: 'Hi! I am Destiny AI. How can I help you plan your Himachal trip today?', suggestions: ['Plan a Trip', 'Cab Rates', 'Best Places to Visit'] }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Handle scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    // Back button handling for mobile
    useEffect(() => {
        if (isOpen && isMobile) {
            // Push state when opening chat on mobile
            window.history.pushState({ chatOpen: true }, '');

            const handlePopState = () => {
                setIsOpen(false);
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isOpen, isMobile]);

    const resetChat = () => {
        setMessages([
            { id: 'welcome', role: 'model', content: 'Hi! I am Destiny AI. How can I help you plan your Himachal trip today?', suggestions: ['Plan a Trip', 'Cab Rates', 'Best Places to Visit'] }
        ]);
        setInputValue('');
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Prepare history for the AI
            const history = messages.map(m => ({ role: m.role, content: m.content }));

            const response = await generateChatResponse({
                message: userMsg.content,
                history: history,
            });

            if (response.success && response.data) {
                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    content: response.data.answer,
                    suggestions: response.data.suggestedActions
                };
                setMessages(prev => [...prev, aiMsg]);
            } else {
                const errorMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    content: "I'm having a bit of trouble connecting to the mountains right now. Please try again."
                };
                setMessages(prev => [...prev, errorMsg]);
            }
        } catch (error) {
            console.error(error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                content: "Sorry, something went wrong. Please check your internet connection."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
    };

    const toggleChat = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            // If going back, we might need to go back in history if we pushed state
            if (isMobile) {
                window.history.back();
            } else {
                setIsOpen(false);
            }
        }
    }

    return (
        <div className={cn(
            "fixed z-50 flex flex-col items-end pointer-events-none",
            isMobile ? "inset-0" : "bottom-6 right-6"
        )}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "pointer-events-auto shadow-2xl overflow-hidden bg-background/95 backdrop-blur-md flex flex-col",
                            isMobile ? "w-full h-full rounded-none" : "w-[380px] h-[600px] mb-4 rounded-2xl border border-primary/20"
                        )}
                    >
                        {/* Header */}
                        <div className="bg-primary/5 border-b p-4 flex flex-row items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                {isMobile && (
                                    <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="-ml-2">
                                        <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                                    </Button>
                                )}
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Sparkles className="w-4 h-4 text-primary fill-primary/20" strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold font-headline tracking-wide">Destiny Assistant</h3>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors" onClick={resetChat} title="Reset Chat">
                                    <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => isMobile ? window.history.back() : setIsOpen(false)}>
                                    {isMobile ? <X className="w-5 h-5" strokeWidth={2.5} /> : <ChevronDown className="w-5 h-5" strokeWidth={2.5} />}
                                </Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-hidden relative bg-gradient-to-b from-transparent to-primary/5">
                            <ScrollArea className="h-full p-4">
                                <div className="flex flex-col gap-6 pb-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex flex-col gap-2 max-w-[85%]",
                                                msg.role === 'user' ? "self-end items-end" : "self-start items-start"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex gap-2",
                                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                            )}>
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm mt-1",
                                                    msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-card text-foreground border-border"
                                                )}>
                                                    {msg.role === 'user' ? <User className="w-4 h-4" strokeWidth={2.5} /> : <Bot className="w-5 h-5" strokeWidth={2} />}
                                                </div>
                                                <div
                                                    className={cn(
                                                        "rounded-2xl px-4 py-3 text-sm shadow-sm",
                                                        msg.role === 'user'
                                                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                            : "bg-card border border-border text-foreground rounded-tl-sm"
                                                    )}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>

                                            {/* Render Suggestions */}
                                            {msg.role === 'model' && msg.suggestions && msg.suggestions.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-1 ml-10">
                                                    {msg.suggestions.map((suggestion, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleSendMessage(suggestion)}
                                                            disabled={isLoading}
                                                            className="text-xs font-medium bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground px-3 py-1.5 rounded-full transition-all border border-secondary/20 shadow-sm hover:scale-105 active:scale-95"
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-2 self-start max-w-[85%]">
                                            <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center shrink-0 border border-border mt-1">
                                                <Bot className="w-5 h-5 text-foreground animate-pulse" />
                                            </div>
                                            <div className="bg-card border border-border rounded-2xl px-4 py-3 rounded-tl-sm flex items-center gap-1 shadow-sm">
                                                <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={scrollRef} />
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-background border-t shrink-0 pb-safe">
                            <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center">
                                <Input
                                    placeholder="Ask about trips, cabs, or hotels..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="flex-1 bg-muted/50 focus-visible:ring-primary/50 border-border h-11 rounded-full px-4"
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} className={cn("shrink-0 transition-all h-11 w-11 rounded-full shadow-md", inputValue.trim() ? "bg-primary hover:bg-primary/90" : "bg-muted text-muted-foreground")}>
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} /> : <Send className="w-5 h-5 ml-0.5" strokeWidth={2.5} />}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <Button
                    size="lg"
                    className={cn(
                        "h-16 w-16 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 pointer-events-auto hover:scale-110 hover:-translate-y-1 bg-gradient-to-tr from-primary via-purple-500 to-pink-500 border-2 border-white/20",
                        isMobile ? "bottom-6 right-6 fixed" : "",
                    )}
                    onClick={toggleChat}
                >
                    <MessageCircle className="w-8 h-8 text-white fill-white/20" strokeWidth={2} />
                    <span className="sr-only">Open Chat</span>

                    {/* Notification Dot */}
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                </Button>
            )}
        </div>
    );
}
