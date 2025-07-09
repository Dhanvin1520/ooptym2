// ✅ App.tsx (Updated for your AuthContext without token field)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import MyProjects from './components/Projects/MyProjects';
import SEOTools from './components/SEO/SeoToolsDashboard';
import SubmissionDashboard from './components/Submission/SubmissionDashboard';
import ProjectDetails from './components/Reports/ProjectDetails';
import PricingPlans from './components/Pricing/PricingPlans';
import ProfileSettings from './components/Profile/ProfileSettings';
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  const authProvider = useAuthProvider();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  interface Project {
    _id: string;
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
    submissions?: any[];
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5005/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data);
      } catch (err) {
        console.error('Error loading projects:', err);
      }
    };

    if (activeTab === 'reports') {
      fetchProjects();
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <MyProjects />;
      case 'tools':
        return <SEOTools />;
      case 'directory':
        return <SubmissionDashboard />;
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">🧠 SEO Project Reports</h2>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Select a Project:</label>
              <select
                onChange={(e) => {
                  const projectId = e.target.value;
                  const project = projects.find((p) => p._id === projectId);
                  setSelectedProject(project || null);
                }}
                className="border px-4 py-2 rounded w-full"
                defaultValue=""
              >
                <option value="" disabled>Select a project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title} ({p.url})
                  </option>
                ))}
              </select>
            </div>

            {selectedProject ? (
              <ProjectDetails project={selectedProject} />
            ) : (
              <p className="text-gray-500">No project selected.</p>
            )}
          </div>
        );
      case 'pricing':
        return <PricingPlans />;
      case 'profile':
        return <ProfileSettings />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthContext.Provider value={authProvider}>
      <div className="min-h-screen bg-gray-50">
        {!authProvider.user ? (
          authMode === 'login' ? (
            <Login onSwitchToRegister={() => setAuthMode('register')} />
          ) : (
            <Register onSwitchToLogin={() => setAuthMode('login')} />
          )
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isCollapsed={sidebarCollapsed}
              setIsCollapsed={setSidebarCollapsed}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar activeTab={activeTab} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                {renderContent()}
              </main>
            </div>
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
