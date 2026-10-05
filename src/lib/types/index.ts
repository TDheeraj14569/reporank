/* eslint-disable */
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type TaskType = 
  | 'bug-fix' 
  | 'feature-implementation' 
  | 'debugging' 
  | 'refactoring' 
  | 'api-fix' 
  | 'database-fix' 
  | 'integration' 
  | 'performance' 
  | 'concurrency' 
  | 'testing';

export type QuestionStatus = 
  | 'not-started' 
  | 'in-progress' 
  | 'solved' 
  | 'attempted' 
  | 'failed' 
  | 'bookmarked';

export type CompanyPattern = 
  | 'amazon-style' 
  | 'microsoft-style' 
  | 'google-style' 
  | 'startup-style' 
  | 'general-swe';

export type PracticeMode = 'practice' | 'exam' | 'review';

export interface RepositoryFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isEditable: boolean;
  isModified: boolean;
  originalContent: string;
}

export interface RepositoryFolder {
  name: string;
  path: string;
  children: (RepositoryFile | RepositoryFolder)[];
  isExpanded: boolean;
}

export interface RepositoryStructure {
  name: string;
  files: RepositoryFile[];
  tree: RepositoryFolder;
}

export interface TestCase {
  id: string;
  name: string;
  category: string;
  isVisible: boolean;
  isPassed: boolean | null;
  expectedOutput: string;
  actualOutput: string;
  errorMessage: string;
  file: string;
  line: number;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  executionTime: number;
  memoryUsage: number;
  output: string;
  error: string;
}

export interface TestSuiteResult {
  totalTests: number;
  passed: number;
  failed: number;
  results: TestResult[];
  executionTime: number;
  compilationOutput: string;
}

export interface Hint {
  level: 1 | 2 | 3;
  content: string;
}

export interface EditorialKeyChange {
  file: string;
  original: string;
  corrected: string;
}

export interface Editorial {
  summary: string;
  architecture: string;
  rootCause: string;
  filesResponsible: string[];
  explanation: string;
  correctApproach: string;
  keyChanges: EditorialKeyChange[];
  testingStrategy: string;
  complexity: string;
  lesson: string;
}

export interface RepositoryChallenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  taskType: TaskType;
  technology: string[];
  language: string;
  estimatedTimeMinutes: number;
  skills: string[];
  tags: string[];
  companyPattern: CompanyPattern;
  repositoryName: string;
  repositoryStructure: RepositoryStructure;
  starterFiles: RepositoryFile[];
  editableFiles: string[];
  readOnlyFiles: string[];
  runCommand: string;
  testCommand: string;
  visibleTests: TestCase[];
  hiddenTests: TestCase[];
  requirements: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  hints: Hint[];
  editorial: Editorial;
  status: QuestionStatus;
  completionPercentage: number;
}

export interface DSAExample {
  input: string;
  output: string;
  explanation: string;
}

export interface DSAStarterCode {
  language: string;
  code: string;
}

export interface DSAQuestion {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: DSAExample[];
  tags: string[];
  category: string;
  starterCode: DSAStarterCode[];
  editorial: string;
  status: QuestionStatus;
}

export interface ModifiedFile {
  path: string;
  content: string;
  originalContent: string;
}

export interface Submission {
  id: string;
  challengeId: string;
  timestamp: Date;
  mode: PracticeMode;
  modifiedFiles: ModifiedFile[];
  testResults: TestSuiteResult;
  score: number;
  totalTests: number;
  passedTests: number;
  timeSpent: number;
  status: 'passed' | 'failed' | 'partial';
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: string[];
  timeLimit: number;
  difficulty: Difficulty;
  skills: string[];
  companyPattern: CompanyPattern;
}

export interface UserProgress {
  challengeId: string;
  status: QuestionStatus;
  submissions: Submission[];
  bookmarked: boolean;
  hintsUsed: number;
  timeSpent: number;
  lastAttempt: Date | null;
}

export interface SkillBreakdown {
  skill: string;
  solved: number;
  total: number;
}

export interface UserStats {
  totalSolved: number;
  repositorySolved: number;
  dsaSolved: number;
  currentStreak: number;
  longestStreak: number;
  averageCompletionTime: number;
  successPercentage: number;
  skillBreakdown: SkillBreakdown[];
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  editorFontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimapEnabled: boolean;
  autocompleteEnabled: boolean;
  terminalVisible: boolean;
}
