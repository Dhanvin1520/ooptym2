const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  runMetaTagAnalyzer,
  runKeywordDensityAnalyzer,
  runBrokenLinkChecker,
  runSitemapRobotsChecker,
  runBacklinkScanner,
  runKeywordTracker,
  runPageSpeedAnalyzer
} = require('../controllers/toolController');

const router = express.Router();
router.use(protect);

// Define all tool routes after importing
router.post('/:projectId/run-meta', runMetaTagAnalyzer);
router.post('/:projectId/run-keyword-density', runKeywordDensityAnalyzer);
router.post('/:projectId/run-broken-links', runBrokenLinkChecker);
router.post('/:projectId/run-sitemap-robots', runSitemapRobotsChecker);
router.post('/:projectId/run-backlinks', runBacklinkScanner);
router.post('/:projectId/run-keyword-tracker', runKeywordTracker);
router.post('/:projectId/run-speed', runPageSpeedAnalyzer);

module.exports = router;