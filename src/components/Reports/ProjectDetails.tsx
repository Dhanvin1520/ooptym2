import React from 'react';

type Submission = {
  siteName: string;
  submissionType: string;
  submittedAt: string;
};

type Project = {
  title: string;
  url: string;
  email?: string;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  targetKeywords?: string[];
  sitemapUrl?: string;
  robotsTxtUrl?: string;

  metaTagReport?: object;
  keywordDensityReport?: object;
  backlinkReport?: object;
  brokenLinksReport?: object;
  sitemapReport?: object;
  robotsReport?: object;
  keywordTrackerReport?: object;
  pageSpeedReport?: object;
  schemaReport?: object;
  altTextReport?: object;
  canonicalReport?: object;

  submissions?: Submission[];
};

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
      <p className="text-gray-600"><strong>URL:</strong> {project.url}</p>
      <p className="text-gray-600"><strong>Email:</strong> {project.email}</p>
      <p className="text-gray-600"><strong>Category:</strong> {project.category}</p>

      <div className="border-t pt-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-700">🧠 SEO Metadata</h3>
        <p><strong>Meta Title:</strong> {project.metaTitle}</p>
        <p><strong>Meta Description:</strong> {project.metaDescription}</p>
        <p><strong>Keywords:</strong> {project.keywords?.join(', ')}</p>
        <p><strong>Target Keywords:</strong> {project.targetKeywords?.join(', ')}</p>
        <p><strong>Sitemap:</strong> {project.sitemapUrl}</p>
        <p><strong>Robots.txt:</strong> {project.robotsTxtUrl}</p>
      </div>

      <div className="border-t pt-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">📊 Tool Reports</h3>

        {project.metaTagReport && (
          <ReportBlock title="Meta Tag Report" report={project.metaTagReport} />
        )}
        {project.keywordDensityReport && (
          <ReportBlock title="Keyword Density Report" report={project.keywordDensityReport} />
        )}
        {project.backlinkReport && (
          <ReportBlock title="Backlink Report" report={project.backlinkReport} />
        )}
        {project.brokenLinksReport && (
          <ReportBlock title="Broken Links Report" report={project.brokenLinksReport} />
        )}
        {project.sitemapReport && (
          <ReportBlock title="Sitemap Report" report={project.sitemapReport} />
        )}
        {project.robotsReport && (
          <ReportBlock title="Robots.txt Report" report={project.robotsReport} />
        )}
        {project.keywordTrackerReport && (
          <ReportBlock title="Keyword Tracker Report" report={project.keywordTrackerReport} />
        )}
        {project.pageSpeedReport && (
          <ReportBlock title="Page Speed Report" report={project.pageSpeedReport} />
        )}
        {project.schemaReport && (
          <ReportBlock title="Schema Markup Report" report={project.schemaReport} />
        )}
        {project.altTextReport && (
          <ReportBlock title="Image Alt Text Report" report={project.altTextReport} />
        )}
        {project.canonicalReport && (
          <ReportBlock title="Canonical Tag Report" report={project.canonicalReport} />
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-700">📍 Submissions</h3>
        {project.submissions?.length ? (
          <ul className="list-disc ml-6 text-gray-600">
            {project.submissions.map((s, i) => (
              <li key={i}>
                {s.submissionType} → {s.siteName} on {new Date(s.submittedAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No submissions logged yet.</p>
        )}
      </div>
    </div>
  );
};

const ReportBlock = ({ title, report }: { title: string; report: object }) => (
  <div>
    <strong>{title}:</strong>
    <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(report, null, 2)}</pre>
  </div>
);

export default ProjectDetails;
