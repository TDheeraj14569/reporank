/* eslint-disable */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuestionStatus, Submission, UserStats } from '@/lib/types';

interface ChallengeProgress {
  challengeId: string;
  status: QuestionStatus;
  bookmarked: boolean;
  hintsUsed: number;
  timeSpent: number;
  submissions: Submission[];
  lastAttempt: string | null;
}

interface ProgressState {
  progress: Record<string, ChallengeProgress>;
  
  // Actions
  getProgress: (challengeId: string) => ChallengeProgress;
  updateStatus: (challengeId: string, status: QuestionStatus) => void;
  toggleBookmark: (challengeId: string) => void;
  addSubmission: (challengeId: string, submission: Submission) => void;
  addTimeSpent: (challengeId: string, seconds: number) => void;
  incrementHints: (challengeId: string) => void;
  isBookmarked: (challengeId: string) => boolean;
  getStats: () => UserStats;
  getBookmarkedIds: () => string[];
}

const defaultProgress = (challengeId: string): ChallengeProgress => ({
  challengeId,
  status: 'not-started',
  bookmarked: false,
  hintsUsed: 0,
  timeSpent: 0,
  submissions: [],
  lastAttempt: null,
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},

      getProgress: (challengeId) => {
        return get().progress[challengeId] || defaultProgress(challengeId);
      },

      updateStatus: (challengeId, status) => {
        const state = get();
        const current = state.progress[challengeId] || defaultProgress(challengeId);
        set({
          progress: {
            ...state.progress,
            [challengeId]: { ...current, status, lastAttempt: new Date().toISOString() },
          },
        });
      },

      toggleBookmark: (challengeId) => {
        const state = get();
        const current = state.progress[challengeId] || defaultProgress(challengeId);
        set({
          progress: {
            ...state.progress,
            [challengeId]: { ...current, bookmarked: !current.bookmarked },
          },
        });
      },

      addSubmission: (challengeId, submission) => {
        const state = get();
        const current = state.progress[challengeId] || defaultProgress(challengeId);
        set({
          progress: {
            ...state.progress,
            [challengeId]: {
              ...current,
              submissions: [...current.submissions, submission],
              lastAttempt: new Date().toISOString(),
            },
          },
        });
      },

      addTimeSpent: (challengeId, seconds) => {
        const state = get();
        const current = state.progress[challengeId] || defaultProgress(challengeId);
        set({
          progress: {
            ...state.progress,
            [challengeId]: { ...current, timeSpent: current.timeSpent + seconds },
          },
        });
      },

      incrementHints: (challengeId) => {
        const state = get();
        const current = state.progress[challengeId] || defaultProgress(challengeId);
        set({
          progress: {
            ...state.progress,
            [challengeId]: { ...current, hintsUsed: current.hintsUsed + 1 },
          },
        });
      },

      isBookmarked: (challengeId) => {
        return get().progress[challengeId]?.bookmarked || false;
      },

      getBookmarkedIds: () => {
        const state = get();
        return Object.entries(state.progress)
          .filter(([_, p]) => p.bookmarked)
          .map(([id]) => id);
      },

      getStats: () => {
        const state = get();
        const entries = Object.values(state.progress);
        const solved = entries.filter(e => e.status === 'solved');
        const attempted = entries.filter(e => e.submissions.length > 0);
        
        return {
          totalSolved: solved.length,
          repositorySolved: solved.length,
          dsaSolved: 0,
          currentStreak: Math.min(solved.length, 7),
          longestStreak: Math.min(solved.length, 14),
          averageCompletionTime: solved.length > 0
            ? Math.round(solved.reduce((sum, e) => sum + e.timeSpent, 0) / solved.length / 60)
            : 0,
          successPercentage: attempted.length > 0
            ? Math.round((solved.length / attempted.length) * 100)
            : 0,
          skillBreakdown: [
            { skill: 'REST APIs', solved: Math.min(solved.length, 12), total: 25 },
            { skill: 'Java', solved: Math.min(solved.length, 8), total: 25 },
            { skill: 'Debugging', solved: Math.min(solved.length, 10), total: 30 },
            { skill: 'Databases', solved: Math.min(solved.length, 5), total: 20 },
            { skill: 'Repository Navigation', solved: Math.min(solved.length, 9), total: 25 },
            { skill: 'Testing', solved: Math.min(solved.length, 7), total: 20 },
            { skill: 'Concurrency', solved: Math.min(solved.length, 3), total: 10 },
            { skill: 'Performance', solved: Math.min(solved.length, 4), total: 10 },
          ],
        };
      },
    }),
    {
      name: 'reporank-progress',
    }
  )
);
