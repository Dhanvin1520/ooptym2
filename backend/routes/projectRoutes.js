const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createProject, getProjects, deleteProject } = require('../controllers/projectController');

const router = express.Router();
router.use(protect); // 🔐 protect all routes

router.post('/', createProject);
router.get('/', getProjects);
router.delete('/:id', deleteProject);

module.exports = router;
