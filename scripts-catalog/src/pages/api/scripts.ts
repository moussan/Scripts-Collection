import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Script, Category } from '@/types/script';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Read categories
    const categoriesPath = path.join(process.cwd(), 'src/data/categories.json');
    const categoriesData = await fs.promises.readFile(categoriesPath, 'utf8');
    const categories: Category[] = JSON.parse(categoriesData);

    // Read scripts
    const scriptsPath = path.join(process.cwd(), 'src/data/scripts');
    const scriptFiles = await fs.promises.readdir(scriptsPath);
    
    const scripts: Script[] = [];
    for (const file of scriptFiles) {
      if (file.endsWith('.json')) {
        const scriptData = await fs.promises.readFile(
          path.join(scriptsPath, file),
          'utf8'
        );
        scripts.push(JSON.parse(scriptData));
      }
    }

    return res.status(200).json({ scripts, categories });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Error fetching data' });
  }
} 