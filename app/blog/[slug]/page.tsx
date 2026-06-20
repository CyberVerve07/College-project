'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialBlogPosts } from '@/images/blog-data';
import { Button } from '@/frontend/components/ui/button';
import { Calendar, Clock, ArrowLeft, ChevronRight, User, Sparkles } from 'lucide-react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const post = initialBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen py-24 bg-[#050b1a] text-white flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-black font-headline text-center">Article Not Found</h1>
        <p className="text-slate-400">The travel article you are looking for does not exist.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  // Format content paragraphs and headers
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        return <h3 key={index} className="text-2xl font-bold font-headline text-white mt-8 mb-4">{trimmed.replace('###', '')}</h3>;
      }
      if (trimmed.startsWith('##')) {
        return <h2 key={index} className="text-3xl font-black font-headline text-white mt-10 mb-4">{trimmed.replace('##', '')}</h2>;
      }
      if (trimmed === '') return null;
      return <p key={index} className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-medium">{trimmed}</p>;
    });
  };

  return (
    <div className="min-h-screen py-24 bg-[#050b1a] text-white relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300 truncate max-w-xs">{post.title}</span>
        </div>

        {/* Action Header */}
        <div className="mb-10">
          <Button asChild variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl gap-2">
            <Link href="/blog"><ArrowLeft className="w-4 h-4" /> All Articles</Link>
          </Button>
        </div>

        {/* Article Meta */}
        <div className="space-y-4 mb-8">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full border border-primary/20">
            {post.category}
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-headline font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-bold uppercase tracking-wider flex-wrap pt-2">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {post.readTime}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Written by {post.author.name}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none mb-16 border-b border-white/5 pb-12">
          {renderContent(post.content)}
        </article>

        {/* Author Bio Card */}
        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h4 className="text-lg font-bold">{post.author.name}</h4>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold uppercase tracking-widest self-center">
                {post.author.role}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Living, breathing, and driving in the valleys of Himachal. Helping travelers lock in the most epic mountain memories.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
