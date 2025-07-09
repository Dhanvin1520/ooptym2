import React, { useState } from 'react';
import { ClipboardList, Search, FileText } from 'lucide-react';
import ToolCard from './ToolCard';
import MetaAnalyzer from './MetaAnalyzer';

const tools = [
  {
    key: 'meta',
    name: 'Meta Tag Analyzer',
    description: 'Evaluate your site’s meta title and description.',
    icon: <FileText className="w-5 h-5 text-purple-600" />
  },
  {
    key: 'keyword-density',
    name: 'Keyword Density Checker',
    description: 'Analyze keyword usage on your page.',
    icon: <Search className="w-5 h-5 text-green-600" />
  },
  {
    key: 'backlink',
    name: 'Backlink Scanner',
    description: 'Check inbound links to your site.',
    icon: <ClipboardList className="w-5 h-5 text-blue-600" />
  }
  // Add more tools similarly
];

const SEOToolsDashboard = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleBack = () => setSelectedTool(null);

  return (
    <div className="p-6 space-y-6">
      {!selectedTool ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900">SEO Tools</h2>
          <p className="text-gray-600">Run powerful diagnostics and save reports</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.key}
                name={tool.name}
                description={tool.description}
                icon={tool.icon}
                onClick={() => setSelectedTool(tool.key)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={handleBack}
            className="text-sm text-blue-600 underline hover:text-blue-800 mb-4"
          >
            ← Back to tools
          </button>

          {selectedTool === 'meta' && <MetaAnalyzer />}
          {/* Later add: KeywordDensityTool, BacklinkCheckerTool... */}
        </>
      )}
    </div>
  );
};

export default SEOToolsDashboard;
