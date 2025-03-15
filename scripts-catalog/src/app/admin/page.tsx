'use client';

import { useState, useEffect } from 'react';
import { Script, Category } from '@/types/script';
import { getAllScripts, getAllCategories, saveCategory, deleteScript, updateScript } from '@/utils/dataManager';
import { scanRepository } from '@/utils/repoScanner';
import Link from 'next/link';
import ScriptEditModal from '@/components/ScriptEditModal';

export default function AdminPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingScript, setEditingScript] = useState<Script | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
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
  }

  async function handleScanRepository(shouldMigrate: boolean = false) {
    setIsScanning(true);
    try {
      await scanRepository(process.cwd(), shouldMigrate);
      await loadData();
    } catch (error) {
      console.error('Error scanning repository:', error);
    } finally {
      setIsScanning(false);
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    try {
      await saveCategory(newCategory);
      setNewCategory({ name: '', description: '' });
      await loadData();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }

  async function handleDeleteScript(id: string) {
    if (!confirm('Are you sure you want to delete this script?')) return;
    try {
      await deleteScript(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  }

  async function handleUpdateScript(updatedScript: Script) {
    try {
      await updateScript(updatedScript.id, updatedScript);
      await loadData();
    } catch (error) {
      console.error('Error updating script:', error);
      throw error;
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Scripts
          </Link>
        </div>

        {/* Repository Scanner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Repository Scanner</h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleScanRepository(false)}
              disabled={isScanning}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isScanning ? 'Scanning...' : 'Scan Repository'}
            </button>
            <button
              onClick={() => handleScanRepository(true)}
              disabled={isScanning}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300"
            >
              {isScanning ? 'Migrating...' : 'Scan & Migrate Scripts'}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Migration will copy scripts to a organized structure and delete the originals
          </p>
        </div>

        {/* Category Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <form onSubmit={handleAddCategory} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="px-4 py-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Category
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="border rounded p-4">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scripts Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Scripts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scripts.map((script) => (
                  <tr key={script.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{script.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{script.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{script.path}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setEditingScript(script)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteScript(script.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingScript && (
          <ScriptEditModal
            script={editingScript}
            categories={categories}
            onSave={handleUpdateScript}
            onClose={() => setEditingScript(null)}
          />
        )}
      </div>
    </div>
  );
} 