/* eslint-disable */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RepositoryFile, TestCase, TestSuiteResult, Submission, PracticeMode, UserSettings } from '@/lib/types';

interface OpenTab {
  path: string;
  name: string;
  language: string;
  isModified: boolean;
}

interface WorkspaceState {
  // Challenge state
  challengeId: string | null;
  challengeTitle: string;
  mode: PracticeMode;
  
  // File system
  files: Map<string, RepositoryFile>;
  originalFiles: Map<string, string>; // path -> original content
  
  // Editor state
  openTabs: OpenTab[];
  activeTabPath: string | null;
  
  // Panel state
  fileTreeVisible: boolean;
  taskPanelVisible: boolean;
  terminalVisible: boolean;
  activeBottomTab: 'terminal' | 'tests' | 'output' | 'problems';
  
  // Timer
  timerSeconds: number;
  timerRunning: boolean;
  timerPaused: boolean;
  
  // Test state
  testResults: TestSuiteResult | null;
  isRunningTests: boolean;
  
  // Submission state
  lastSubmission: Submission | null;
  isSubmitting: boolean;
  
  // Hints
  hintsRevealed: number;
  
  // Actions
  initWorkspace: (challengeId: string, title: string, files: RepositoryFile[], mode: PracticeMode) => void;
  
  // File actions
  openFile: (path: string) => void;
  closeTab: (path: string) => void;
  closeOtherTabs: (path: string) => void;
  closeAllTabs: () => void;
  setActiveTab: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
  saveFile: (path: string) => void;
  revertFile: (path: string) => void;
  resetAllFiles: () => void;
  getModifiedFiles: () => RepositoryFile[];
  
  // Panel actions
  toggleFileTree: () => void;
  toggleTaskPanel: () => void;
  toggleTerminal: () => void;
  setActiveBottomTab: (tab: 'terminal' | 'tests' | 'output' | 'problems') => void;
  
  // Timer actions
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  incrementTimer: () => void;
  resetTimer: () => void;
  
  // Test actions
  setTestResults: (results: TestSuiteResult) => void;
  setIsRunningTests: (running: boolean) => void;
  clearTestResults: () => void;
  
  // Submission actions
  setLastSubmission: (submission: Submission) => void;
  setIsSubmitting: (submitting: boolean) => void;
  
  // Hint actions
  revealNextHint: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()((set, get) => ({
  // Initial state
  challengeId: null,
  challengeTitle: '',
  mode: 'practice',
  files: new Map(),
  originalFiles: new Map(),
  openTabs: [],
  activeTabPath: null,
  fileTreeVisible: true,
  taskPanelVisible: true,
  terminalVisible: false,
  activeBottomTab: 'tests',
  timerSeconds: 0,
  timerRunning: false,
  timerPaused: false,
  testResults: null,
  isRunningTests: false,
  lastSubmission: null,
  isSubmitting: false,
  hintsRevealed: 0,

  initWorkspace: (challengeId, title, files, mode) => {
    const fileMap = new Map<string, RepositoryFile>();
    const originalMap = new Map<string, string>();
    files.forEach(f => {
      fileMap.set(f.path, { ...f, isModified: false });
      originalMap.set(f.path, f.content);
    });
    set({
      challengeId,
      challengeTitle: title,
      mode,
      files: fileMap,
      originalFiles: originalMap,
      openTabs: [],
      activeTabPath: null,
      timerSeconds: 0,
      timerRunning: false,
      timerPaused: false,
      testResults: null,
      isRunningTests: false,
      lastSubmission: null,
      isSubmitting: false,
      hintsRevealed: 0,
      terminalVisible: false,
      activeBottomTab: 'tests',
    });
  },

  openFile: (path) => {
    const state = get();
    const file = state.files.get(path);
    if (!file) return;
    
    const tabExists = state.openTabs.some(t => t.path === path);
    if (!tabExists) {
      set({
        openTabs: [...state.openTabs, {
          path: file.path,
          name: file.name,
          language: file.language,
          isModified: file.isModified,
        }],
        activeTabPath: path,
      });
    } else {
      set({ activeTabPath: path });
    }
  },

  closeTab: (path) => {
    const state = get();
    const newTabs = state.openTabs.filter(t => t.path !== path);
    let newActive = state.activeTabPath;
    if (state.activeTabPath === path) {
      const idx = state.openTabs.findIndex(t => t.path === path);
      newActive = newTabs[Math.min(idx, newTabs.length - 1)]?.path || null;
    }
    set({ openTabs: newTabs, activeTabPath: newActive });
  },

  closeOtherTabs: (path) => {
    const state = get();
    set({
      openTabs: state.openTabs.filter(t => t.path === path),
      activeTabPath: path,
    });
  },

  closeAllTabs: () => set({ openTabs: [], activeTabPath: null }),

  setActiveTab: (path) => set({ activeTabPath: path }),

  updateFileContent: (path, content) => {
    const state = get();
    const file = state.files.get(path);
    if (!file || !file.isEditable) return;
    const original = state.originalFiles.get(path) || '';
    const isModified = content !== original;
    const newFiles = new Map(state.files);
    newFiles.set(path, { ...file, content, isModified });
    const newTabs = state.openTabs.map(t =>
      t.path === path ? { ...t, isModified } : t
    );
    set({ files: newFiles, openTabs: newTabs });
  },

  saveFile: (path) => {
    // In a real app, this would persist. For now, it's handled by updateFileContent.
    const state = get();
    const file = state.files.get(path);
    if (file) {
      // File content is already updated; this is a no-op for persistence placeholder
    }
  },

  revertFile: (path) => {
    const state = get();
    const original = state.originalFiles.get(path);
    if (original === undefined) return;
    const newFiles = new Map(state.files);
    const file = newFiles.get(path);
    if (file) {
      newFiles.set(path, { ...file, content: original, isModified: false });
    }
    const newTabs = state.openTabs.map(t =>
      t.path === path ? { ...t, isModified: false } : t
    );
    set({ files: newFiles, openTabs: newTabs });
  },

  resetAllFiles: () => {
    const state = get();
    const newFiles = new Map<string, RepositoryFile>();
    state.files.forEach((file, path) => {
      const original = state.originalFiles.get(path) || file.content;
      newFiles.set(path, { ...file, content: original, isModified: false });
    });
    const newTabs = state.openTabs.map(t => ({ ...t, isModified: false }));
    set({ files: newFiles, openTabs: newTabs, testResults: null });
  },

  getModifiedFiles: () => {
    const state = get();
    const modified: RepositoryFile[] = [];
    state.files.forEach(file => {
      if (file.isModified) modified.push(file);
    });
    return modified;
  },

  toggleFileTree: () => set(s => ({ fileTreeVisible: !s.fileTreeVisible })),
  toggleTaskPanel: () => set(s => ({ taskPanelVisible: !s.taskPanelVisible })),
  toggleTerminal: () => set(s => ({ terminalVisible: !s.terminalVisible })),
  setActiveBottomTab: (tab) => set({ activeBottomTab: tab, terminalVisible: true }),

  startTimer: () => set({ timerRunning: true, timerPaused: false }),
  pauseTimer: () => set({ timerPaused: true }),
  resumeTimer: () => set({ timerPaused: false }),
  incrementTimer: () => set(s => ({
    timerSeconds: s.timerRunning && !s.timerPaused ? s.timerSeconds + 1 : s.timerSeconds
  })),
  resetTimer: () => set({ timerSeconds: 0, timerRunning: false, timerPaused: false }),

  setTestResults: (results) => set({ testResults: results, isRunningTests: false }),
  setIsRunningTests: (running) => set({ isRunningTests: running }),
  clearTestResults: () => set({ testResults: null }),

  setLastSubmission: (submission) => set({ lastSubmission: submission, isSubmitting: false }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

  revealNextHint: () => set(s => ({ hintsRevealed: Math.min(s.hintsRevealed + 1, 3) })),
}));
