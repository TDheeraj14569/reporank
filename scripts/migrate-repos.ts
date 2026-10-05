import fs from 'fs';
import path from 'path';
import { sampleRepositories } from '../src/lib/data/sample-repositories';

const repoPath = path.join(process.cwd(), 'src', 'data', 'repositories');

if (!fs.existsSync(repoPath)) {
  fs.mkdirSync(repoPath, { recursive: true });
}

Object.values(sampleRepositories).forEach(repo => {
  const slug = repo.slug || repo.repositoryName.toLowerCase().replace(/\s+/g, '-');
  const targetDir = path.join(repoPath, slug);
  const starterDir = path.join(targetDir, 'starter');
  const solutionDir = path.join(targetDir, 'solution');
  
  fs.mkdirSync(starterDir, { recursive: true });
  fs.mkdirSync(solutionDir, { recursive: true });
  
  // Save metadata
  fs.writeFileSync(path.join(targetDir, 'metadata.json'), JSON.stringify(repo, null, 2));
  
  // Function to dump files
  const dumpFiles = (filesList, baseDir) => {
    filesList.forEach(file => {
      const fullPath = path.join(baseDir, file.path);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fullPath, file.content || '');
    });
  };
  
  // Dump starter files
  dumpFiles(repo.files || [], starterDir);
  
  // For the legacy sample data, starter and solution are the same, 
  // but in the new system they will diverge. We just copy starter to solution for now.
  dumpFiles(repo.files || [], solutionDir);
  
  console.log(`Migrated legacy repository: ${slug}`);
});
