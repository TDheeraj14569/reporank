/* eslint-disable */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { dsaQuestions, DSAQuestionData } from '@/lib/data/dsa-questions';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Binary Search', 'Hashing', 'Stacks/Queues', 'Two Pointers', 'Sorting'];
const DIFFICULTIES = ['All', 'easy', 'medium', 'hard'];

export default function DSAPracticePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof DSAQuestionData; direction: 'asc' | 'desc' } | null>(null);

  const filteredQuestions = dsaQuestions.filter(q => {
    const matchCategory = activeCategory === 'All' || q.category === activeCategory;
    const matchDifficulty = activeDifficulty === 'All' || q.difficulty === activeDifficulty;
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchDifficulty && matchSearch;
  });

  if (sortConfig !== null) {
    filteredQuestions.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'difficulty') {
        const diffMap = { easy: 1, medium: 2, hard: 3 };
        // @ts-ignore
        aVal = diffMap[aVal];
        // @ts-ignore
        bVal = diffMap[bVal];
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (key: keyof DSAQuestionData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Coding Challenges</h1>
          <p className="text-gray-500 dark:text-gray-400">Practice your data structures and algorithms skills.</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === cat 
                    ? "bg-blue-600 text-white" 
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search challenges..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium capitalize border transition-colors",
                  activeDifficulty === diff 
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" 
                    : "border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
                <th className="px-6 py-4 font-medium text-sm text-gray-500 w-16">Status</th>
                <th className="px-6 py-4 font-medium text-sm text-gray-500 cursor-pointer" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-1"># <ChevronDown className="w-4 h-4" /></div>
                </th>
                <th className="px-6 py-4 font-medium text-sm text-gray-500 cursor-pointer" onClick={() => handleSort('title')}>
                  <div className="flex items-center gap-1">Title <ChevronDown className="w-4 h-4" /></div>
                </th>
                <th className="px-6 py-4 font-medium text-sm text-gray-500 cursor-pointer" onClick={() => handleSort('difficulty')}>
                  <div className="flex items-center gap-1">Difficulty <ChevronDown className="w-4 h-4" /></div>
                </th>
                <th className="px-6 py-4 font-medium text-sm text-gray-500">Category</th>
                <th className="px-6 py-4 font-medium text-sm text-gray-500 cursor-pointer" onClick={() => handleSort('acceptance')}>
                  <div className="flex items-center gap-1">Acceptance <ChevronDown className="w-4 h-4" /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <Circle className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                  </td>
                  <td className="px-6 py-4 text-sm">{q.id}</td>
                  <td className="px-6 py-4">
                    <Link href={`/challenges/${q.slug}`} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      {q.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                      q.difficulty === 'easy' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                      q.difficulty === 'medium' && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                      q.difficulty === 'hard' && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{q.category}</td>
                  <td className="px-6 py-4 text-sm">{q.acceptance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredQuestions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No challenges found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
