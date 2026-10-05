/* eslint-disable */
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { useProgressStore } from '@/lib/stores/progress-store';
import { History, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SubmissionsPage() {
  const [mounted, setMounted] = useState(false);
  const { progress } = useProgressStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Flatten all submissions from all challenges
  const allSubmissions = Object.values(progress).flatMap(p => p.submissions).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-8 flex items-center gap-3">
          <History className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
        </header>

        {allSubmissions.length === 0 ? (
          <div className="bg-card border border-border border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <History className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No submissions yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't submitted any solutions. Try solving some practice challenges to see your history here.
            </p>
            <Link href="/practice" className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Go to Practice
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Challenge</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allSubmissions.map((sub: any, i: number) => (
                    <tr key={i} className="hover:bg-accent/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{sub.challengeTitle || `Challenge ${sub.challengeId}`}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {sub.date ? new Date(sub.date).toLocaleDateString() : 'Unknown date'}
                      </td>
                      <td className="px-6 py-4">
                        {sub.status === 'success' || sub.score >= 100 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Accepted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            <XCircle className="h-3.5 w-3.5" />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {sub.score || 0}/100
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/practice/${sub.challengeId}`} className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                          Review <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
