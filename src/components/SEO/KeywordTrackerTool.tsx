import React, { useEffect, useState } from 'react';
import { getProjects, runKeywordTracker } from '../../lib/api';

const KeywordTrackerTool = () => {
  interface Project {
    _id: string;
    title: string;
    url: string;
  }
  
  const [projects, setProjects] = useState<Project[]>([]);
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
      const res = await runKeywordTracker(selectedProject._id);
      setReport(res.data);
    } catch (err) {
      console.error('Tracker failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Keyword Tracker</h3>
      <p className="text-gray-600">Check where your site ranks for target keywords</p>

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
        <p className="text-sm text-gray-500">Domain: {new URL(selectedProject.url).hostname}</p>
      )}

      <button
        onClick={handleRun}
        disabled={!selectedProject || loading}
        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        {loading ? 'Tracking...' : 'Run Keyword Tracker'}
      </button>

      {report && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <h4 className="font-semibold mb-2">📈 Rankings:</h4>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default KeywordTrackerTool;
