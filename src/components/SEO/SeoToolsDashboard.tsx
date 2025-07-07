import {
  Bolt, SearchCheck, Link2, FileText, Smartphone,
  MapPin, Tag, Chrome, Code2, ShieldCheck, Globe
} from 'lucide-react';
import { useState } from 'react';
import BacklinkTool from './BacklinkTool'; // ✅ Import your tool

const SeoToolsDashboard = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { name: 'Keyword Density', icon: <Bolt className="w-5 h-5 text-purple-600" />, component: null },
    { name: 'Backlink Checker', icon: <Link2 className="w-5 h-5 text-blue-600" />, component: <BacklinkTool /> },
    { name: 'Robots.txt Validator', icon: <ShieldCheck className="w-5 h-5 text-green-600" />, component: null },
    { name: 'Sitemap Scanner', icon: <MapPin className="w-5 h-5 text-yellow-600" />, component: null },
    { name: 'Meta Tags Auditor', icon: <Tag className="w-5 h-5 text-red-600" />, component: null },
    { name: 'Mobile Responsiveness', icon: <Smartphone className="w-5 h-5 text-cyan-600" />, component: null },
    { name: 'Page Speed Checker', icon: <Chrome className="w-5 h-5 text-orange-600" />, component: null },
    { name: 'Content Length Scan', icon: <FileText className="w-5 h-5 text-fuchsia-600" />, component: null },
    { name: 'Canonical Tag Check', icon: <SearchCheck className="w-5 h-5 text-sky-600" />, component: null },
    { name: 'Schema Markup Test', icon: <Code2 className="w-5 h-5 text-lime-600" />, component: null },
  ];

  const selectedTool = tools.find(tool => tool.name === activeTool);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="lg:w-64 w-full bg-white border-r shadow-sm p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">SEO Toolkit</h2>
            <p className="text-sm text-gray-500">Tools to grow your site</p>
          </div>
        </div>

        <nav className="space-y-2">
          {tools.map(tool => (
            <button
              key={tool.name}
              onClick={() => setActiveTool(tool.name)}
              className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg transition 
                          ${activeTool === tool.name ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              {tool.icon}
              <span className="text-gray-700 font-medium">{tool.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Area */}
      <main className="flex-1 p-6">
        {selectedTool?.component ? (
          selectedTool.component
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Tools</h3>
            <p className="text-gray-600">Select a tool from the sidebar to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeoToolsDashboard;