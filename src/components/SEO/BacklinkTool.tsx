import React, { useEffect, useState } from 'react';
import { getProjects, runBacklinkScanner } from '../../lib/api';

const BacklinkTool = () => {
  interface Project {
    _id: string;
    title: string;
    url: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleRun = async () => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const res = await runBacklinkScanner(selectedProject._id);
      setReport(res.data);
    } catch (err) {
      console.error('Backlink scan failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Backlink Scanner</h3>
      <p className="text-gray-600">Scan external links pointing to your site</p>

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
        <p className="text-sm text-gray-500">URL: {selectedProject.url}</p>
      )}

      <button
        onClick={handleRun}
        disabled={!selectedProject || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Scanning...' : 'Run Backlink Scanner'}
      </button>

      {report && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <h4 className="font-semibold mb-2">🔗 External Domains Linking In:</h4>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BacklinkTool;
