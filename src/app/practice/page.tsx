/* eslint-disable */
'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { challengesMetadata } from '@/lib/data/challenges-metadata'
import { availableSlugs } from '@/lib/data/available-slugs'
import {
  Search, ChevronDown, ChevronRight, Clock,
  CheckCircle2, Circle, PlayCircle, SlidersHorizontal,
  Code2, Layout, Terminal, Box, Blocks, Workflow,
  Sparkles, Layers
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types for filters
type FilterState = {
  search: string
  difficulty: string[]
  taskType: string[]
  technology: string[]
}

export default function PracticeDashboard() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    difficulty: [],
    taskType: [],
    technology: [],
  })
  
  const [activeTab, setActiveTab] = useState('All Challenges')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    difficulty: true,
    taskType: true,
    technology: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[]
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, [category]: updated }
    })
  }

  const filteredChallenges = useMemo(() => {
    // ONLY include physically generated repositories
    const available = challengesMetadata.filter(c => availableSlugs.includes(c.slug));
    
    return available.filter(challenge => {
      if (filters.search && !challenge.title.toLowerCase().includes(filters.search.toLowerCase())) return false
      if (filters.difficulty.length && !filters.difficulty.includes(challenge.difficulty)) return false
      if (filters.taskType.length && !filters.taskType.includes(challenge.taskType)) return false
      if (filters.technology.length && !filters.technology.some(t => challenge.technology?.includes(t))) return false
      return true
    })
  }, [filters])

  // Get unique filter options from the 36 available challenges
  const availableChallenges = challengesMetadata.filter(c => availableSlugs.includes(c.slug));
  const difficulties = ['easy', 'medium', 'hard', 'expert']
  const taskTypes = Array.from(new Set(availableChallenges.map(c => c.taskType))).filter(Boolean)
  const technologies = Array.from(new Set(availableChallenges.flatMap(c => c.technology || []))).filter(Boolean).sort()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* Background glowing meshes (Vercel/Linear style) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-8">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-8 px-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              <h2 className="text-sm font-medium text-gray-200 uppercase tracking-widest">Filters</h2>
            </div>
            
            <div className="space-y-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-xl">
              {/* Difficulty */}
              <div>
                <button onClick={() => toggleSection('difficulty')} className="flex items-center justify-between w-full group">
                  <h3 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Difficulty</h3>
                  <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform", expandedSections.difficulty ? "" : "-rotate-90")} />
                </button>
                {expandedSections.difficulty && (
                  <div className="mt-4 space-y-2.5">
                    {difficulties.map(diff => (
                      <label key={diff} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input 
                            type="checkbox" 
                            className="peer appearance-none w-5 h-5 border border-gray-700 rounded bg-transparent checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer"
                            checked={filters.difficulty.includes(diff)}
                            onChange={() => handleFilterChange('difficulty', diff)}
                          />
                          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-200 capitalize transition-colors">{diff}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

              {/* Technologies */}
              <div>
                <button onClick={() => toggleSection('technology')} className="flex items-center justify-between w-full group">
                  <h3 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Technology</h3>
                  <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform", expandedSections.technology ? "" : "-rotate-90")} />
                </button>
                {expandedSections.technology && (
                  <div className="mt-4 max-h-64 overflow-y-auto pr-2 space-y-2.5 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    {technologies.map(tech => (
                      <label key={tech} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input 
                            type="checkbox" 
                            className="peer appearance-none w-5 h-5 border border-gray-700 rounded bg-transparent checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer"
                            checked={filters.technology.includes(tech)}
                            onChange={() => handleFilterChange('technology', tech)}
                          />
                          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{tech}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Header Section */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Code Execution Enabled</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Challenges</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Solve real-world engineering bugs, refactor complex architectures, and master full-stack environments directly in your browser.
            </p>
          </div>

          {/* Search & Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text"
                placeholder="Search by title, technology, or skills..."
                value={filters.search}
                onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div className="flex items-center bg-white/[0.03] border border-white/[0.1] rounded-xl p-1 shrink-0">
              {['All Challenges', 'My List'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2.5 text-sm font-medium rounded-lg transition-all",
                    activeTab === tab 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* List Metadata */}
          <div className="flex items-center justify-between mb-6 px-1">
            <span className="text-sm font-medium text-gray-400">
              Showing <span className="text-white">{filteredChallenges.length}</span> verified repositories
            </span>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredChallenges.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl bg-white/[0.01]">
                <Box className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-1">No challenges found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              filteredChallenges.map((challenge, idx) => {
                
                // Exquisite Difficulty Colors
                const diffStyles = 
                  challenge.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  challenge.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  challenge.difficulty === 'hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                  'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20'

                // Status logic
                const status = (challenge as any).status || 'Not Started'
                
                // Icon based on tech
                const TechIcon = 
                  challenge.technology?.includes('React') ? Layout :
                  challenge.technology?.includes('Node.js') ? Terminal :
                  challenge.technology?.includes('Python') ? Code2 :
                  challenge.technology?.includes('Java') ? Blocks : Workflow

                return (
                  <Link 
                    href={`/practice/repository/${challenge.slug}`} 
                    key={challenge.id}
                    className="group relative flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5 overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/[0.02] group-hover:via-indigo-500/[0.02] group-hover:to-purple-500/[0.02] transition-colors duration-500 ease-out" />
                    
                    {/* Left: Icon & Core Info */}
                    <div className="relative z-10 flex-1 flex gap-5">
                      <div className="hidden sm:flex shrink-0 items-center justify-center w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.05] group-hover:bg-white/[0.08] group-hover:border-white/[0.1] transition-colors">
                        <TechIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg text-gray-100 group-hover:text-white transition-colors truncate pr-4">
                          {challenge.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-2.5 mt-3">
                          <span className={cn("text-[11px] px-2.5 py-1 rounded-md border font-medium uppercase tracking-wider", diffStyles)}>
                            {challenge.difficulty}
                          </span>
                          
                          <span className="text-xs px-2.5 py-1 rounded-md bg-white/[0.05] text-gray-300 border border-transparent">
                            {challenge.taskType}
                          </span>
                          
                          {challenge.technology?.slice(0, 3).map(tech => (
                            <span key={tech} className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-gray-600" />
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                          {challenge.skills && (
                            <div className="hidden md:flex items-center gap-1.5 truncate max-w-md">
                              <Layers className="w-4 h-4 text-gray-600" />
                              <span className="truncate">{challenge.skills.join(' • ')}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span>{challenge.estimatedTimeMinutes}m</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="relative z-10 flex items-center shrink-0 border-t border-gray-800/50 sm:border-t-0 pt-4 sm:pt-0">
                      <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                        {status === 'In Progress' ? 'Resume' : 'Solve Challenge'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
          
        </div>
      </main>
    </div>
  )
}
