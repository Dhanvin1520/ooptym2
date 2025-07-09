import React, { useState, ChangeEvent } from 'react';
import { createProject } from '../../lib/api';

interface CreateProjectModalProps {
  onClose: () => void;
  onCreated: () => void;
}

// 1. Define a type for the form fields
type ProjectFormFields = {
  title: string;
  url: string;
  category: string;
  email: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  targetKeywords: string;
  sitemapUrl: string;
  robotsTxtUrl: string;
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onCreated }) => {
  const [form, setForm] = useState<ProjectFormFields>({
    title: '',
    url: '',
    category: '',
    email: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    targetKeywords: '',
    sitemapUrl: '',
    robotsTxtUrl: '',
  });

  // 2. Strongly type the event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const projectData = {
      ...form,
      keywords: form.keywords.split(',').map(k => k.trim()),
      targetKeywords: form.targetKeywords.split(',').map(k => k.trim()),
    };

    // Remove additional properties not expected by createProject
    const { keywords, targetKeywords, ...filteredData } = projectData;

    await createProject(filteredData);
    onCreated();
    onClose();
  };

  // 3. Keys list needs to be typed properly
  const inputFields: { key: keyof ProjectFormFields; label: string }[] = [
    { key: 'title', label: 'Project Title' },
    { key: 'url', label: 'Website URL' },
    { key: 'email', label: 'Business Email' },
    { key: 'category', label: 'Category' },
    { key: 'metaTitle', label: 'Meta Title' },
    { key: 'metaDescription', label: 'Meta Description' },
    { key: 'keywords', label: 'Keywords (comma-separated)' },
    { key: 'targetKeywords', label: 'Target Keywords' },
    { key: 'sitemapUrl', label: 'Sitemap URL' },
    { key: 'robotsTxtUrl', label: 'Robots.txt URL' },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>

        {inputFields.map(({ key, label }) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={label}
            className="w-full border rounded px-4 py-2"
          />
        ))}

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;