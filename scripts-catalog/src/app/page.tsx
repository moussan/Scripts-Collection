'use client';

import { useState, useEffect } from 'react';
import ScriptCard from '@/components/ScriptCard';
import ScriptFilter from '@/components/ScriptFilter';
import { Script, ScriptFilter as ScriptFilterType, Category } from '@/types/script';
import { getAllScripts, getAllCategories } from '@/utils/dataManager';
import Link from 'next/link';

export default function Home() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<ScriptFilterType>({
    search: '',
    category: '',
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [scriptsData, categoriesData] = await Promise.all([
          getAllScripts(),
          getAllCategories(),
        ]);
        setScripts(scriptsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredScripts = scripts.filter((script) => {
    const matchesSearch = script.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      script.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesCategory = !filter.category || script.category === filter.category;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Scripts Collection</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            Admin Dashboard →
          </Link>
        </div>
        
        <ScriptFilter
          filter={filter}
          categories={categories}
          onFilterChange={setFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>

        {filteredScripts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No scripts found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
} 