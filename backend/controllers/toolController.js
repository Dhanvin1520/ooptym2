const Project = require('../models/projectModel');
const { analyzeMetaTags } = require('../services/tools/metaTagAnalyzer');
const axios = require('axios');
const cheerio = require('cheerio');

const runMetaTagAnalyzer = async (req, res) => {
  const { projectId } = req.params;

  try {
    // 1. Get the project
    const project = await Project.findById(projectId);
    if (!project || !project.url) {
      return res.status(404).json({ error: 'Project or URL not found' });
    }

    const websiteUrl = project.url;

    // 2. Fetch website HTML
    const response = await axios.get(websiteUrl);
    const $ = cheerio.load(response.data);

    // 3. Extract meta tags
    const metaTitle = $('title').text() || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const metaKeywordsRaw = $('meta[name="keywords"]').attr('content') || '';
    const metaKeywords = metaKeywordsRaw.split(',').map(k => k.trim()).filter(k => k.length > 0);

    // 4. Analyze using your existing logic
    const analysisReport = analyzeMetaTags({
      metaTitle,
      metaDescription,
      keywords: metaKeywords
    });

    // 5. Optionally save it to project (if you want)
    // project.reports.push({ type: 'meta', data: analysisReport });
    // await project.save();

    // 6. Return to frontend
    res.status(200).json(analysisReport);
  } catch (err) {
    console.error('Meta tag analysis error:', err.message);
    res.status(500).json({ error: 'Failed to analyze meta tags' });
  }
};

module.exports = { runMetaTagAnalyzer };