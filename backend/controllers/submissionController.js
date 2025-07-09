const Submission = require('../models/submissionModel');

const logSubmission = async (req, res) => {
  const { projectId } = req.params;
  const { siteName, submissionType } = req.body;

  const submission = await Submission.create({
    userId: req.userId,
    projectId,
    siteName,
    submissionType,
  });

  res.status(201).json(submission);
};
module.exports = { logSubmission };
