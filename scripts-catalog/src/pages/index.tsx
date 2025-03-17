import { useState, useEffect } from 'react';
import { Script, Category, ScriptFilter as ScriptFilterType } from '@/types/script';
import ScriptCard from '@/components/ScriptCard';
import ScriptFilter from '@/components/ScriptFilter';
import ScriptStatistics from '@/components/ScriptStatistics';
import ScriptComparison from '@/components/ScriptComparison';

export default function Home() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ScriptFilterType>({
    search: '',
    category: '',
    tags: []
  });
  const [showComparison, setShowComparison] = useState(false);
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/scripts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setScripts(data.scripts);
        setCategories(data.categories);
        setError(null);
      } catch (err) {
        setError('Error loading scripts. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredScripts = scripts.filter(script => {
    if (filter.search && !script.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !script.description.toLowerCase().includes(filter.search.toLowerCase()) &&
        !script.tags.some(tag => tag.toLowerCase().includes(filter.search.toLowerCase()))) {
      return false;
    }
    if (filter.category && script.category !== filter.category) return false;
    if (filter.subcategory && script.subcategory !== filter.subcategory) return false;
    if (filter.complexity && script.complexity !== filter.complexity) return false;
    if (filter.status && script.status !== filter.status) return false;
    return true;
  });

  const toggleScriptSelection = (scriptId: string) => {
    setSelectedScripts(prev => 
      prev.includes(scriptId) 
        ? prev.filter(id => id !== scriptId)
        : [...prev, scriptId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Scripts Collection</h1>
            {selectedScripts.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Compare Selected ({selectedScripts.length})
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <>
            <ScriptStatistics scripts={scripts} categories={categories} />
            
            <ScriptFilter
              filter={filter}
              categories={categories}
              onFilterChange={setFilter}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScripts.map(script => (
                <div key={script.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200" />
                  <div className="relative bg-white rounded-lg">
                    <div className="absolute top-2 right-2 z-10">
                      <label className="sr-only">
                        Select script for comparison
                        <input
                          type="checkbox"
                          checked={selectedScripts.includes(script.id)}
                          onChange={() => toggleScriptSelection(script.id)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                    <ScriptCard script={script} />
                  </div>
                </div>
              ))}
            </div>

            {showComparison && (
              <ScriptComparison
                scripts={scripts.filter(s => selectedScripts.includes(s.id))}
                onClose={() => {
                  setShowComparison(false);
                  setSelectedScripts([]);
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
} 