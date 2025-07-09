const autoSubmitDirectory = require('../services/autoSubmitDirectory');
const Submission = require('../models/submissionModel');

const triggerAutoSubmission = async (req, res) => {
  const { projectId, siteName } = req.params;
  const userId = req.user._id; // ✅ FIXED

  const result = await autoSubmitDirectory(projectId, siteName);

  if (result.success) {
    await Submission.create({
      userId,
      projectId,
      siteName,
      submissionType: 'directory',
    });
  }

  res.json(result);
};

module.exports = { triggerAutoSubmission };