import { useState, useEffect } from 'react';
import { Script, Category } from '@/types/script';

interface ScriptEditModalProps {
  script: Script;
  categories: Category[];
  onSave: (updatedScript: Script) => Promise<void>;
  onClose: () => void;
}

export default function ScriptEditModal({
  script,
  categories,
  onSave,
  onClose,
}: ScriptEditModalProps) {
  const [editedScript, setEditedScript] = useState<Script>(script);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(editedScript);
      onClose();
    } catch (error) {
      console.error('Error saving script:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!editedScript.tags.includes(newTag.trim())) {
        setEditedScript({
          ...editedScript,
          tags: [...editedScript.tags, newTag.trim()],
        });
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedScript({
      ...editedScript,
      tags: editedScript.tags.filter(tag => tag !== tagToRemove),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Script</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editedScript.title}
                onChange={(e) => setEditedScript({ ...editedScript, title: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editedScript.description}
                onChange={(e) => setEditedScript({ ...editedScript, description: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                rows={3}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={editedScript.category}
                onChange={(e) => setEditedScript({ ...editedScript, category: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editedScript.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type and press Enter to add tags"
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Usage Guide */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usage Guide
              </label>
              <textarea
                value={editedScript.usageGuide}
                onChange={(e) => setEditedScript({ ...editedScript, usageGuide: e.target.value })}
                className="w-full px-4 py-2 border rounded font-mono text-sm"
                rows={6}
                required
              />
            </div>

            {/* Additional Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={editedScript.author || ''}
                  onChange={(e) => setEditedScript({ ...editedScript, author: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Version
                </label>
                <input
                  type="text"
                  value={editedScript.version || ''}
                  onChange={(e) => setEditedScript({ ...editedScript, version: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <input
                type="text"
                value={editedScript.platform || ''}
                onChange={(e) => setEditedScript({ ...editedScript, platform: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Dependencies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dependencies (one per line)
              </label>
              <textarea
                value={editedScript.dependencies?.join('\n') || ''}
                onChange={(e) => setEditedScript({
                  ...editedScript,
                  dependencies: e.target.value.split('\n').filter(d => d.trim()),
                })}
                className="w-full px-4 py-2 border rounded"
                rows={3}
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements (one per line)
              </label>
              <textarea
                value={editedScript.requirements?.join('\n') || ''}
                onChange={(e) => setEditedScript({
                  ...editedScript,
                  requirements: e.target.value.split('\n').filter(r => r.trim()),
                })}
                className="w-full px-4 py-2 border rounded"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 