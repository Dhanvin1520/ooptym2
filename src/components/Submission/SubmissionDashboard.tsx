import React, { useEffect, useState } from 'react';
import {
  ClipboardList,
  Edit3,
  Bookmark,
  Speaker,
  Users,
  Share2,
  MapPin,
  BookOpenText,
  Globe,
  HelpCircle,
} from 'lucide-react';

import { getProjects, triggerSubmission } from '../../lib/api';

const submissionTypes = [
  { name: 'Directory', key: 'directory', icon: <ClipboardList className="w-5 h-5 text-blue-600" /> },
  { name: 'Article', key: 'article', icon: <Edit3 className="w-5 h-5 text-purple-600" /> },
  { name: 'Bookmark', key: 'bookmark', icon: <Bookmark className="w-5 h-5 text-pink-600" /> },
  { name: 'Classified', key: 'classified', icon: <Speaker className="w-5 h-5 text-yellow-600" /> },
  { name: 'Forum', key: 'forum', icon: <Users className="w-5 h-5 text-cyan-600" /> },
  { name: 'Social', key: 'social', icon: <Share2 className="w-5 h-5 text-red-600" /> },
  { name: 'Local Listing', key: 'local', icon: <MapPin className="w-5 h-5 text-green-600" /> },
  { name: 'Citation', key: 'citation', icon: <BookOpenText className="w-5 h-5 text-fuchsia-600" /> },
  { name: 'Web 2.0', key: 'web2', icon: <Globe className="w-5 h-5 text-indigo-600" /> },
  { name: 'Q&A', key: 'qa', icon: <HelpCircle className="w-5 h-5 text-teal-600" /> },
];

const directorySites = ['Sulekha', 'JustDial', 'IndiaMart', 'Grotal', 'TradeIndia', 'YellowPages'];


const SubmissionDashboard = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (key: string) => {
    setSelectedType(key);
  };

  const handleBack = () => {
    setSelectedType(null);
    setSelectedProject('');
  };

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

  const handleAutoSubmit = async (siteName: string) => {
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await triggerSubmission(selectedProject, siteName);
      alert(res.data.message || `✅ Submitted to ${siteName}`);
    } catch (err) {
      console.error('Submission error:', err);
      alert('❌ Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {!selectedType && (
        <>
          <h2 className="text-2xl font-bold text-gray-900">Submission Types</h2>
          <p className="text-gray-600">Track and trigger auto-submissions across platforms</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissionTypes.map((type) => (
              <div
                key={type.key}
                onClick={() => handleSelect(type.key)}
                className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer space-y-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {type.icon}
                  </div>
                  <h4 className="text-md font-semibold text-gray-800">{type.name}</h4>
                </div>
                <p className="text-sm text-gray-500">Log or auto-submit to {type.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedType === 'directory' && (
        <>
          <button
            onClick={handleBack}
            className="text-sm text-blue-600 underline hover:text-blue-800 mb-4"
          >
            ← Back to submission types
          </button>

          <h2 className="text-xl font-bold text-gray-800">Directory Submission</h2>
          <p className="text-gray-600 mb-2">Choose your project and directory platform</p>

          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full max-w-md mb-4"
          >
            <option value="">Select a Project</option>
            {projects.map((project: any) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>

          {selectedProject && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {directorySites.map((site) => (
                <div
                  key={site}
                  onClick={() => handleAutoSubmit(site)}
                  className={`bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer space-y-2 ${
                    isSubmitting ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-md font-semibold text-gray-800">{site}</h4>
                  </div>
                  <p className="text-sm text-gray-500">Click to auto-submit via Puppeteer</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SubmissionDashboard;
