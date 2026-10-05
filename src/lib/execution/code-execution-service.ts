/* eslint-disable */
/**
 * Mock Code Execution Service
 * 
 * This service simulates code execution and test running for the RepoRank platform.
 * In production, this would be replaced with a sandboxed execution environment
 * (Docker containers, WebContainers, or a remote judge service).
 * 
 * IMPORTANT: All results are simulated based on predefined test data.
 * This is clearly labeled as mock execution throughout the UI.
 */

import type { TestCase, TestSuiteResult, TestResult } from "@/lib/types";

export interface ExecutionResult {
  success: boolean;
  output: string;
  error: string;
  exitCode: number;
}

export interface CompilationResult {
  success: boolean;
  output: string;
  errors: string[];
  warnings: string[];
}

/**
 * Code Execution Service Interface
 * Replace MockExecutionEngine with a real implementation for production.
 */
export interface ICodeExecutionService {
  executeCode(code: string, language: string): Promise<ExecutionResult>;
  runRepositoryTests(
    files: Map<string, string>,
    testCommand: string,
    visibleTests: TestCase[],
    hiddenTestCount: number
  ): Promise<TestSuiteResult>;
  getCompilationOutput(code: string, language: string): Promise<CompilationResult>;
}

/**
 * Mock Execution Engine
 * Simulates test execution based on predefined test case data.
 */
export class MockExecutionEngine implements ICodeExecutionService {
  private simulationDelay = 2000;

  async executeCode(code: string, language: string): Promise<ExecutionResult> {
    await this.delay(1000);
    return {
      success: true,
      output: `[Mock Execution] Code executed successfully.\nLanguage: ${language}\nLines: ${code.split("\n").length}`,
      error: "",
      exitCode: 0,
    };
  }

  async runRepositoryTests(
    files: Map<string, string>,
    testCommand: string,
    visibleTests: TestCase[],
    hiddenTestCount: number
  ): Promise<TestSuiteResult> {
    await this.delay(this.simulationDelay);

    const modifiedFiles = Array.from(files.entries()).filter(
      ([_, content]) => content.length > 0
    );

    // Simulate test results based on visible test data
    const results: TestResult[] = visibleTests.map((test) => ({
      testCaseId: test.id,
      passed: test.isPassed === true,
      executionTime: Math.random() * 200 + 50,
      memoryUsage: Math.random() * 50 + 10,
      output: test.isPassed ? "Test passed" : test.actualOutput || "Assertion failed",
      error: test.isPassed ? "" : test.errorMessage || "Expected value did not match actual value",
    }));

    // Simulate some hidden tests (60% pass rate for hidden tests)
    const hiddenResults: TestResult[] = Array.from(
      { length: hiddenTestCount },
      (_, i) => ({
        testCaseId: `hidden-${i + 1}`,
        passed: Math.random() > 0.4,
        executionTime: Math.random() * 300 + 50,
        memoryUsage: Math.random() * 60 + 10,
        output: "Hidden test",
        error: "",
      })
    );

    const allResults = [...results, ...hiddenResults];
    const passed = allResults.filter((r) => r.passed).length;
    const failed = allResults.length - passed;

    const compilationOutput = `[Mock Execution Environment]\n$ ${testCommand}\n\nCompiling project...\nBuild successful.\n\nRunning ${allResults.length} tests...\n${passed} passed, ${failed} failed\n\nTotal time: ${(Math.random() * 3 + 1).toFixed(2)}s`;

    return {
      totalTests: allResults.length,
      passed,
      failed,
      results,
      executionTime: Math.random() * 5000 + 1000,
      compilationOutput,
    };
  }

  async getCompilationOutput(
    code: string,
    language: string
  ): Promise<CompilationResult> {
    await this.delay(800);
    return {
      success: true,
      output: `[Mock] Compilation successful for ${language}`,
      errors: [],
      warnings: [],
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
let executionService: ICodeExecutionService | null = null;

export function getExecutionService(): ICodeExecutionService {
  if (!executionService) {
    executionService = new MockExecutionEngine();
  }
  return executionService;
}

/**
 * Run visible tests for a challenge.
 * This simulates running the test suite and returns results.
 */
export async function runChallengeTests(
  files: Map<string, string>,
  testCommand: string,
  visibleTests: TestCase[],
  hiddenTestCount: number
): Promise<TestSuiteResult> {
  const service = getExecutionService();
  return service.runRepositoryTests(files, testCommand, visibleTests, hiddenTestCount);
}

/**
 * Generate terminal output for a test run
 */
export function generateTerminalOutput(
  testCommand: string,
  result: TestSuiteResult
): string {
  const lines = [
    `\$ ${testCommand}`,
    "",
    "[Mock Execution Environment]",
    "Note: Results are simulated. Connect a real execution backend for actual code running.",
    "",
    "Compiling project...",
    "Build successful.",
    "",
    `Running ${result.totalTests} tests...`,
    "",
  ];

  result.results.forEach((r) => {
    const icon = r.passed ? "✓" : "✗";
    const status = r.passed ? "PASS" : "FAIL";
    lines.push(`  ${icon} ${status} ${r.testCaseId} (${r.executionTime.toFixed(0)}ms)`);
    if (!r.passed && r.error) {
      lines.push(`    Error: ${r.error}`);
    }
  });

  lines.push("");
  lines.push(`Results: ${result.passed} passed, ${result.failed} failed, ${result.totalTests} total`);
  lines.push(`Time: ${(result.executionTime / 1000).toFixed(2)}s`);

  return lines.join("\n");
}
