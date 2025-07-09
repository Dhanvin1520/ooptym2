const Project = require('../models/projectModel');

const createProject = async (req, res) => {
  try {
    const {
      title,
      url,
      category,
      email,
      metaTitle,
      metaDescription,
      keywords,
      targetKeywords,
      sitemapUrl,
      robotsTxtUrl
    } = req.body;

    const project = await Project.create({
      userId: req.userId,
      title,
      url,
      category,
      email,
      metaTitle,
      metaDescription,
      keywords,           // must be an array from frontend
      targetKeywords,     // must be an array from frontend
      sitemapUrl,
      robotsTxtUrl
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
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
