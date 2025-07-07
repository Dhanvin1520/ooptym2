const Project = require('../models/projectModel');

const createProject = async (req, res) => {
  try {
    const { title, url, category } = req.body;
    const project = await Project.create({ title, url, category, userId: req.userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Project creation failed' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.id, userId: req.userId });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};

module.exports = { createProject, getProjects, deleteProject };
