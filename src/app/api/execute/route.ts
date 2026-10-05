/**
 * POST /api/execute
 * 
 * Executes the user's modified code against the challenge's test suite.
 * For Node.js projects: runs real npm test with Jest.
 * For other runtimes: uses intelligent diff-based analysis.
 */

import { NextResponse } from 'next/server';
import { executeChallenge, type ExecutionRequest } from '@/lib/server/execution-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { slug, modifiedFiles } = body as {
      slug: string;
      modifiedFiles: Record<string, string>;
    };

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing required field: slug' },
        { status: 400 }
      );
    }

    if (!modifiedFiles || typeof modifiedFiles !== 'object') {
      return NextResponse.json(
        { error: 'Missing required field: modifiedFiles' },
        { status: 400 }
      );
    }

    const executionRequest: ExecutionRequest = {
      slug,
      modifiedFiles,
    };

    const result = await executeChallenge(executionRequest);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Execution error:', error);
    return NextResponse.json(
      {
        success: false,
        passed: 0,
        failed: 0,
        total: 0,
        tests: [],
        terminalOutput: `❌ Internal execution error: ${error.message || 'Unknown error'}`,
        executionTimeMs: 0,
        engine: 'real',
      },
      { status: 500 }
    );
  }
}
