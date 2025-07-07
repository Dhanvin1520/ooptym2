import React, { useState } from 'react';
import { createProject } from '../../lib/api';

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const CreateProjectModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    title: '',
    url: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createProject(form);
      alert('✅ Project created successfully!');
      onCreated(); // Refresh project list
      onClose();   // Close modal
    } catch (error) {
      console.error('❌ Error creating project:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Create New Project</h3>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="Website URL"
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-4 py-2 rounded-lg"
        />
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
