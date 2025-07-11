import React, { useState } from 'react';
import MetaAnalyzer from './MetaAnalyzer';
import KeywordDensityTool from './KeywordDensityTool';
import BrokenLinkTool from './BrokenLinkTool';
import SitemapRobotsTool from './SitemapRobotsTool';
import ToolCard from './ToolCard';
import {
  FileText, Search, Link, BarChart, BookOpenText,
  Zap
} from 'lucide-react';
import BacklinkTool from './BacklinkTool';
import KeywordTrackerTool from './KeywordTrackerTool';
import PageSpeedTool from './PageSpeedTool';
const tools = [
  {
    key: 'meta',
    name: 'Meta Tag Analyzer',
    description: 'Analyze your site’s meta title and description.',
    icon: <FileText className="w-5 h-5 text-purple-600" />
  },
  {
    key: 'keyword-density',
    name: 'Keyword Density Checker',
    description: 'Evaluate keyword usage and relevance.',
    icon: <Search className="w-5 h-5 text-green-600" />
  },
  {
    key: 'broken-links',
    name: 'Broken Link Scanner',
    description: 'Identify dead outbound links on your site.',
    icon: <Link className="w-5 h-5 text-red-600" />
  },
  {
    key: 'sitemap-robots',
    name: 'Sitemap & Robots Checker',
    description: 'Parse crawl rules and sitemap status',
    icon: <BookOpenText className="w-5 h-5 text-indigo-600" />
  },
  {
    key: 'backlinks',
    name: 'Backlink Scanner',
    description: 'Check external domains linking to your page.',
    icon: <Link className="w-5 h-5 text-blue-600" />
  },
  {
    key: 'keyword-tracker',
    name: 'Keyword Tracker',
    description: 'Check where your domain ranks for keywords',
    icon: <Search className="w-5 h-5 text-teal-600" />
  },
  {
    key: 'page-speed',
    name: 'Page Speed Analyzer',
    description: 'Evaluate loading performance and timing metrics',
    icon: <Zap className="w-5 h-5 text-yellow-600" />
  }
];

const SEOToolsDashboard = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleBack = () => setSelectedTool(null);

  return (
    <div className="p-6 space-y-6">
      {!selectedTool ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900">SEO Tools</h2>
          <p className="text-gray-600">Run diagnostics or view saved reports</p>
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
            ← Back to Tools
          </button>

          {selectedTool === 'meta' && <MetaAnalyzer />}
          {selectedTool === 'keyword-density' && <KeywordDensityTool />}
          {selectedTool === 'broken-links' && <BrokenLinkTool />}
          {selectedTool === 'sitemap-robots' && <SitemapRobotsTool />}
          {selectedTool === 'backlinks' && <BacklinkTool />}
          {selectedTool === 'keyword-tracker' && <KeywordTrackerTool />}
          {selectedTool === 'page-speed' && <PageSpeedTool />}

        </>
      )}
    </div>
  );
};

export default SEOToolsDashboard;
