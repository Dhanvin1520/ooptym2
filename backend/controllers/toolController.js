const Project = require('../models/projectModel');
const axios = require('axios');
const cheerio = require('cheerio');

const { analyzeMetaTags } = require('../services/tools/metaTagAnalyzer');
const { analyzeDensity } = require('../services/tools/keywordDensityAnalyzer');
const { checkBrokenLinks } = require('../services/tools/brokenLinkChecker');
const { checkSitemap, checkRobots } = require('../services/tools/sitemapRobotsChecker');
const { extractBacklinks } = require('../services/tools/backlinkScanner');
const { checkKeywordRank } = require('../services/tools/keywordRankChecker');
const { analyzePageSpeed } = require('../services/tools/pageSpeedAnalyzer');

const runMetaTagAnalyzer = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project || !project.url) {
      return res.status(404).json({ error: 'Project or URL not found' });
    }

    const websiteUrl = project.url;
    const response = await axios.get(websiteUrl);
    const $ = cheerio.load(response.data);

    const metaTitle = $('title').text() || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const metaKeywordsRaw = $('meta[name="keywords"]').attr('content') || '';
    const metaKeywords = metaKeywordsRaw.split(',').map(k => k.trim()).filter(k => k.length > 0);

    const analysisReport = analyzeMetaTags({
      metaTitle,
      metaDescription,
      keywords: metaKeywords
    });

    res.status(200).json(analysisReport);
  } catch (err) {
    console.error('Meta tag analysis error:', err.message);
    res.status(500).json({ error: 'Failed to analyze meta tags' });
  }
};

const runKeywordDensityAnalyzer = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project || !project.url) return res.status(400).json({ error: 'Invalid project or URL' });

  const report = await analyzeDensity(project.url, project.targetKeywords || []);
  project.keywordDensityReport = report;
  await project.save();

  res.json(report);
};

const runBrokenLinkChecker = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project || !project.url) return res.status(400).json({ error: 'Invalid project or URL' });

  const report = await checkBrokenLinks(project.url);
  project.brokenLinksReport = report;
  await project.save();

  res.json(report);
};

const runSitemapRobotsChecker = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) return res.status(404).json({ error: 'Project not found' });

  const sitemapReport = await checkSitemap(project.sitemapUrl);
  const robotsReport = await checkRobots(project.robotsTxtUrl);

  project.sitemapReport = sitemapReport;
  project.robotsReport = robotsReport;
  await project.save();

  res.json({ sitemapReport, robotsReport });
};

const runBacklinkScanner = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project || !project.url) return res.status(400).json({ error: 'Invalid project or URL' });

  const report = await extractBacklinks(project.url);
  project.backlinkReport = report;
  await project.save();

  res.json(report);
};

const runKeywordTracker = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project || !project.url) return res.status(400).json({ error: 'Invalid project or URL' });

  const domain = new URL(project.url).hostname;
  const report = await checkKeywordRank(domain, project.targetKeywords || []);
  project.keywordTrackerReport = report;
  await project.save();
  res.json(report);
};

const runPageSpeedAnalyzer = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project || !project.url) return res.status(400).json({ error: 'Invalid project or URL' });

  const report = await analyzePageSpeed(project.url);
  project.pageSpeedReport = report;
  await project.save();
  res.json(report);
};

module.exports = {
  runMetaTagAnalyzer,
  runKeywordDensityAnalyzer,
  runBrokenLinkChecker,
  runSitemapRobotsChecker,
  runBacklinkScanner,
  runKeywordTracker,
  runPageSpeedAnalyzer
};