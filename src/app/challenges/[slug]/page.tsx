'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, Check, ChevronLeft, Send, Settings, History } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { dsaQuestions } from '@/lib/data/dsa-questions';
import { cn } from '@/lib/utils';

// Dynamically import Monaco to prevent SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function ChallengePage({ params }: { params: { slug: string } }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const question = dsaQuestions.find(q => q.slug === params.slug);
  
  if (!question && mounted) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<'description' | 'examples' | 'constraints' | 'submissions'>('description');
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState(question?.starterCode.find(s => s.language === 'javascript')?.code || '');
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    if (question) {
      const newCode = question.starterCode.find(s => s.language === language)?.code || '';
      setCode(newCode);
    }
  }, [language, question]);

  if (!mounted || !question) return <div className="h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-[#0f111a] text-gray-300 font-sans">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4 bg-[#1a1d27]">
        <div className="flex items-center gap-4">
          <Link href="/practice/coding" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="h-4 w-px bg-gray-700"></div>
          <h1 className="text-sm font-semibold text-gray-100">{question.id}. {question.title}</h1>
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-medium capitalize",
            question.difficulty === 'easy' && "bg-green-900/30 text-green-400",
            question.difficulty === 'medium' && "bg-yellow-900/30 text-yellow-400",
            question.difficulty === 'hard' && "bg-red-900/30 text-red-400"
          )}>
            {question.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col bg-[#1a1d27] m-2 rounded-lg border border-gray-800 overflow-hidden">
              <div className="flex border-b border-gray-800 px-2 bg-[#232736]">
                {['description', 'examples', 'constraints', 'submissions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={cn(
                      "px-4 py-2 text-xs font-medium capitalize border-b-2 transition-colors",
                      activeTab === tab 
                        ? "border-blue-500 text-blue-400" 
                        : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="flex-1 overflow-auto p-6 scrollbar-hide">
                {activeTab === 'description' && (
                  <div className="space-y-6 prose prose-invert max-w-none">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-4">{question.title}</h2>
                      <p className="text-gray-300 leading-relaxed">{question.problemStatement}</p>
                    </div>
                    
                    <div className="space-y-4">
                      {question.examples.map((ex, i) => (
                        <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                          <p className="font-semibold text-gray-200 mb-2">Example {i + 1}:</p>
                          <div className="font-mono text-sm space-y-1 text-gray-400">
                            <p><span className="text-gray-500">Input:</span> {ex.input}</p>
                            <p><span className="text-gray-500">Output:</span> {ex.output}</p>
                            {ex.explanation && <p className="mt-2 text-gray-500 text-xs">{ex.explanation}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'constraints' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">Constraints:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 font-mono text-sm">
                      {question.constraints.map((c, i) => (
                        <li key={i} className="bg-gray-800/30 px-2 py-1 rounded inline-block">{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === 'examples' && (
                  <div className="space-y-4">
                     {question.examples.map((ex, i) => (
                        <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                          <p className="font-semibold text-gray-200 mb-2">Example {i + 1}:</p>
                          <div className="font-mono text-sm space-y-2 text-gray-400">
                            <div><strong className="text-gray-500">Input:</strong><br/>{ex.input}</div>
                            <div><strong className="text-gray-500">Output:</strong><br/>{ex.output}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {activeTab === 'submissions' && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                    <History className="w-12 h-12 opacity-20" />
                    <p>No previous submissions found.</p>
                  </div>
                )}
              </div>
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-2 hover:w-2 bg-transparent hover:bg-blue-500/50 transition-colors flex items-center justify-center cursor-col-resize">
            <div className="w-0.5 h-8 bg-gray-600 rounded-full"></div>
          </PanelResizeHandle>
          
          {/* Right Panel */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col m-2 rounded-lg border border-gray-800 overflow-hidden bg-[#1e1e1e]">
              <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-800">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-[#3c3c3c] text-sm text-gray-300 rounded px-3 py-1 outline-none border border-gray-700 focus:border-blue-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </select>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-gray-400 hover:text-white transition-colors">Reset</button>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <MonacoEditor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    fontFamily: "var(--font-mono)",
                  }}
                />
              </div>
              
              <div className="h-auto max-h-64 border-t border-gray-800 bg-[#1e1e1e] flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 bg-[#252526]">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setOutput('Running test cases...\nTest 1: Passed\nTest 2: Passed')}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors"
                    >
                      <Play className="w-4 h-4" /> Run
                    </button>
                  </div>
                  <button 
                    onClick={() => setOutput('Submitting solution...\nSuccess! Runtime: 45ms (Beats 98%)\nMemory: 41.2MB (Beats 85%)')}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    <Send className="w-4 h-4" /> Submit
                  </button>
                </div>
                {output && (
                  <div className="p-4 overflow-auto border-t border-gray-800 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                    {output}
                  </div>
                )}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
