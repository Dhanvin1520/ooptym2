import React, { useEffect, useState } from 'react';
import { getProjects, runBrokenLinkChecker } from '../../lib/api';

const BrokenLinkTool = () => {
  interface Project {
    _id: string;
    title: string;
    url: string;
  }
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleRun = async () => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const res = await runBrokenLinkChecker(selectedProject._id);
      setReport(res.data);
    } catch (err) {
      console.error('Broken link scan failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Broken Link Scanner</h3>
      <p className="text-gray-600">Check for dead links in your selected project’s page</p>

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
        disabled={loading || !selectedProject}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        {loading ? 'Scanning...' : 'Run Scanner'}
      </button>

      {report && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <h4 className="font-semibold mb-2">📊 Results:</h4>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BrokenLinkTool;
