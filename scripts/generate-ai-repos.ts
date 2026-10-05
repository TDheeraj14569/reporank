import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { challengesMetadata } from '../src/lib/data/challenges-metadata';

// Ensure GOOGLE_API_KEY is set
if (!process.env.GOOGLE_API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY environment variable is missing.');
  console.error('Please run: export GOOGLE_API_KEY="your-api-key" before running this script.');
  process.exit(1);
}

const ai = new GoogleGenAI();
const reposDir = path.join(process.cwd(), 'src', 'data', 'repositories');

async function generateRepository(challenge) {
  console.log(`\nGenerating repository for: ${challenge.title} (${challenge.slug})`);
  const targetDir = path.join(reposDir, challenge.slug);
  
  if (fs.existsSync(targetDir)) {
    console.log(`- Skipping ${challenge.slug}: Already exists.`);
    return;
  }

  const prompt = `
You are a Senior Software Engineer. Generate a complete, realistic file-backed repository for the following coding challenge:

Title: ${challenge.title}
Task Type: ${challenge.taskType}
Language/Framework: ${challenge.technology.join(', ')}
Description: ${challenge.description}
Requirements: ${challenge.requirements.join(', ')}

Instructions:
1. Create a realistic multi-file repository representing a real software project (e.g. Models, Services, Controllers, Utils, Tests).
2. The code must be production-like, not a toy project.
3. Generate two states for the code:
   - "solution": The 100% correct, working version of the codebase that passes all tests.
   - "starter": A broken/incomplete version containing intentional bugs or missing logic that exactly matches the description of the challenge.
4. Output your response STRICTLY as a valid JSON object matching this schema:
{
  "buildCmd": "npm install (or equivalent)",
  "testCmd": "npm test (or equivalent)",
  "solution": [
    { "path": "src/main/java/com/example/OrderService.java", "content": "..." },
    { "path": "pom.xml", "content": "..." },
    { "path": "src/test/java/com/example/OrderServiceTest.java", "content": "..." }
  ],
  "starter": [
    { "path": "src/main/java/com/example/OrderService.java", "content": "...broken version..." },
    { "path": "pom.xml", "content": "..." },
    { "path": "src/test/java/com/example/OrderServiceTest.java", "content": "..." }
  ]
}

DO NOT output markdown formatting like \`\`\`json. Return pure parseable JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json'
      }
    });

    const result = JSON.parse(response.text || "{}");

    fs.mkdirSync(targetDir, { recursive: true });
    
    // Save metadata
    fs.writeFileSync(path.join(targetDir, 'metadata.json'), JSON.stringify({
      ...challenge,
      buildCmd: result.buildCmd,
      testCmd: result.testCmd
    }, null, 2));

    // Save Starter
    const starterDir = path.join(targetDir, 'starter');
    fs.mkdirSync(starterDir, { recursive: true });
    result.starter.forEach((file: any) => {
      const fullPath = path.join(starterDir, file.path);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, file.content);
    });

    // Save Solution
    const solutionDir = path.join(targetDir, 'solution');
    fs.mkdirSync(solutionDir, { recursive: true });
    result.solution.forEach((file: any) => {
      const fullPath = path.join(solutionDir, file.path);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, file.content);
    });

    console.log(`- Success! Wrote ${result.starter.length} starter files and ${result.solution.length} solution files.`);
  } catch (err: any) {
    console.error(`- Failed to generate ${challenge.slug}:`, err.message);
  }
}

async function main() {
  console.log(`Found ${challengesMetadata.length} challenges in metadata.`);
  
  for (const challenge of challengesMetadata) {
    await generateRepository(challenge);
    // Rate limit buffer
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log('\nGeneration complete!');
}

main();
