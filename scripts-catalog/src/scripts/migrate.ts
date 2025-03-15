import { scanRepository } from '../utils/repoScanner';
import path from 'path';

async function migrate() {
  try {
    const repoPath = path.join(process.cwd(), '..');
    console.log('Starting script migration from:', repoPath);
    await scanRepository(repoPath, true);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migrate(); 