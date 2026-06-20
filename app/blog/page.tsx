'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialBlogPosts, BlogPost } from '@/images/blog-data';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent } from '@/frontend/components/ui/card';
import { Calendar, Clock, User, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const blogPosts = initialBlogPosts;

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen py-24 bg-[#050b1a] text-white relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Title / Hero */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Travel Journal
          </div>
          <h1 className="text-5xl sm:text-7xl font-headline font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Himachal <span className="text-primary italic">Travel Blog</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg">
            Tips, guides, and hidden secrets from our local mountain experts to help you plan the perfect Himalayan escape.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`rounded-full px-6 transition-all ${
                selectedCategory === category 
                  ? 'bg-primary hover:bg-primary/95 text-white' 
                  : 'border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full group"
            >
              <Card className="flex flex-col h-full overflow-hidden border-white/10 bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl hover:border-primary/20 transition-all duration-300 group hover:-translate-y-2">
                
                {/* Blog Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-6 flex flex-col flex-grow relative space-y-4 text-white">
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold font-headline leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    {/* Author profile */}
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full border border-white/20"
                      />
                      <div>
                        <p className="text-xs font-bold">{post.author.name}</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{post.author.role}</p>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Button asChild size="sm" variant="ghost" className="text-primary hover:text-white hover:bg-primary/20 rounded-xl px-3 group/btn gap-1 text-xs font-bold">
                      <Link href={`/blog/${post.slug}`}>
                        Read Post <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>

              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
