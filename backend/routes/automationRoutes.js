const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { triggerAutoSubmission } = require('../controllers/automationController');

const router = express.Router();
router.use(protect);

router.post('/:projectId/directory/:siteName', triggerAutoSubmission); // ✅ new route
module.exports = router;
