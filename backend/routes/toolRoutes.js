const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { runMetaTagAnalyzer } = require('../controllers/toolController');

const router = express.Router();
router.use(protect);

router.post('/:projectId/run-meta', runMetaTagAnalyzer);

module.exports = router;
