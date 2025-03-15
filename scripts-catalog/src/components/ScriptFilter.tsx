import { Category, ScriptFilter as ScriptFilterType } from '@/types/script';
import { useState, useEffect } from 'react';

interface ScriptFilterProps {
  filter: ScriptFilterType;
  categories: Category[];
  onFilterChange: (filter: ScriptFilterType) => void;
}

export default function ScriptFilter({
  filter,
  categories,
  onFilterChange,
}: ScriptFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(filter.category);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  useEffect(() => {
    const category = categories.find(c => c.id === selectedCategory);
    setAvailableSubcategories(category?.subcategories || []);
  }, [selectedCategory, categories]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onFilterChange({
      ...filter,
      category: categoryId,
      subcategory: undefined,
    });
  };

  const complexityOptions = ['Basic', 'Intermediate', 'Advanced'];
  const statusOptions = ['Active', 'Beta', 'Deprecated'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Scripts
          </label>
          <input
            type="text"
            id="search"
            value={filter.search}
            onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
            placeholder="Search by title, description, or tags..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {selectedCategory && availableSubcategories.length > 0 && (
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory
              </label>
              <select
                id="subcategory"
                value={filter.subcategory}
                onChange={(e) => onFilterChange({ ...filter, subcategory: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Subcategories</option>
                {availableSubcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Complexity */}
          <div>
            <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-1">
              Complexity
            </label>
            <select
              id="complexity"
              value={filter.complexity}
              onChange={(e) => onFilterChange({ ...filter, complexity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Complexity</option>
              {complexityOptions.map((complexity) => (
                <option key={complexity} value={complexity}>
                  {complexity}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={filter.status}
              onChange={(e) => onFilterChange({ ...filter, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {Object.entries(filter).map(([key, value]) => {
            if (value && key !== 'tags' && value !== '') {
              return (
                <span
                  key={key}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                >
                  {key}: {value}
                  <button
                    onClick={() => onFilterChange({ ...filter, [key]: '' })}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
} 