import { Script } from '@/types/script';
import Link from 'next/link';

interface ScriptCardProps {
  script: Script;
}

export default function ScriptCard({ script }: ScriptCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Deprecated':
        return 'bg-red-100 text-red-800';
      case 'Beta':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity?: string) => {
    switch (complexity) {
      case 'Basic':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{script.title}</h3>
        {script.status && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(script.status)}`}>
            {script.status}
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4">{script.description}</p>

      <div className="space-y-3">
        {/* Category and Subcategory */}
        <div className="flex items-center text-sm">
          <span className="text-gray-500">Category:</span>
          <span className="ml-2 font-medium">{script.category}</span>
          {script.subcategory && (
            <>
              <span className="mx-2 text-gray-400">›</span>
              <span className="font-medium">{script.subcategory}</span>
            </>
          )}
        </div>

        {/* Complexity and Runtime */}
        <div className="flex items-center gap-4">
          {script.complexity && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(script.complexity)}`}>
              {script.complexity}
            </span>
          )}
          {script.averageRuntime && (
            <span className="text-xs text-gray-500">
              Runtime: {script.averageRuntime}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {script.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Additional Metadata */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          {script.author && (
            <div>
              <span className="font-medium">Author:</span> {script.author}
            </div>
          )}
          {script.version && (
            <div>
              <span className="font-medium">Version:</span> {script.version}
            </div>
          )}
          {script.lastTested && (
            <div>
              <span className="font-medium">Last Tested:</span> {new Date(script.lastTested).toLocaleDateString()}
            </div>
          )}
          {script.platform && (
            <div>
              <span className="font-medium">Platform:</span> {script.platform}
            </div>
          )}
        </div>

        {/* Dependencies and Requirements */}
        {(script.dependencies?.length || script.requirements?.length) && (
          <div className="text-xs text-gray-500 space-y-1">
            {script.dependencies?.length > 0 && (
              <div>
                <span className="font-medium">Dependencies:</span>{' '}
                {script.dependencies.join(', ')}
              </div>
            )}
            {script.requirements?.length > 0 && (
              <div>
                <span className="font-medium">Requirements:</span>{' '}
                {script.requirements.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Updated: {new Date(script.lastModified).toLocaleDateString()}
        </span>
        <Link
          href={`/script/${script.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
} 