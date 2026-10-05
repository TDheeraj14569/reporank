'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { 
  Play, CheckCircle, RotateCcw, Settings, ChevronRight, ChevronDown, 
  File, Folder, Search, X, MessageSquare, Code, Terminal, AlertCircle, 
  Settings2, Pause, PlayCircle, Loader2, GitCommit, FileCode, Check, Target, Trophy, Clock, Zap
} from 'lucide-react';

import { useWorkspaceStore } from '@/lib/stores/workspace-store';
import { sampleRepositories, FullRepository } from '@/lib/data/sample-repositories';
import { challengesMetadata } from '@/lib/data/challenges-metadata';
import { cn, formatTime, getLanguageFromFilename, getDifficultyColor } from '@/lib/utils';

// Dynamically import Monaco Editor
const MonacoEditor = dynamic(() => import('@monaco-editor/react').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => <div className="flex-1 flex items-center justify-center bg-[hsl(var(--background))]"><div className="text-[hsl(var(--muted-foreground))] text-sm">Loading editor...</div></div>
});

const MonacoDiffEditor = dynamic(() => import('@monaco-editor/react').then(mod => ({ default: mod.DiffEditor })), {
  ssr: false,
  loading: () => <div className="flex-1 flex items-center justify-center"><div className="text-sm text-[hsl(var(--muted-foreground))]">Loading diff view...</div></div>
});

// File tree interface
interface FileTreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children: FileTreeNode[];
  isExpanded: boolean;
}

export default function RepositoryWorkspacePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  
  // Workspace store
  const {
    files,
    openTabs: openFiles,
    activeTabPath: activeFile,
    initWorkspace,
    openFile,
    closeTab: closeFile,
    setActiveTab: setActiveFile,
    updateFileContent: updateFile,
    resetAllFiles: resetWorkspace,
  } = useWorkspaceStore();

  // Local state
  const [isMobile, setIsMobile] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState<any>(null);
  const [fullRepo, setFullRepo] = useState<FullRepository | null>(null);
  const [loading, setLoading] = useState(true);
  
  // File tree state
  const [fileTree, setFileTree] = useState<FileTreeNode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  
  // Panels state
  const [activeRightTab, setActiveRightTab] = useState<'task' | 'tests' | 'hints'>('task');
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'output' | 'problems'>('terminal');
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);
  
  // Settings state
  const [fontSize, setFontSize] = useState(14);
  const [minimap, setMinimap] = useState(true);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  const [showSettings, setShowSettings] = useState(false);
  
  // Actions state
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  
  // Editor view state
  const [isDiffView, setIsDiffView] = useState(false);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load challenge data
  useEffect(() => {
    if (!slug) return;
    
    let isMounted = true;
    async function loadRepo() {
      try {
        const res = await fetch(`/api/repositories/${slug}`);
        if (!res.ok) {
          if (isMounted) setLoading(false);
          return;
        }
        
        const data = await res.json();
        
        if (isMounted) {
          if (data.legacy) {
            setFullRepo(data.metadata as FullRepository);
            setChallengeInfo(challengesMetadata.find(c => c.slug === slug || String(c.id) === slug) || data.metadata);
            initWorkspace(data.id, data.title, data.files, 'practice');
          } else {
            setFullRepo(data.metadata as any);
            setChallengeInfo(data.metadata as any);
            initWorkspace(data.id, data.title, data.files, 'practice');
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    
    loadRepo();
    
    return () => { isMounted = false; };
  }, [slug, initWorkspace]);

  // Build file tree
  useEffect(() => {
    if (files.size === 0) return;
    
    const tree: FileTreeNode[] = [];
    
    // Simple path splitting to build tree
    const filePaths = Array.from(files.values()).map(f => f.path);
    
    filePaths.forEach(path => {
      const parts = path.split('/');
      let currentLevel = tree;
      
      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        const currentPath = parts.slice(0, index + 1).join('/');
        
        let existingNode = currentLevel.find(n => n.name === part);
        
        if (!existingNode) {
          existingNode = {
            name: part,
            path: currentPath,
            type: isFile ? 'file' : 'folder',
            children: [],
            isExpanded: true // Default expanded
          };
          currentLevel.push(existingNode);
        }
        
        currentLevel = existingNode.children;
      });
    });
    
    // Sort: folders first, then files alphabetically
    const sortTree = (nodes: FileTreeNode[]) => {
      nodes.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      nodes.forEach(n => {
        if (n.children.length > 0) sortTree(n.children);
      });
    };
    
    sortTree(tree);
    setFileTree(tree);
  }, [files]);

  // Timer logic
  useEffect(() => {
    if (isTimerPaused || loading) return;
    
    const interval = setInterval(() => {
      setTimerSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isTimerPaused, loading]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Just mock save by marking dirty as false if we had that state
        console.log('Saved');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Action handlers
  const [terminalLog, setTerminalLog] = useState<string>('');

  const handleRunTests = async () => {
    setIsRunningTests(true);
    setTestResults(null);
    setTerminalLog('$ Running tests...\n');
    setIsBottomPanelOpen(true);
    setActiveBottomTab('terminal');
    
    try {
      // Collect user's current file contents from the workspace store
      const modifiedFiles: Record<string, string> = {};
      files.forEach((file, filePath) => {
        modifiedFiles[filePath] = file.content;
      });

      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          modifiedFiles,
        }),
      });

      const result = await res.json();

      setTerminalLog(result.terminalOutput || 'No output');
      setTestResults({
        passed: result.passed,
        total: result.total,
        tests: result.tests.map((t: any) => ({
          ...t,
          id: t.name,
          name: t.name,
          status: t.isPassed ? 'passed' : 'failed',
        })),
      });
      setActiveRightTab('tests');
    } catch (err: any) {
      setTerminalLog(`❌ Failed to connect to execution engine: ${err.message}`);
      setTestResults(null);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const modifiedFiles: Record<string, string> = {};
      files.forEach((file, filePath) => {
        modifiedFiles[filePath] = file.content;
      });

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          slug, 
          modifiedFiles, 
          passed: testResults?.passed, 
          total: testResults?.total 
        }),
      });
      const data = await response.json();
      
      if (data.status === 'PASSED') {
        alert(`Submission successful! You earned ${data.pointsAwarded} points.`);
        router.push('/dashboard');
      } else {
        alert(`Submission failed! ${data.passed}/${data.total} tests passed. Check the terminal.`);
        // Run tests locally so the user can see the failure
        handleRunTests();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetWorkspace();
    setShowResetConfirm(false);
  };

  // Editor change handler
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && activeFile) {
      updateFile(activeFile, value);
    }
  };

  // File tree rendering
  const renderTree = (nodes: FileTreeNode[], depth = 0) => {
    return nodes.map((node) => {
      const isMatch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
      const hasMatchInChild = false; // Simplified search
      
      if (searchQuery && !isMatch && !hasMatchInChild && node.type === 'file') return null;
      
      const fileData = node.type === 'file' ? files.get(node.path) : null;
      const isModified = fileData?.isModified;
      const isActive = activeFile === node.path;
      
      if (node.type === 'folder') {
        return (
          <div key={node.path} className="flex flex-col">
            <div 
              className={cn(
                "flex items-center py-1 px-2 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] cursor-pointer text-[13px] text-[hsl(var(--muted-foreground))]",
              )}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
              onClick={() => {
                // Toggle expand
                const toggleExpand = (tree: FileTreeNode[]): FileTreeNode[] => {
                  return tree.map(n => {
                    if (n.path === node.path) return { ...n, isExpanded: !n.isExpanded };
                    if (n.children.length > 0) return { ...n, children: toggleExpand(n.children) };
                    return n;
                  });
                };
                setFileTree(toggleExpand(fileTree));
              }}
            >
              {node.isExpanded ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
              <Folder size={14} className="mr-2 text-blue-400" />
              <span className="truncate">{node.name}</span>
            </div>
            {node.isExpanded && node.children.length > 0 && (
              <div className="flex flex-col">
                {renderTree(node.children, depth + 1)}
              </div>
            )}
          </div>
        );
      }
      
      return (
        <div 
          key={node.path}
          className={cn(
            "flex items-center py-1 px-2 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] cursor-pointer text-[13px] group",
            isActive ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]" : "text-[hsl(var(--muted-foreground))]"
          )}
          style={{ paddingLeft: `${depth * 12 + 26}px` }}
          onClick={() => openFile(node.path)}
        >
          <FileCode size={14} className="mr-2 opacity-70" />
          <span className="truncate flex-1">{node.name}</span>
          {isModified && <div className="w-2 h-2 rounded-full bg-yellow-500 ml-2" />}
        </div>
      );
    });
  };

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] p-6 text-center">
        <div className="max-w-md flex flex-col items-center">
          <Code size={48} className="text-[hsl(var(--primary))] mb-4" />
          <h1 className="text-xl font-bold mb-2 text-[hsl(var(--foreground))]">Desktop Required</h1>
          <p className="text-[hsl(var(--muted-foreground))] mb-6">
            For the full repository IDE experience, use a desktop-sized screen.
          </p>
          <Link href="/practice" className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <Loader2 className="animate-spin" size={20} />
          <span>Loading workspace...</span>
        </div>
      </div>
    );
  }

  const activeFileData = activeFile ? files.get(activeFile) : null;

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden">
      {/* HEADER */}
      <header className="h-[44px] flex-shrink-0 flex items-center justify-between px-4 border-b border-[#333333] bg-[#252526]">
        {/* Left: Logo & Info */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              RR
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-white">{challengeInfo?.title || 'Repository Challenge'}</h1>
            {challengeInfo?.difficulty && (
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", getDifficultyColor(challengeInfo.difficulty))}>
                {challengeInfo.difficulty}
              </span>
            )}
          </div>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-2 bg-[#1e1e1e] px-3 py-1 rounded border border-[#333333]">
          <Clock size={14} className="text-gray-400" />
          <span className="text-sm font-mono text-gray-200">{formatTime(timerSeconds)}</span>
          <button 
            onClick={() => setIsTimerPaused(!isTimerPaused)}
            className="ml-1 hover:text-white text-gray-400 focus:outline-none"
            title={isTimerPaused ? "Resume" : "Pause"}
          >
            {isTimerPaused ? <PlayCircle size={14} /> : <Pause size={14} />}
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunTests}
            disabled={isRunningTests}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-[#37373d] hover:bg-[#4d4d54] text-white transition-colors disabled:opacity-50"
          >
            {isRunningTests ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            Run Tests
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
            Submit
          </button>
          
          <div className="h-4 w-px bg-[#444] mx-1"></div>

          {/* Settings Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#37373d] rounded transition-colors"
              title="Settings"
            >
              <Settings size={16} />
            </button>
            
            {showSettings && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-[#252526] border border-[#454545] shadow-xl rounded z-50 text-sm">
                <div className="p-3 border-b border-[#454545] font-semibold text-white">Workspace Settings</div>
                <div className="p-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Font Size</span>
                    <input 
                      type="number" 
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-16 bg-[#3c3c3c] border border-[#555] rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Minimap</span>
                    <button 
                      onClick={() => setMinimap(!minimap)}
                      className={cn("px-2 py-1 rounded text-xs", minimap ? "bg-blue-600 text-white" : "bg-[#3c3c3c] text-gray-300")}
                    >
                      {minimap ? 'On' : 'Off'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Word Wrap</span>
                    <button 
                      onClick={() => setWordWrap(wordWrap === 'on' ? 'off' : 'on')}
                      className={cn("px-2 py-1 rounded text-xs", wordWrap === 'on' ? "bg-blue-600 text-white" : "bg-[#3c3c3c] text-gray-300")}
                    >
                      {wordWrap === 'on' ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowResetConfirm(true)}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-[#37373d] rounded transition-colors"
            title="Reset Repository"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL: FILE TREE */}
          <Panel defaultSize={20} minSize={15} className="bg-[#252526] flex flex-col border-r border-[#333333]">
            <div className="h-9 px-3 flex items-center text-xs font-semibold uppercase tracking-wider text-gray-400">
              Explorer
            </div>
            
            <div className="px-2 pb-2">
              <div className="relative">
                <Search size={14} className="absolute left-2 top-1.5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#3c3c3c] border border-transparent focus:border-blue-500 rounded px-2 py-1 pl-7 text-xs text-white outline-none"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto py-1">
              {renderTree(fileTree)}
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-transparent hover:bg-blue-600 transition-colors cursor-col-resize" />

          {/* CENTER PANEL: EDITOR */}
          <Panel defaultSize={50} minSize={30} className="flex flex-col bg-[#1e1e1e] border-r border-[#333333]">
            
            {/* Editor Tabs */}
            <div className="h-9 flex bg-[#2d2d2d] overflow-x-auto no-scrollbar scrollbar-hide">
              {openFiles.map(tab => {
                const filePath = typeof tab === 'string' ? tab : tab.path;
                const file = files.get(filePath);
                const isActive = activeFile === filePath;
                const fileName = typeof tab === 'string' ? (filePath.split('/').pop() || filePath) : tab.name;
                
                return (
                  <div 
                    key={filePath}
                    className={cn(
                      "flex items-center h-full px-3 border-r border-[#1e1e1e] cursor-pointer min-w-fit max-w-[200px] text-[13px] group",
                      isActive ? "bg-[#1e1e1e] text-white border-t border-t-blue-500" : "bg-[#2d2d2d] text-gray-400 hover:bg-[#2b2b2b]"
                    )}
                    onClick={() => setActiveFile(filePath)}
                  >
                    <FileCode size={14} className={cn("mr-2", isActive ? "text-blue-400" : "text-gray-500")} />
                    <span className="truncate mr-3">{fileName}</span>
                    
                    <div className="flex items-center">
                      {file?.isModified && !isActive && (
                        <div className="w-2 h-2 rounded-full bg-white opacity-50 mr-1" />
                      )}
                      {file?.isModified && isActive && (
                        <div className="w-2 h-2 rounded-full bg-white mr-1" />
                      )}
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          closeFile(filePath);
                        }}
                        className={cn(
                          "p-0.5 rounded hover:bg-[#333333]",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                          file?.isModified ? "hidden group-hover:block" : "block"
                        )}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Editor Breadcrumbs / Actions */}
            {activeFile && (
              <div className="h-7 px-4 flex items-center justify-between text-xs text-gray-400 border-b border-[#333333]">
                <div className="flex items-center gap-1">
                  <span>{fullRepo?.repositoryName || 'repo'}</span>
                  <ChevronRight size={12} />
                  <span>{activeFile.split('/').join(' / ')}</span>
                </div>
                
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsDiffView(!isDiffView)}
                    className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded hover:bg-[#333]"
                  >
                    <GitCommit size={12} />
                    {isDiffView ? 'Editor' : 'View Diff'}
                  </button>
                </div>
              </div>
            )}

            {/* Monaco Editor Container */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              {!activeFile ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-[#252526] flex items-center justify-center border border-[#333]">
                    <Code size={48} className="text-[#444]" />
                  </div>
                  <p className="text-sm">Open a file from the tree to start editing</p>
                  
                  <div className="mt-8 flex gap-8 text-xs">
                    <div className="flex items-center gap-2">
                      <kbd className="bg-[#333] px-2 py-1 rounded text-gray-300">Ctrl</kbd> + <kbd className="bg-[#333] px-2 py-1 rounded text-gray-300">P</kbd>
                      <span>Search Files</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="bg-[#333] px-2 py-1 rounded text-gray-300">Ctrl</kbd> + <kbd className="bg-[#333] px-2 py-1 rounded text-gray-300">S</kbd>
                      <span>Save File</span>
                    </div>
                  </div>
                </div>
              ) : (
                <PanelGroup direction="vertical">
                  <Panel defaultSize={isBottomPanelOpen ? 70 : 100} minSize={20}>
                    {isDiffView && activeFileData?.originalContent ? (
                      <MonacoDiffEditor
                        theme="vs-dark"
                        original={activeFileData.originalContent}
                        modified={activeFileData.content}
                        language={getLanguageFromFilename(activeFile) || 'javascript'}
                        options={{
                          fontSize,
                          minimap: { enabled: minimap },
                          wordWrap,
                          renderSideBySide: true,
                          readOnly: true
                        }}
                      />
                    ) : (
                      <MonacoEditor
                        theme="vs-dark"
                        path={activeFile}
                        language={getLanguageFromFilename(activeFile) || 'javascript'}
                        value={activeFileData?.content || ''}
                        onChange={handleEditorChange}
                        options={{
                          fontSize,
                          minimap: { enabled: minimap },
                          wordWrap,
                          automaticLayout: true,
                          scrollBeyondLastLine: false,
                          tabSize: 2,
                          insertSpaces: true,
                          roundedSelection: false,
                          padding: { top: 16 }
                        }}
                      />
                    )}
                  </Panel>
                  
                  {isBottomPanelOpen && (
                    <>
                      <PanelResizeHandle className="h-1 bg-[#333] hover:bg-blue-600 transition-colors cursor-row-resize" />
                      <Panel defaultSize={30} minSize={10} className="bg-[#1e1e1e] flex flex-col">
                        <div className="h-9 flex items-center px-4 border-b border-[#333333] gap-4">
                          <button 
                            className={cn("text-[11px] uppercase tracking-wider font-semibold pb-2 border-b-2 mt-2", activeBottomTab === 'terminal' ? "text-white border-blue-500" : "text-gray-500 border-transparent hover:text-gray-300")}
                            onClick={() => setActiveBottomTab('terminal')}
                          >
                            Terminal
                          </button>
                          <button 
                            className={cn("text-[11px] uppercase tracking-wider font-semibold pb-2 border-b-2 mt-2", activeBottomTab === 'output' ? "text-white border-blue-500" : "text-gray-500 border-transparent hover:text-gray-300")}
                            onClick={() => setActiveBottomTab('output')}
                          >
                            Output
                          </button>
                          <button 
                            className={cn("text-[11px] uppercase tracking-wider font-semibold pb-2 border-b-2 mt-2", activeBottomTab === 'problems' ? "text-white border-blue-500" : "text-gray-500 border-transparent hover:text-gray-300")}
                            onClick={() => setActiveBottomTab('problems')}
                          >
                            Problems
                          </button>
                          
                          <div className="flex-1"></div>
                          <button 
                            onClick={() => setIsBottomPanelOpen(false)}
                            className="text-gray-500 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        
                        <div className="flex-1 p-3 text-sm font-mono overflow-y-auto">
                          {activeBottomTab === 'terminal' && (
                            <div className="whitespace-pre-wrap">
                              {isRunningTests && !terminalLog && (
                                <div className="text-yellow-400">⏳ Connecting to execution engine...</div>
                              )}
                              {terminalLog ? (
                                <div className="text-gray-300">{terminalLog}</div>
                              ) : !isRunningTests ? (
                                <div>
                                  <div className="text-gray-400">reporank@workspace:~$ <span className="text-green-400">Ready</span></div>
                                  <div className="text-gray-500 mt-1">Click &quot;Run Tests&quot; to execute the test suite.</div>
                                </div>
                              ) : null}
                            </div>
                          )}
                          {activeBottomTab === 'output' && (
                            <div className="text-gray-400">
                              [Build] Initialize build process...<br/>
                              [Build] Compiling modules...<br/>
                              [Build] Done in 1.2s.
                            </div>
                          )}
                          {activeBottomTab === 'problems' && (
                            <div className="text-gray-500 flex items-center gap-2">
                              <CheckCircle size={14} className="text-green-500"/> No problems have been detected in the workspace.
                            </div>
                          )}
                        </div>
                      </Panel>
                    </>
                  )}
                </PanelGroup>
              )}
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#333] hover:bg-blue-600 transition-colors cursor-col-resize" />

          {/* RIGHT PANEL: TASK INFO */}
          <Panel defaultSize={30} minSize={20} className="bg-[#252526] flex flex-col">
            <div className="h-9 flex items-center px-4 border-b border-[#333333] gap-4">
              <button 
                className={cn("text-[11px] uppercase tracking-wider font-semibold pb-2 border-b-2 mt-2", activeRightTab === 'task' ? "text-white border-blue-500" : "text-gray-500 border-transparent hover:text-gray-300")}
                onClick={() => setActiveRightTab('task')}
              >
                <Target size={12} className="inline mr-1" /> Task
              </button>
              <button 
                className={cn("text-[11px] uppercase tracking-wider font-semibold pb-2 border-b-2 mt-2", activeRightTab === 'tests' ? "text-white border-blue-500" : "text-gray-500 border-transparent hover:text-gray-300")}
                onClick={() => setActiveRightTab('tests')}
              >
                <CheckCircle size={12} className="inline mr-1" /> Tests
              </button>
              <button 
                className={cn("text-[11px] uppercase tracking-wider font-semibold pb-2 border-b-2 mt-2", activeRightTab === 'hints' ? "text-white border-blue-500" : "text-gray-500 border-transparent hover:text-gray-300")}
                onClick={() => setActiveRightTab('hints')}
              >
                <Zap size={12} className="inline mr-1" /> Hints
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {activeRightTab === 'task' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-2">{challengeInfo?.title}</h2>
                    <p className="text-sm text-gray-400">{challengeInfo?.description}</p>
                  </div>
                  
                  {challengeInfo?.requirements && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Code size={16} /> Requirements
                      </h3>
                      <ul className="space-y-3">
                        {challengeInfo.requirements.map((req: string, i: number) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-300 items-start">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#333] flex items-center justify-center text-[10px] mt-0.5 text-gray-400">
                              {i + 1}
                            </span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {challengeInfo?.skills && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Skills Tested</h3>
                      <div className="flex flex-wrap gap-2">
                        {challengeInfo.skills.map((skill: string, i: number) => (
                          <span key={i} className="px-2 py-1 rounded text-xs bg-[#333] text-gray-300 border border-[#444]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeRightTab === 'tests' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Test Results</h3>
                    {testResults && (
                      <div className={cn("text-sm font-medium", testResults.passed === testResults.total ? "text-green-400" : "text-yellow-400")}>
                        {testResults.passed} / {testResults.total} Passed
                      </div>
                    )}
                  </div>
                  
                  {!testResults && !isRunningTests && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle size={32} className="mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Run tests to see results</p>
                      <button 
                        onClick={handleRunTests}
                        className="mt-4 px-4 py-1.5 bg-[#333] hover:bg-[#444] text-white text-sm rounded transition-colors"
                      >
                        Run Now
                      </button>
                    </div>
                  )}
                  
                  {isRunningTests && (
                    <div className="text-center py-8 text-gray-500">
                      <Loader2 size={32} className="mx-auto mb-3 animate-spin text-blue-500" />
                      <p className="text-sm">Running test suite...</p>
                    </div>
                  )}
                  
                  {testResults && (
                    <div className="space-y-3">
                      {testResults.tests.map((test: any, i: number) => (
                        <div key={i} className="border border-[#333] rounded-md overflow-hidden">
                          <div className={cn("px-3 py-2 flex items-center justify-between", test.isPassed ? "bg-[#1a2e22]" : "bg-[#331c1c]")}>
                            <div className="flex items-center gap-2">
                              {test.isPassed ? (
                                <CheckCircle size={14} className="text-green-500" />
                              ) : (
                                <X size={14} className="text-red-500" />
                              )}
                              <span className="text-sm font-medium text-gray-200">{test.name}</span>
                            </div>
                          </div>
                          {!test.isPassed && test.error && (
                            <div className="p-3 bg-[#1e1e1e] border-t border-[#333]">
                              <p className="text-xs font-mono text-red-400 break-words">{test.error}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeRightTab === 'hints' && (
                <div className="space-y-4">
                  {challengeInfo?.hints ? (
                    <>
                      {challengeInfo.hints.slice(0, hintsRevealed).map((hint: string, i: number) => (
                        <div key={i} className="p-4 bg-[#2d2d2d] border border-[#444] rounded-md">
                          <h4 className="text-xs font-semibold text-yellow-500 mb-2 uppercase tracking-wider">Hint {i + 1}</h4>
                          <p className="text-sm text-gray-300 leading-relaxed">{hint}</p>
                        </div>
                      ))}
                      
                      {hintsRevealed < challengeInfo.hints.length && (
                        <button
                          onClick={() => setHintsRevealed(h => h + 1)}
                          className="w-full py-2 bg-[#333] hover:bg-[#444] border border-[#555] rounded text-sm text-white transition-colors"
                        >
                          Reveal Hint {hintsRevealed + 1}
                        </button>
                      )}
                      
                      {hintsRevealed > 0 && hintsRevealed === challengeInfo.hints.length && (
                        <div className="text-center text-sm text-gray-500 mt-4">
                          All hints revealed.
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No hints available for this challenge.
                    </div>
                  )}
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* STATUS BAR */}
      <footer className="h-6 flex-shrink-0 bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:bg-[#1f8ad1] px-1.5 py-0.5 rounded cursor-pointer transition-colors" onClick={() => setIsBottomPanelOpen(!isBottomPanelOpen)}>
            <Terminal size={12} />
            <span>Workspace</span>
          </div>
          {activeFile && (
            <div className="flex items-center gap-1">
              <File size={12} />
              <span>{activeFile.split('/').pop()}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {activeFile && (
            <>
              <div className="hover:bg-[#1f8ad1] px-1.5 py-0.5 rounded cursor-pointer transition-colors">Ln 1, Col 1</div>
              <div className="hover:bg-[#1f8ad1] px-1.5 py-0.5 rounded cursor-pointer transition-colors">Spaces: 2</div>
              <div className="hover:bg-[#1f8ad1] px-1.5 py-0.5 rounded cursor-pointer transition-colors">UTF-8</div>
              <div className="hover:bg-[#1f8ad1] px-1.5 py-0.5 rounded cursor-pointer transition-colors">LF</div>
              <div className="hover:bg-[#1f8ad1] px-1.5 py-0.5 rounded cursor-pointer transition-colors uppercase">
                {getLanguageFromFilename(activeFile) || 'Plain Text'}
              </div>
            </>
          )}
          <div className="flex items-center gap-1 hover:bg-[#1f8ad1] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
            <Target size={12} />
            <span>RepoRank</span>
          </div>
        </div>
      </footer>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="bg-[#252526] border border-[#454545] rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Reset Repository?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This will discard all your changes and reset all files to their original state. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-[#3c3c3c] hover:bg-[#4d4d54] rounded transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
