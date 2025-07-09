import React, { useEffect, useState } from 'react';
import { getProjects, runMetaTagAnalyzer } from '../../lib/api';

type Project = {
  _id: string;
  title: string;
};

const MetaAnalyzer = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleRunAnalyzer = async () => {
    if (!selectedProjectId) {
      alert('Please select a project');
      return;
    }

    setLoading(true);
    try {
      const res = await runMetaTagAnalyzer(selectedProjectId);
      setReport(res.data);
    } catch (err) {
      console.error('Analyzer failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Meta Tag Analyzer</h3>
      <p className="text-gray-600">Choose a project and run meta analysis. The results will be stored directly in the project’s reports 📦</p>

      <select
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
        className="border px-4 py-2 rounded-lg w-full max-w-md"
      >
        <option value="">Select a Project</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.title}
          </option>
        ))}
      </select>

      <button
        onClick={handleRunAnalyzer}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
      >
        🚀 {loading ? 'Analyzing...' : 'Run Analyzer & Save'}
      </button>

      {report && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border text-sm">
          <h4 className="font-semibold text-gray-800 mb-2">📊 Saved Report:</h4>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MetaAnalyzer;