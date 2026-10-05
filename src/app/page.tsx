/* eslint-disable */
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  GitBranch,
  Bug,
  Zap,
  Clock,
  ChevronRight,
  Terminal,
  Database,
  Server,
  Globe
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

const featuredChallenges = [
  {
    title: 'Fix Order State Machine',
    difficulty: 'Medium',
    tags: ['Java', 'Spring Boot'],
    taskType: 'Bug Fix',
    time: '35 min',
    slug: 'fix-order-state-machine',
  },
  {
    title: 'Repair Inventory Reservation',
    difficulty: 'Medium',
    tags: ['Python', 'FastAPI'],
    taskType: 'Bug Fix',
    time: '30 min',
    slug: 'repair-inventory-reservation',
  },
  {
    title: 'Debug Distributed Order Processing',
    difficulty: 'Hard',
    tags: ['Java', 'Spring Boot'],
    taskType: 'Debugging',
    time: '60 min',
    slug: 'debug-distributed-order-processing',
  },
  {
    title: 'Implement Idempotent Payment API',
    difficulty: 'Medium',
    tags: ['Java', 'Spring Boot'],
    taskType: 'Feature',
    time: '40 min',
    slug: 'implement-idempotent-payment-api',
  },
  {
    title: 'Fix Race Condition in Inventory',
    difficulty: 'Hard',
    tags: ['Python', 'FastAPI'],
    taskType: 'Concurrency',
    time: '55 min',
    slug: 'fix-race-condition-in-inventory',
  },
  {
    title: 'Fix Broken Order Validation',
    difficulty: 'Easy',
    tags: ['Java', 'Spring Boot'],
    taskType: 'Bug Fix',
    time: '15 min',
    slug: 'fix-broken-order-validation',
  },
];

const patterns = [
  {
    title: 'Amazon-style',
    description: 'Backend debugging, APIs, business logic, repository tasks',
    accent: 'bg-blue-500',
    border: 'border-blue-500/20',
    icon: Server,
    slug: 'amazon',
  },
  {
    title: 'Microsoft-style',
    description: 'Services, APIs, architecture and practical engineering',
    accent: 'bg-green-500',
    border: 'border-green-500/20',
    icon: Database,
    slug: 'microsoft',
  },
  {
    title: 'Google-style',
    description: 'Algorithms + engineering reasoning',
    accent: 'bg-red-500',
    border: 'border-red-500/20',
    icon: Globe,
    slug: 'google',
  },
  {
    title: 'Startup-style',
    description: 'Rapid feature development and bug fixing',
    accent: 'bg-purple-500',
    border: 'border-purple-500/20',
    icon: Zap,
    slug: 'startup',
  },
];

export default function HomePage() {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      default: return 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border-[hsl(var(--border))]';
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-[hsl(var(--background))] to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[hsl(var(--background))] to-transparent"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
              Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Real Codebases</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[hsl(var(--muted-foreground))]">
              Debug services, fix bugs, implement features, and work through realistic multi-file software engineering tasks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/practice" 
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[hsl(var(--background))]"
              >
                Start Practicing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                href="/practice/repository" 
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3 text-sm font-medium border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--background))]"
              >
                Explore Repositories
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-[hsl(var(--border))] text-center">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">100+</span>
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Repository Challenges</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">20+</span>
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Technology Patterns</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">4</span>
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Difficulty Levels</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">1000+</span>
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Test Cases</span>
            </div>
          </div>
        </section>

        {/* Practice by Company Pattern */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">Practice by Company Pattern</h2>
              <p className="text-[hsl(var(--muted-foreground))]">Inspired by common hiring patterns</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {patterns.map((pattern, idx) => {
              const Icon = pattern.icon;
              return (
                <Link 
                  key={idx} 
                  href={`/practice/repository?pattern=${pattern.slug}`}
                  className={`group flex flex-col p-6 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--ring))] transition-all shadow-sm hover:shadow-md`}
                >
                  <div className={`w-12 h-12 rounded-lg ${pattern.accent} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-4 text-[hsl(var(--foreground))]`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {pattern.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] flex-grow">
                    {pattern.description}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-200">
                    View pattern <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Repository Challenges */}
        <section className="bg-[hsl(var(--muted))] border-y border-[hsl(var(--border))]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">Featured Repository Challenges</h2>
                <p className="text-[hsl(var(--muted-foreground))]">Real-world codebases with embedded test cases</p>
              </div>
              <Link 
                href="/practice/repository"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
              >
                View all challenges <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredChallenges.map((challenge, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden hover:border-[hsl(var(--ring))] transition-all shadow-sm hover:shadow-md"
                >
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </div>
                      <div className="flex items-center text-xs font-medium text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] px-2 py-1 rounded border border-[hsl(var(--border))]">
                        <Terminal className="w-3 h-3 mr-1.5" />
                        {challenge.taskType}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-[hsl(var(--card-foreground))] mb-3 line-clamp-2">
                      {challenge.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto pt-4">
                      {challenge.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-[hsl(var(--border))]">
                          {tag === 'Java' || tag === 'Python' ? <Code2 className="w-3 h-3 mr-1.5" /> : null}
                          {tag === 'Spring Boot' || tag === 'FastAPI' ? <Server className="w-3 h-3 mr-1.5" /> : null}
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[hsl(var(--border))]">
                      <div className="flex items-center text-sm text-[hsl(var(--muted-foreground))]">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {challenge.time}
                      </div>
                      <Link
                        href={`/practice/repository/${challenge.slug}`}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center"
                      >
                        Start Challenge <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center font-bold text-xl tracking-tight mb-4 text-[hsl(var(--foreground))]">
              <GitBranch className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              RepoRank
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Professional software engineering practice platform. Build, debug, and learn with real codebases.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-4">Practice</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/practice/repository" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Repositories</Link></li>
              <li><Link href="/practice/algorithms" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Algorithms</Link></li>
              <li><Link href="/practice/system-design" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">System Design</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Engineering Blog</Link></li>
              <li><Link href="/patterns" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Architecture Patterns</Link></li>
              <li><Link href="/docs" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© {new Date().getFullYear()} RepoRank. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-[hsl(var(--foreground))] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[hsl(var(--foreground))] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
