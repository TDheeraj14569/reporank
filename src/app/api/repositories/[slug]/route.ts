import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { readDirectoryRecursively, extractFiles } from '@/lib/server/repo-utils';
import { challengesMetadata } from '@/lib/data/challenges-metadata';
import { sampleRepositories } from '@/lib/data/sample-repositories';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Check if the physical directory exists
    const reposDir = path.join(process.cwd(), 'src', 'data', 'repositories', slug);
    const starterDir = path.join(reposDir, 'starter');
    const solutionDir = path.join(reposDir, 'solution');
    
    // First, check if it's one of the physical repositories
    if (fs.existsSync(starterDir)) {
      const metadataPath = path.join(reposDir, 'metadata.json');
      let metadata = {};
      if (fs.existsSync(metadataPath)) {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      }
      
      const starterTree = readDirectoryRecursively(starterDir);
      const starterFiles = extractFiles(starterTree);
      
      let solutionTree: any = null;
      let solutionFiles: any = null;
      if (fs.existsSync(solutionDir)) {
        solutionTree = readDirectoryRecursively(solutionDir);
        solutionFiles = extractFiles(solutionTree);
      }
      
      console.log('Finding challengeMeta for slug:', slug);
      let challengeMeta;
      try {
        challengeMeta = challengesMetadata.find(c => {
          if (!c) console.log('WARNING: undefined challenge found in challengesMetadata');
          return c && c.slug === slug;
        });
      } catch (err) {
        console.error('Error in challengesMetadata.find:', err);
      }
      
      return NextResponse.json({
        id: slug,
        title: challengeMeta?.title || slug,
        tree: starterTree,
        files: starterFiles,
        solutionTree,
        solutionFiles,
        metadata: {
          ...metadata,
          ...challengeMeta
        }
      });
    } 
    
    console.log('Finding legacyRepo for slug:', slug);
    let legacyRepo: any;
    try {
      legacyRepo = Object.values(sampleRepositories).find((r: any) => {
        if (!r) console.log('WARNING: undefined repo found in sampleRepositories');
        return r && r.slug === slug;
      });
    } catch (err) {
      console.error('Error in sampleRepositories.find:', err);
    }

    if (legacyRepo) {
      return NextResponse.json({
        id: legacyRepo.id.toString(),
        title: legacyRepo.title,
        tree: legacyRepo.repositoryStructure.tree,
        files: legacyRepo.repositoryStructure.files,
        legacy: true,
        metadata: legacyRepo
      });
    }
    
    return NextResponse.json(
      { error: 'Repository not found' },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('Error serving repository:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
