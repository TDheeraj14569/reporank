/* eslint-disable */
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { useProgressStore } from '@/lib/stores/progress-store';
import { challengesMetadata } from '@/lib/data/challenges-metadata';
import { Bookmark, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BookmarksPage() {
  const [mounted, setMounted] = useState(false);
  const { progress } = useProgressStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bookmarkedIds = Object.values(progress).filter(p => p.bookmarked).map(p => p.challengeId);
  const bookmarkedChallenges = challengesMetadata?.filter(c => bookmarkedIds.includes(String(c.id))) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-8 flex items-center gap-3">
          <Bookmark className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">My Bookmarks</h1>
        </header>

        {bookmarkedChallenges.length === 0 ? (
          <div className="bg-card border border-border border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No bookmarked problems yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't bookmarked any challenges. Browse the practice area and bookmark challenges to save them for later.
            </p>
            <Link href="/practice" className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Go to Practice
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedChallenges.map(challenge => (
              <div key={challenge.id} className="bg-card border border-border rounded-lg p-5 shadow-sm hover:border-primary/50 transition-colors flex flex-col">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{challenge.title}</h3>
                    <Bookmark className="h-5 w-5 text-primary fill-primary flex-shrink-0" />
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className={cn(
                      "px-2 py-0.5 rounded font-medium",
                      challenge.difficulty === 'easy' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                      challenge.difficulty === 'medium' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                      challenge.difficulty === 'hard' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    )}>
                      {challenge.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded font-medium bg-secondary text-secondary-foreground">
                      {challenge.technology || 'General'}
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-4 flex justify-end">
                  <Link href={`/practice/${challenge.id}`} className="text-sm font-medium text-primary hover:underline flex items-center">
                    Continue <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
