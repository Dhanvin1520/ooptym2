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
          <div>
            <strong>Meta Tag Report:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(project.metaTagReport, null, 2)}</pre>
          </div>
        )}
        {project.keywordDensityReport && (
          <div>
            <strong>Keyword Density Report:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(project.keywordDensityReport, null, 2)}</pre>
          </div>
        )}
        {project.backlinkReport && (
          <div>
            <strong>Backlink Report:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(project.backlinkReport, null, 2)}</pre>
          </div>
        )}
        {project.brokenLinksReport && (
          <div>
            <strong>Broken Links Report:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(project.brokenLinksReport, null, 2)}</pre>
          </div>
        )}
        {project.sitemapReport && (
          <div>
            <strong>Sitemap Report:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(project.sitemapReport, null, 2)}</pre>
          </div>
        )}
        {project.robotsReport && (
          <div>
            <strong>Robots.txt Report:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(project.robotsReport, null, 2)}</pre>
          </div>
        )}
        {project.keywordTrackerReport && (
          <div>
            <strong>Keyword Tracker:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(project.keywordTrackerReport, null, 2)}</pre>
          </div>
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

export default ProjectDetails;