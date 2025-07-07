import React, { useState } from 'react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import MyProjects from './components/Projects/MyProjects';
import SEOTools from './components/SEO/SeoToolsDashboard';
import DirectorySubmission from './components/Directory/DirectorySubmission';
import SubmissionReports from './components/Reports/SubmissionReports';
import PricingPlans from './components/Pricing/PricingPlans';
import ProfileSettings from './components/Profile/ProfileSettings';
import AdminPanel from './components/Admin/AdminPanel';


function App() {
  const authProvider = useAuthProvider();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <MyProjects />;
      case 'tools':
        return <SEOTools />;
      case 'directory':
        return <DirectorySubmission />;
      case 'reports':
        return <SubmissionReports />;
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