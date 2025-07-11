const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  submissionType: {
    type: String,
    enum: [
      'directory',
      'article',
      'bookmark',
      'classified',
      'forum',
      'social',
      'local',
      'citation',
      'web2',
      'qa'
    ],
    required: true
  },
  submittedAt: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // 🧱 Basic Info
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String },
  email: { type: String },

  // 🧠 SEO Metadata
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: [String],
  targetKeywords: [String],
  sitemapUrl: { type: String },
  robotsTxtUrl: { type: String },

  // 🧪 Tool Reports
  metaTagReport: { type: Object },           // Analysis of title & meta description
  keywordDensityReport: { type: Object },    // % usage and density insights
  backlinkReport: { type: Object },          // Referring domains, anchors
  brokenLinksReport: { type: Object },       // List of dead URLs found
  sitemapReport: { type: Object },           // Pages, status codes
  robotsReport: { type: Object },            // Crawl rules
  keywordTrackerReport: { type: Object },
  pageSpeedReport: { type: Object },    // Keyword positions or rankings

  // 📍 Submission Logs
  submissions: [submissionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
