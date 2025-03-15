'use client';

import { useEffect, useState } from 'react';
import { Script } from '@/types/script';
import Link from 'next/link';
import { getScriptById } from '@/utils/dataManager';
import { useRouter } from 'next/navigation';

export default function ScriptDetail({ params }: { params: { id: string } }) {
  const [script, setScript] = useState<Script | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadScript = async () => {
      try {
        const scriptData = await getScriptById(params.id);
        if (!scriptData) {
          router.push('/');
          return;
        }
        setScript(scriptData);
      } catch (error) {
        console.error('Error loading script:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadScript();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-red-600">Script not found</p>
          <div className="text-center mt-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Scripts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Scripts
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{script.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {script.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="mb-6">{script.description}</p>

            <h2 className="text-xl font-semibold mb-2">Usage Guide</h2>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              {script.usageGuide}
            </pre>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Category: {script.category}
              </p>
              <p className="text-sm text-gray-600">
                Path: {script.path}
              </p>
              <p className="text-sm text-gray-600">
                Added: {new Date(script.dateAdded).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Last Modified: {new Date(script.lastModified).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 