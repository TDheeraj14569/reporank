/* eslint-disable */
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { challengesMetadata } from '@/lib/data/challenges-metadata';
import { 
  Database, 
  Settings, 
  List, 
  Plus, 
  Search, 
  Edit3, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('questions');

  const filteredChallenges = challengesMetadata?.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    String(c.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.technology && c.technology.join(',').toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card flex-shrink-0 flex flex-col md:min-h-screen">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <ShieldAlert className="h-6 w-6" />
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
          <button 
            onClick={() => setActiveTab('questions')}
            className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors", activeTab === 'questions' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground")}
          >
            <List className="h-5 w-5" /> Challenges
          </button>
          <button 
            onClick={() => setActiveTab('repos')}
            className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors", activeTab === 'repos' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground")}
          >
            <Database className="h-5 w-5" /> Repositories
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors", activeTab === 'settings' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground")}
          >
            <Settings className="h-5 w-5" /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LayoutDashboard className="h-4 w-4" /> Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Manage Challenges</h1>
              <p className="text-muted-foreground text-sm">Add, edit, or remove practice scenarios</p>
            </div>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Plus className="h-5 w-5" /> Create New Challenge
            </button>
          </header>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search challenges by title, ID, or tech..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Technology</th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredChallenges.length > 0 ? (
                    filteredChallenges.map(challenge => (
                      <tr key={challenge.id} className="hover:bg-accent/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium font-mono text-muted-foreground">{challenge.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm line-clamp-1">{challenge.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            challenge.difficulty === 'easy' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                            challenge.difficulty === 'medium' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                            challenge.difficulty === 'hard' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          )}>
                            {challenge.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{challenge.technology || '-'}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                            Published
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No challenges found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filteredChallenges.length} challenges</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
