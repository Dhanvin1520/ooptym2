import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const BacklinkTool = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const projectId = 'your-project-id-here'; // Replace with actual selected project ID

  const handleScan = async () => {
    try {
      const res = await axios.post(`http://localhost:5009/api/tools/${projectId}/run`, {
        toolName: 'Backlink Checker',
        url,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setResults(res.data.result);
    } catch (err) {
      console.error('Scan failed:', err);
    }
  };

  const chartData = {
    labels: results.slice(0, 6).map((_, i) => `Link ${i + 1}`),
    datasets: [{
      label: 'Backlinks',
      data: results.slice(0, 6).map(() => 1),
      backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#22d3ee', '#10b981', '#f59e0b'],
    }],
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Backlink Checker</h2>
      <p className="text-gray-600">Discover which domains link to your site</p>

      <div className="flex gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="w-full border px-4 py-2 rounded-lg"
        />
        <button
          onClick={handleScan}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Scan
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <Pie data={chartData} />
          <ul className="text-sm text-gray-600 space-y-1 mt-2">
            {results.slice(0, 10).map((link, index) => (
              <li key={index} className="truncate">{link}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BacklinkTool;
