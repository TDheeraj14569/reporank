/* eslint-disable */
'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { challengesMetadata } from '@/lib/data/challenges-metadata';
import { 
  Search, Filter, Clock, FileCode, TestTube, 
  ChevronDown, BookOpen, Code, Terminal, Server
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Filter options
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];
const TASK_TYPES = ['All', 'Feature Implementation', 'Bug Fix', 'Debugging', 'Refactoring', 'Concurrency'];
const TECHNOLOGIES = ['All', 'Python', 'Java', 'Node.js', 'Go', 'React', 'TypeScript'];
const SORTS = ['Recommended', 'Difficulty (Low to High)', 'Difficulty (High to Low)', 'Newest'];

const PATTERN_TABS = [
  { id: 'all', label: 'All' },
  { id: 'amazon-style', label: 'Amazon-style', match: ['amazon'] },
  { id: 'microsoft-style', label: 'Microsoft-style', match: ['microsoft'] },
  { id: 'google-style', label: 'Google-style', match: ['google'] },
  { id: 'startup-style', label: 'Startup-style', match: ['startup', 'stripe', 'twilio', 'uber'] },
  { id: 'general-swe', label: 'General SWE', match: ['general', 'swe', 'standard'] },
];

function RepositoryPracticeContent() {
  const searchParams = useSearchParams();
  const initialPattern = searchParams.get('pattern') || 'all';

  const [activeTab, setActiveTab] = useState(initialPattern);
  const [difficulty, setDifficulty] = useState('All');
  const [taskType, setTaskType] = useState('All');
  const [technology, setTechnology] = useState('All');
  const [sort, setSort] = useState('Recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Update active tab if URL param changes
  useEffect(() => {
    const pattern = searchParams.get('pattern');
    if (pattern) {
      setActiveTab(pattern);
    }
  }, [searchParams]);

  const filteredChallenges = useMemo(() => {
    let result = challengesMetadata;

    // Pattern filter
    if (activeTab !== 'all') {
      const tabDef = PATTERN_TABS.find(t => t.id === activeTab);
      if (tabDef && tabDef.match) {
        result = result.filter(c => {
          const cp = (c.companyPattern || '').toLowerCase();
          return tabDef.match!.some(m => cp.includes(m));
        });
      }
    }

    // Difficulty filter
    if (difficulty !== 'All') {
      result = result.filter(c => c.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    // Task Type filter
    if (taskType !== 'All') {
      result = result.filter(c => c.taskType.toLowerCase().includes(taskType.toLowerCase()));
    }

    // Technology filter
    if (technology !== 'All') {
      result = result.filter(c => 
        c.technology.some(t => t.toLowerCase() === technology.toLowerCase())
      );
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result];
    if (sort === 'Difficulty (Low to High)') {
      const diffScore = { easy: 1, medium: 2, hard: 3, expert: 4 };
      result.sort((a, b) => (diffScore[a.difficulty.toLowerCase() as keyof typeof diffScore] || 0) - (diffScore[b.difficulty.toLowerCase() as keyof typeof diffScore] || 0));
    } else if (sort === 'Difficulty (High to Low)') {
      const diffScore = { easy: 1, medium: 2, hard: 3, expert: 4 };
      result.sort((a, b) => (diffScore[b.difficulty.toLowerCase() as keyof typeof diffScore] || 0) - (diffScore[a.difficulty.toLowerCase() as keyof typeof diffScore] || 0));
    } else if (sort === 'Newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [activeTab, difficulty, taskType, technology, sort, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Real-World Repository Practice</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multi-file engineering tasks modeled after the kinds of software-development workflows commonly used in technical assessments.
          </p>
          <p className="text-sm text-muted-foreground italic">
            All challenges are original content inspired by common hiring patterns.
          </p>
        </div>

        {/* Company Pattern Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 border-b hide-scrollbar">
          <div className="flex space-x-2 mx-auto">
            {PATTERN_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-md focus:ring-1 focus:ring-primary outline-none text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-md border border-border/50">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filters:</span>
            </div>
            
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            >
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select 
              value={taskType} 
              onChange={(e) => setTaskType(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            >
              {TASK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select 
              value={technology} 
              onChange={(e) => setTechnology(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            >
              {TECHNOLOGIES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary ml-auto"
            >
              {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className="flex flex-col bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/practice/repository/${challenge.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0 z-10" aria-hidden="true" />
                      {challenge.title}
                    </Link>
                  </h3>
                  <div className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ml-4 shrink-0",
                    challenge.difficulty.toLowerCase() === 'easy' ? "bg-green-500/10 text-green-500" :
                    challenge.difficulty.toLowerCase() === 'medium' ? "bg-yellow-500/10 text-yellow-500" :
                    challenge.difficulty.toLowerCase() === 'hard' ? "bg-orange-500/10 text-orange-500" :
                    "bg-red-500/10 text-red-500"
                  )}>
                    {challenge.difficulty}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-muted text-xs font-medium text-muted-foreground">
                    <Terminal className="w-3 h-3" />
                    {challenge.taskType}
                  </span>
                  {challenge.technology.map(tech => (
                    <span key={tech} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs font-medium">
                      <Code className="w-3 h-3" />
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-2">
                  {challenge.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {challenge.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                  {challenge.skills.length > 3 && (
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      +{challenge.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5" title="Estimated Time">
                      <Clock className="w-4 h-4" />
                      {challenge.estimatedTimeMinutes}m
                    </div>
                    <div className="flex items-center gap-1.5" title="Files">
                      <FileCode className="w-4 h-4" />
                      {challenge.fileCount}
                    </div>
                    <div className="flex items-center gap-1.5" title="Tests">
                      <TestTube className="w-4 h-4" />
                      {challenge.testCount}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/practice/repository/${challenge.slug}`}
                    className="relative z-20 inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm"
                  >
                    Start Challenge
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-dashed rounded-xl border-border/50 bg-muted/10">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-1">No challenges found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters or search query to find more challenges.
              </p>
              <button 
                onClick={() => {
                  setDifficulty('All');
                  setTaskType('All');
                  setTechnology('All');
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="mt-4 text-primary text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function RepositoryPracticePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <RepositoryPracticeContent />
    </Suspense>
  );
}
