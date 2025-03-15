import fs from 'fs';
import path from 'path';
import { Script } from '@/types/script';
import { saveScript } from './dataManager';

interface ScriptFile {
  filePath: string;
  content: string;
  originalPath?: string;
}

interface ExtractedMetadata {
  description: string;
  author?: string;
  version?: string;
  dependencies?: string[];
  platform?: string;
  requirements?: string[];
}

export async function scanRepository(repoPath: string, shouldMigrateScripts: boolean = false): Promise<void> {
  const scriptExtensions = ['.sh', '.ps1', '.py', '.js', '.bat', '.cmd', '.pl', '.rb'];
  const excludeDirs = ['node_modules', '.git', '.github', 'scripts-catalog', 'dist', 'build'];
  const targetScriptsDir = path.join(process.cwd(), 'scripts');

  // Create scripts directory if it doesn't exist
  if (shouldMigrateScripts && !fs.existsSync(targetScriptsDir)) {
    fs.mkdirSync(targetScriptsDir, { recursive: true });
  }

  function findScriptFiles(dir: string): ScriptFile[] {
    const files: ScriptFile[] = [];

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(repoPath, fullPath);
      
      // Skip excluded directories
      if (excludeDirs.some(excluded => relativePath.startsWith(excluded))) {
        continue;
      }

      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...findScriptFiles(fullPath));
      } else if (scriptExtensions.some(ext => item.toLowerCase().endsWith(ext))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        files.push({ 
          filePath: relativePath, 
          content,
          originalPath: fullPath
        });
      }
    }

    return files;
  }

  function extractDetailedMetadata(content: string): ExtractedMetadata {
    const metadata: ExtractedMetadata = {
      description: '',
      dependencies: [],
      requirements: []
    };

    const lines = content.split('\n');
    let inCommentBlock = false;
    let descriptionLines: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Handle block comments
      if (trimmedLine.startsWith('/*') || trimmedLine.startsWith("'''") || trimmedLine.startsWith('"""')) {
        inCommentBlock = true;
        continue;
      }
      if (trimmedLine.endsWith('*/') || trimmedLine.endsWith("'''") || trimmedLine.endsWith('"""')) {
        inCommentBlock = false;
        continue;
      }

      // Skip empty lines and script shebangs
      if (!trimmedLine || trimmedLine.startsWith('#!')) continue;

      const isComment = trimmedLine.startsWith('#') || 
                       trimmedLine.startsWith('//') || 
                       inCommentBlock;

      if (!isComment) break;

      const commentContent = trimmedLine
        .replace(/^[#/]+\s*/, '')
        .replace(/^\*\s*/, '')
        .trim();

      // Extract metadata from special comment tags
      if (commentContent.toLowerCase().startsWith('@author')) {
        metadata.author = commentContent.substring(7).trim();
      } else if (commentContent.toLowerCase().startsWith('@version')) {
        metadata.version = commentContent.substring(8).trim();
      } else if (commentContent.toLowerCase().startsWith('@requires')) {
        metadata.requirements?.push(commentContent.substring(9).trim());
      } else if (commentContent.toLowerCase().startsWith('@platform')) {
        metadata.platform = commentContent.substring(9).trim();
      } else if (commentContent.toLowerCase().startsWith('@dependency')) {
        metadata.dependencies?.push(commentContent.substring(11).trim());
      } else if (commentContent && !commentContent.startsWith('@')) {
        descriptionLines.push(commentContent);
      }
    }

    metadata.description = descriptionLines.join(' ').trim();
    return metadata;
  }

  function extractMetadata(file: ScriptFile): Omit<Script, 'id' | 'dateAdded' | 'lastModified'> {
    const fileNameWithoutExt = path.basename(file.filePath, path.extname(file.filePath));
    const dirName = path.dirname(file.filePath);
    
    // Extract detailed metadata
    const detailedMetadata = extractDetailedMetadata(file.content);

    // Generate tags based on directory structure and file content
    const tags = new Set<string>();
    dirName.split(path.sep).forEach(part => {
      if (part && !excludeDirs.includes(part)) {
        tags.add(part.toLowerCase());
      }
    });

    // Add extension and platform as tags
    const extension = path.extname(file.filePath).slice(1);
    if (extension) tags.add(extension.toLowerCase());
    if (detailedMetadata.platform) tags.add(detailedMetadata.platform.toLowerCase());

    // Add requirement-based tags
    detailedMetadata.requirements?.forEach(req => {
      tags.add(req.toLowerCase().replace(/[^a-z0-9]/g, '-'));
    });

    // Determine category based on directory structure or platform
    let category = dirName.split(path.sep)[0] || 'Uncategorized';
    if (detailedMetadata.platform) {
      category = detailedMetadata.platform;
    }

    // Extract usage guide
    const usageGuide = extractUsageGuide(file.content) || generateDefaultUsageGuide(file);

    // If migrating scripts, copy the file to the scripts directory
    let newPath = file.filePath;
    if (shouldMigrateScripts && file.originalPath) {
      const targetPath = path.join(targetScriptsDir, category.toLowerCase(), fileNameWithoutExt + path.extname(file.filePath));
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(file.originalPath, targetPath);
      newPath = path.relative(process.cwd(), targetPath);
    }

    return {
      title: fileNameWithoutExt.split(/[-_]/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      description: detailedMetadata.description || `${fileNameWithoutExt} script`,
      category,
      tags: Array.from(tags),
      path: newPath,
      usageGuide,
      author: detailedMetadata.author,
      version: detailedMetadata.version,
      dependencies: detailedMetadata.dependencies,
      requirements: detailedMetadata.requirements,
      platform: detailedMetadata.platform,
    };
  }

  function extractUsageGuide(content: string): string | null {
    const lines = content.split('\n');
    let usageGuide = '';
    let inUsageSection = false;
    let usageIndentation = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Detect usage section start
      if (trimmedLine.match(/^[#/\s]*(?:usage|example|how to|instructions):/i)) {
        inUsageSection = true;
        usageIndentation = line.search(/\S/);
        continue;
      }

      // End usage section if we hit a non-comment line or section break
      if (inUsageSection) {
        if (!trimmedLine) continue;
        if (!line.trim().startsWith('#') && !line.trim().startsWith('//')) {
          break;
        }
        // Check if we're still in the same comment block by indentation
        if (line.search(/\S/) < usageIndentation) {
          break;
        }
        const content = line.replace(/^[#/\s]+/, '').trim();
        if (content) usageGuide += content + '\n';
      }
    }

    return usageGuide || null;
  }

  function generateDefaultUsageGuide(file: ScriptFile): string {
    const ext = path.extname(file.filePath).toLowerCase();
    const fileName = path.basename(file.filePath);
    
    let guide = `# ${fileName}\n\n`;
    
    switch (ext) {
      case '.sh':
        guide += `1. Make the script executable:\n   chmod +x ${fileName}\n\n2. Run the script:\n   ./${fileName}`;
        break;
      case '.ps1':
        guide += `Run the script in PowerShell:\n   .\\${fileName}`;
        break;
      case '.py':
        guide += `Run with Python:\n   python ${fileName}`;
        break;
      case '.js':
        guide += `Run with Node.js:\n   node ${fileName}`;
        break;
      case '.pl':
        guide += `Run with Perl:\n   perl ${fileName}`;
        break;
      case '.rb':
        guide += `Run with Ruby:\n   ruby ${fileName}`;
        break;
      default:
        guide += `Run the script using appropriate interpreter.`;
    }
    
    return guide;
  }

  // Main scanning logic
  console.log('Starting repository scan...');
  const scriptFiles = findScriptFiles(repoPath);
  console.log(`Found ${scriptFiles.length} script files`);

  for (const file of scriptFiles) {
    try {
      const metadata = extractMetadata(file);
      await saveScript(metadata);
      console.log(`Processed: ${file.filePath}`);

      // Delete original file if migration is enabled
      if (shouldMigrateScripts && file.originalPath && fs.existsSync(file.originalPath)) {
        fs.unlinkSync(file.originalPath);
        console.log(`Migrated and deleted original: ${file.originalPath}`);
      }
    } catch (error) {
      console.error(`Error processing ${file.filePath}:`, error);
    }
  }
  console.log('Repository scan completed');
} 