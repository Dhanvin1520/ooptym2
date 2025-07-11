import React, { useEffect, useState } from 'react';
import { getProjects, runPageSpeedAnalyzer } from '../../lib/api';

interface Project {
  _id: string;
  title: string;
  url: string;
}

interface Report {
  metrics: Record<string, any>;
  suggestions: string[];
}

const PageSpeedTool = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleRun = async () => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const res = await runPageSpeedAnalyzer(selectedProject._id);
      setReport(res.data);
    } catch (err) {
      console.error('Page speed analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Page Speed Analyzer</h3>
      <p className="text-gray-600">Measure page load performance for your site</p>

      <select
        value={selectedProject?._id || ''}
        onChange={(e) => {
          const found = projects.find((p) => p._id === e.target.value) || null;
          setSelectedProject(found);
        }}
        className="border px-4 py-2 rounded-lg max-w-md w-full"
      >
        <option value="">Select a Project</option>
        {projects.map((p: Project) => (
          <option key={p._id} value={p._id}>{p.title}</option>
        ))}
      </select>

      {selectedProject && (
        <p className="text-sm text-gray-500">URL: {selectedProject.url}</p>
      )}

      <button
        onClick={handleRun}
        disabled={loading || !selectedProject}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
      >
        {loading ? 'Analyzing...' : 'Run Page Speed Analyzer'}
      </button>

      {report && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <h4 className="font-semibold mb-2">⚡ Speed Metrics:</h4>
          <pre>{JSON.stringify(report.metrics, null, 2)}</pre>

          <h4 className="font-semibold mt-4">✅ Suggestions:</h4>
          <ul className="list-disc ml-4">
            {report.suggestions?.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PageSpeedTool;