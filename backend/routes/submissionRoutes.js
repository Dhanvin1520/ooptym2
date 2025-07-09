const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { logSubmission } = require('../controllers/submissionController');

const router = express.Router();
router.use(protect);

router.post('/:projectId', logSubmission); // Log submission with projectId

module.exports = router;
