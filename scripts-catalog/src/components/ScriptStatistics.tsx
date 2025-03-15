import { Script, Category } from '@/types/script';
import { useMemo } from 'react';

interface ScriptStatisticsProps {
  scripts: Script[];
  categories: Category[];
}

export default function ScriptStatistics({ scripts, categories }: ScriptStatisticsProps) {
  const stats = useMemo(() => {
    const totalScripts = scripts.length;
    const activeScripts = scripts.filter(s => s.status === 'Active').length;
    const categoryCounts = categories.map(cat => ({
      name: cat.name,
      count: scripts.filter(s => s.category === cat.id).length
    }));
    const complexityDistribution = {
      Basic: scripts.filter(s => s.complexity === 'Basic').length,
      Intermediate: scripts.filter(s => s.complexity === 'Intermediate').length,
      Advanced: scripts.filter(s => s.complexity === 'Advanced').length
    };
    const recentlyUpdated = scripts
      .filter(s => new Date(s.lastModified) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .length;

    return {
      totalScripts,
      activeScripts,
      categoryCounts,
      complexityDistribution,
      recentlyUpdated
    };
  }, [scripts, categories]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Script Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-600">{stats.totalScripts}</div>
          <div className="text-sm text-gray-600">Total Scripts</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-600">{stats.activeScripts}</div>
          <div className="text-sm text-gray-600">Active Scripts</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-yellow-600">{stats.recentlyUpdated}</div>
          <div className="text-sm text-gray-600">Updated (30 days)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Category Distribution</h3>
          <div className="space-y-2">
            {stats.categoryCounts.map(({ name, count }) => (
              <div key={name} className="flex items-center">
                <div className="w-32 text-sm text-gray-600">{name}</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(count / stats.totalScripts) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-right text-sm text-gray-600">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Complexity Distribution</h3>
          <div className="space-y-2">
            {Object.entries(stats.complexityDistribution).map(([level, count]) => (
              <div key={level} className="flex items-center">
                <div className="w-32 text-sm text-gray-600">{level}</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      level === 'Basic' ? 'bg-blue-500' :
                      level === 'Intermediate' ? 'bg-purple-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(count / stats.totalScripts) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-right text-sm text-gray-600">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 