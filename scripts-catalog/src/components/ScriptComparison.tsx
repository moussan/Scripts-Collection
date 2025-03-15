import { Script } from '@/types/script';
import { useState } from 'react';

interface ScriptComparisonProps {
  scripts: Script[];
  onClose: () => void;
}

export default function ScriptComparison({ scripts, onClose }: ScriptComparisonProps) {
  const [selectedScripts, setSelectedScripts] = useState<Script[]>([]);

  const addScript = (script: Script) => {
    if (selectedScripts.length < 3 && !selectedScripts.find(s => s.id === script.id)) {
      setSelectedScripts([...selectedScripts, script]);
    }
  };

  const removeScript = (scriptId: string) => {
    setSelectedScripts(selectedScripts.filter(s => s.id !== scriptId));
  };

  const ComparisonRow = ({ label, getValue }: { label: string; getValue: (script: Script) => string | string[] | undefined }) => (
    <tr className="border-t border-gray-200">
      <td className="py-2 px-4 font-medium text-gray-600">{label}</td>
      {selectedScripts.map(script => (
        <td key={script.id} className="py-2 px-4">
          {Array.isArray(getValue(script)) 
            ? getValue(script)?.join(', ') 
            : getValue(script) || '-'}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Compare Scripts</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Script Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select scripts to compare (max 3):
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                const script = scripts.find(s => s.id === e.target.value);
                if (script) addScript(script);
              }}
              value=""
              aria-label="Select script to compare"
            >
              <option value="">Choose a script...</option>
              {scripts
                .filter(s => !selectedScripts.find(selected => selected.id === s.id))
                .map(script => (
                  <option key={script.id} value={script.id}>
                    {script.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Selected Scripts Comparison */}
          {selectedScripts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left text-gray-600 font-medium">Feature</th>
                    {selectedScripts.map(script => (
                      <th key={script.id} className="py-2 px-4 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{script.title}</span>
                          <button
                            onClick={() => removeScript(script.id)}
                            className="text-gray-400 hover:text-gray-600 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow label="Category" getValue={(s) => s.category} />
                  <ComparisonRow label="Subcategory" getValue={(s) => s.subcategory} />
                  <ComparisonRow label="Complexity" getValue={(s) => s.complexity} />
                  <ComparisonRow label="Status" getValue={(s) => s.status} />
                  <ComparisonRow label="Author" getValue={(s) => s.author} />
                  <ComparisonRow label="Version" getValue={(s) => s.version} />
                  <ComparisonRow label="Platform" getValue={(s) => s.platform} />
                  <ComparisonRow label="Dependencies" getValue={(s) => s.dependencies} />
                  <ComparisonRow label="Requirements" getValue={(s) => s.requirements} />
                  <ComparisonRow label="Tags" getValue={(s) => s.tags} />
                  <ComparisonRow label="Last Modified" getValue={(s) => new Date(s.lastModified).toLocaleDateString()} />
                  <ComparisonRow label="Last Tested" getValue={(s) => s.lastTested ? new Date(s.lastTested).toLocaleDateString() : undefined} />
                  <ComparisonRow label="Average Runtime" getValue={(s) => s.averageRuntime} />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 