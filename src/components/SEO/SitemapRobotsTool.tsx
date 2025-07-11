import React, { useEffect, useState } from 'react';
import { getProjects, runSitemapRobotsChecker } from '../../lib/api';

const SitemapRobotsTool = () => {
  const [projects, setProjects] = useState<{ _id: string; title: string; sitemapUrl?: string; robotsTxtUrl?: string }[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleRun = async () => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const res = await runSitemapRobotsChecker(selectedProject._id);
      setReport(res.data);
    } catch (err) {
      console.error('Failed to run tool:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Sitemap & Robots.txt Checker</h3>
      <p className="text-gray-600">Validate your site’s indexing and crawl rules</p>

      <select
        value={selectedProject?._id || ''}
        onChange={(e) => {
          const found = projects.find((p) => p._id === e.target.value);
          setSelectedProject(found || null);
        }}
        className="border px-4 py-2 rounded-lg w-full max-w-md"
      >
        <option value="">Select a Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>{p.title}</option>
        ))}
      </select>

      {selectedProject && (
        <div className="text-sm text-gray-500 space-y-1">
          <p><strong>Sitemap URL:</strong> {selectedProject.sitemapUrl}</p>
          <p><strong>Robots.txt URL:</strong> {selectedProject.robotsTxtUrl}</p>
        </div>
      )}

      <button
        onClick={handleRun}
        disabled={loading || !selectedProject}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {loading ? 'Checking...' : 'Run Validator'}
      </button>

      {report && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-100 p-4 rounded text-sm">
            <h4 className="font-semibold mb-1">📄 Sitemap Report:</h4>
            <pre>{JSON.stringify(report.sitemapReport, null, 2)}</pre>
          </div>
          <div className="bg-gray-100 p-4 rounded text-sm">
            <h4 className="font-semibold mb-1">🤖 Robots.txt Report:</h4>
            <pre>{JSON.stringify(report.robotsReport, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SitemapRobotsTool;
