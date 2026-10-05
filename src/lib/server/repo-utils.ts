import fs from 'fs';
import path from 'path';
import { RepositoryFile, RepositoryFolder } from '@/lib/types';

export function readDirectoryRecursively(dirPath: string, basePath: string = ''): RepositoryFolder {
  const folderName = path.basename(dirPath);
  const children: (RepositoryFile | RepositoryFolder)[] = [];
  
  if (!fs.existsSync(dirPath)) {
    return { name: folderName, path: basePath, children: [], isExpanded: true };
  }

  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativePath = basePath ? `${basePath}/${item}` : item;
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      children.push(readDirectoryRecursively(fullPath, relativePath));
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const ext = path.extname(item).toLowerCase();
      let language = 'plaintext';
      if (ext === '.ts' || ext === '.tsx') language = 'typescript';
      else if (ext === '.js' || ext === '.jsx') language = 'javascript';
      else if (ext === '.java') language = 'java';
      else if (ext === '.py') language = 'python';
      else if (ext === '.go') language = 'go';
      else if (ext === '.cpp' || ext === '.hpp' || ext === '.h' || ext === '.c') language = 'cpp';
      else if (ext === '.json') language = 'json';
      else if (ext === '.md') language = 'markdown';
      else if (ext === '.html') language = 'html';
      else if (ext === '.css') language = 'css';
      else if (ext === '.sql') language = 'sql';
      else if (ext === '.xml') language = 'xml';
      else if (ext === '.yaml' || ext === '.yml') language = 'yaml';
      
      children.push({
        id: relativePath,
        name: item,
        path: relativePath,
        content,
        originalContent: content,
        language,
        isEditable: true,
        isModified: false
      });
    }
  }
  
  return {
    name: folderName,
    path: basePath || '/',
    children,
    isExpanded: true
  };
}

export function extractFiles(folder: RepositoryFolder): RepositoryFile[] {
  let files: RepositoryFile[] = [];
  for (const child of folder.children) {
    if ('content' in child) {
      files.push(child as RepositoryFile);
    } else {
      files.push(...extractFiles(child as RepositoryFolder));
    }
  }
  return files;
}
