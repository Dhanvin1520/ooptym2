import React, { useEffect, useState } from 'react';
import { getProjects, runKeywordDensityAnalyzer } from '../../lib/api';

type Project = { _id: string; title: string; url: string };

const KeywordDensityTool = () => {
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
      const res = await runKeywordDensityAnalyzer(selectedProject._id);
      setReport(res.data);
    } catch (err) {
      console.error('Failed to run density check:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Keyword Density Analyzer</h3>
      <p className="text-gray-600">Select a project and analyze keyword usage on its page</p>

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
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? 'Analyzing...' : 'Run Density Check'}
      </button>

      {report && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <h4 className="font-semibold mb-2">📊 Report:</h4>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default KeywordDensityTool;
