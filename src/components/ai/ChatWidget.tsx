'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateChatResponse } from '@/app/actions/ai';
import { AnimatePresence, motion } from 'framer-motion';

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

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

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

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 pointer-events-auto"
                    >
                        <Card className="w-[350px] h-[500px] shadow-2xl border-primary/20 flex flex-col overflow-hidden bg-background/95 backdrop-blur-md">
                            <CardHeader className="bg-primary/5 border-b p-4 flex flex-row items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary/10 p-1.5 rounded-full">
                                        <Sparkles className="w-4 h-4 text-primary fill-primary/20" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-bold">Destiny Assistant</CardTitle>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors" onClick={resetChat} title="Reset Chat">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => setIsOpen(false)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-hidden p-0 relative">
                                <ScrollArea className="h-full p-4">
                                    <div className="flex flex-col gap-4 pb-4">
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
                                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                                                        msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                                                    )}>
                                                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                                            msg.role === 'user'
                                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                                : "bg-muted text-foreground rounded-tl-sm border border-black/5"
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
                                                                className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full transition-colors border border-primary/10"
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
                                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 border">
                                                    <Bot className="w-4 h-4 animate-pulse" />
                                                </div>
                                                <div className="bg-muted rounded-2xl px-4 py-2.5 rounded-tl-sm flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={scrollRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>

                            <CardFooter className="p-3 bg-muted/30 border-t shrink-0">
                                <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center">
                                    <Input
                                        placeholder="Ask about trips..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="flex-1 bg-background focus-visible:ring-primary/50"
                                        disabled={isLoading}
                                    />
                                    <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} className={cn("shrink-0 transition-all", inputValue.trim() ? "bg-primary" : "bg-muted-foreground/30")}>
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                size="lg"
                className={cn(
                    "h-14 w-14 rounded-full shadow-xl transition-all duration-300 pointer-events-auto hover:scale-105",
                    isOpen ? "rotate-90 opacity-0 scale-50 absolute" : "opacity-100 scale-100 bg-gradient-to-tr from-primary to-orange-400 text-white"
                )}
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle className="w-7 h-7" />
                <span className="sr-only">Open Chat</span>
            </Button>
        </div>
    );
}
