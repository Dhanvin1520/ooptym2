import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const KeywordDensityTool = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<[string, number][] | null>(null);
  const projectId = 'your-project-id-here'; // Replace with dynamic project ID

  const handleScan = async () => {
    try {
      const res = await axios.post(`http://localhost:5009/api/tools/${projectId}/run`, {
        toolName: 'Keyword Density',
        url,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setData(res.data.result);
    } catch (err) {
      console.error('Scan failed:', err);
    }
  };

  const chartData = {
    labels: data?.map(([word]: [string, number]) => word),
    datasets: [{
      label: 'Frequency',
      data: data?.map(([_, count]) => count),
      backgroundColor: '#3b82f6',
    }],
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Keyword Density Tool</h2>
      <p className="text-gray-600">Analyze top recurring keywords from your page content</p>

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

      {data && (
        <div className="mt-6">
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default KeywordDensityTool;
