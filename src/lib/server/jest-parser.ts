/**
 * Jest JSON Output Parser
 * 
 * Parses the JSON output from `jest --json` or `npx jest --json`
 * into structured test results for the RepoRank frontend.
 */

export interface ParsedTestResult {
  name: string;
  isPassed: boolean;
  error: string | null;
  timeMs: number;
}

export interface ParsedTestSuite {
  passed: number;
  failed: number;
  total: number;
  tests: ParsedTestResult[];
  rawOutput: string;
}

/**
 * Parse Jest's --json output into structured results.
 * Jest JSON format: { numPassedTests, numFailedTests, testResults: [{ assertionResults: [...] }] }
 */
export function parseJestJsonOutput(stdout: string, stderr: string): ParsedTestSuite {
  // Try to extract JSON from stdout (Jest sometimes prints other stuff before the JSON)
  const jsonMatch = stdout.match(/(\{[\s\S]*"testResults"[\s\S]*\})/);
  
  if (jsonMatch) {
    try {
      const jestOutput = JSON.parse(jsonMatch[1]);
      const tests: ParsedTestResult[] = [];

      if (jestOutput.testResults && Array.isArray(jestOutput.testResults)) {
        for (const suite of jestOutput.testResults) {
          if (suite.assertionResults && Array.isArray(suite.assertionResults)) {
            for (const assertion of suite.assertionResults) {
              tests.push({
                name: assertion.ancestorTitles
                  ? [...assertion.ancestorTitles, assertion.title].join(' › ')
                  : assertion.fullName || assertion.title || 'Unknown Test',
                isPassed: assertion.status === 'passed',
                error: assertion.status === 'failed'
                  ? (assertion.failureMessages || []).join('\n').slice(0, 500)
                  : null,
                timeMs: assertion.duration || 0,
              });
            }
          }
        }
      }

      const passed = tests.filter(t => t.isPassed).length;
      const failed = tests.filter(t => !t.isPassed).length;

      return {
        passed,
        failed,
        total: tests.length,
        tests,
        rawOutput: stdout + (stderr ? '\n' + stderr : ''),
      };
    } catch {
      // JSON parsing failed, fall through to line-based parsing
    }
  }

  // Fallback: parse Jest's human-readable output line by line
  return parseJestTextOutput(stdout, stderr);
}

/**
 * Fallback parser for Jest's human-readable (non-JSON) output.
 * Looks for lines like:
 *   ✓ should process a valid payment event (3 ms)
 *   ✕ should process duplicate events idempotently (1 ms)
 *   PASS ./index.test.js
 *   FAIL ./index.test.js
 */
function parseJestTextOutput(stdout: string, stderr: string): ParsedTestSuite {
  const combined = stdout + '\n' + stderr;
  const tests: ParsedTestResult[] = [];
  const lines = combined.split('\n');

  // Match Jest checkmark/cross lines: "  ✓ test name (3 ms)" or "  √ test name (3 ms)"
  const passPattern = /[✓√]\s+(.+?)(?:\s+\((\d+)\s*m?s\))?$/;
  const failPattern = /[✕×✗]\s+(.+?)(?:\s+\((\d+)\s*m?s\))?$/;

  for (const line of lines) {
    const passMatch = line.match(passPattern);
    if (passMatch) {
      tests.push({
        name: passMatch[1].trim(),
        isPassed: true,
        error: null,
        timeMs: passMatch[2] ? parseInt(passMatch[2], 10) : 0,
      });
      continue;
    }

    const failMatch = line.match(failPattern);
    if (failMatch) {
      tests.push({
        name: failMatch[1].trim(),
        isPassed: false,
        error: extractErrorAfterLine(lines, lines.indexOf(line)),
        timeMs: failMatch[2] ? parseInt(failMatch[2], 10) : 0,
      });
    }
  }

  // If no individual tests found, try to parse summary line
  if (tests.length === 0) {
    const summaryMatch = combined.match(/Tests:\s+(\d+)\s+failed.*?(\d+)\s+passed.*?(\d+)\s+total/);
    const passOnlyMatch = combined.match(/Tests:\s+(\d+)\s+passed.*?(\d+)\s+total/);
    
    if (summaryMatch) {
      const failed = parseInt(summaryMatch[1], 10);
      const passed = parseInt(summaryMatch[2], 10);
      for (let i = 0; i < passed; i++) {
        tests.push({ name: `Test ${i + 1}`, isPassed: true, error: null, timeMs: 0 });
      }
      for (let i = 0; i < failed; i++) {
        tests.push({ name: `Test ${passed + i + 1}`, isPassed: false, error: 'Test failed', timeMs: 0 });
      }
    } else if (passOnlyMatch) {
      const passed = parseInt(passOnlyMatch[1], 10);
      for (let i = 0; i < passed; i++) {
        tests.push({ name: `Test ${i + 1}`, isPassed: true, error: null, timeMs: 0 });
      }
    }
  }

  const passed = tests.filter(t => t.isPassed).length;
  const failed = tests.filter(t => !t.isPassed).length;

  return {
    passed,
    failed,
    total: tests.length,
    tests,
    rawOutput: combined,
  };
}

/**
 * Extract an error message from lines following a failed test.
 */
function extractErrorAfterLine(lines: string[], startIdx: number): string {
  const errorLines: string[] = [];
  for (let i = startIdx + 1; i < Math.min(startIdx + 15, lines.length); i++) {
    const line = lines[i];
    // Stop if we hit another test result line or a blank section
    if (line.match(/[✓√✕×✗]/) || line.match(/^(PASS|FAIL)\s/) || line.trim() === '') break;
    errorLines.push(line.trim());
  }
  return errorLines.join('\n').slice(0, 500) || 'Assertion failed';
}
