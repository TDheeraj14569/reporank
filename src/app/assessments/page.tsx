/* eslint-disable */
'use client'
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Timer, Briefcase, FileCode, Search, Award, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AssessmentsPage() {
  const [starting, setStarting] = useState<string | null>(null);

  const assessments = [
    {
      id: 'mock-1',
      title: 'Amazon-style Repository Mock #1',
      description: 'A realistic simulation of a full repository debugging interview. Features a mix of algorithmic logic within a large codebase.',
      questions: 5,
      time: 120,
      difficulty: 'Mixed',
      skills: ['Java', 'Debugging', 'REST APIs'],
      icon: <Briefcase className="h-6 w-6" />
    },
    {
      id: 'mock-2',
      title: 'Backend Debugging Sprint',
      description: 'Focus on finding and fixing logic bugs and race conditions in a microservices backend setup.',
      questions: 3,
      time: 60,
      difficulty: 'Medium',
      skills: ['Databases', 'Concurrency', 'Node.js'],
      icon: <Search className="h-6 w-6" />
    },
    {
      id: 'mock-3',
      title: 'Full-Stack Challenge',
      description: 'Navigate both frontend and backend repositories to trace a bug from the UI down to the database query.',
      questions: 4,
      time: 90,
      difficulty: 'Hard',
      skills: ['React', 'API', 'SQL'],
      icon: <FileCode className="h-6 w-6" />
    },
    {
      id: 'mock-4',
      title: 'Quick Bug Hunt',
      description: 'A shorter assessment designed to warm up your debugging skills with straightforward logical errors.',
      questions: 3,
      time: 45,
      difficulty: 'Easy-Medium',
      skills: ['Python', 'Testing'],
      icon: <Timer className="h-6 w-6" />
    },
    {
      id: 'mock-5',
      title: 'Senior Engineer Assessment',
      description: 'Extremely challenging scenarios involving architecture flaws, memory leaks, and performance optimization.',
      questions: 5,
      time: 150,
      difficulty: 'Hard-Expert',
      skills: ['Architecture', 'Performance', 'Memory'],
      icon: <Award className="h-6 w-6" />
    }
  ];

  const handleStart = (id: string) => {
    setStarting(id);
    setTimeout(() => {
      window.location.href = `/practice?assessment=${id}`;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Mock Assessments</h1>
          <p className="text-lg text-muted-foreground">
            Test your repository debugging skills with timed assessments. 
            Simulate real interview conditions with multi-file codebases and strict time limits.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map(assessment => (
            <div key={assessment.id} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  {assessment.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{assessment.title}</h2>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><FileCode className="h-4 w-4" /> {assessment.questions} Questions</span>
                    <span className="flex items-center gap-1"><Timer className="h-4 w-4" /> {assessment.time} min</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 text-sm flex-grow">
                {assessment.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-secondary text-secondary-foreground border border-border">
                  {assessment.difficulty}
                </span>
                {assessment.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={() => handleStart(assessment.id)}
                disabled={starting !== null}
                className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {starting === assessment.id ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Preparing Environment...
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-5 w-5" /> Start Assessment
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
