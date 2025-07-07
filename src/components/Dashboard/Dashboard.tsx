import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      change: '+2.5%',
      trend: 'up',
      icon: Globe,
      color: 'blue'
    },
    {
      title: 'Active Submissions',
      value: '48',
      change: '+12.3%',
      trend: 'up',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Monthly Traffic',
      value: '2.4K',
      change: '+8.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.8%',
      trend: 'down',
      icon: BarChart3,
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Project "E-commerce Store" submitted to 5 directories',
      time: '2 hours ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      action: 'Keyword analysis completed for "Tech Blog"',
      time: '4 hours ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 3,
      action: 'Directory submission pending approval',
      time: '6 hours ago',
      status: 'warning',
      icon: Clock
    },
    {
      id: 4,
      action: 'Failed to submit to "High PR Directory"',
      time: '1 day ago',
      status: 'error',
      icon: AlertCircle
    }
  ];

  const topDirectories = [
    { name: 'Google My Business', submissions: 45, success: 42 },
    { name: 'Bing Places', submissions: 38, success: 35 },
    { name: 'Yahoo Local', submissions: 32, success: 28 },
    { name: 'Foursquare', submissions: 28, success: 25 },
    { name: 'Yelp Business', submissions: 24, success: 22 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to your SEO Dashboard</h2>
        <p className="text-blue-100">
          Track your SEO performance, manage projects, and boost your search rankings all in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            purple: 'bg-purple-500',
            orange: 'bg-orange-500'
          };

          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              const statusColors = {
                success: 'text-green-500',
                warning: 'text-yellow-500',
                error: 'text-red-500'
              };

              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Icon className={`w-5 h-5 mt-0.5 ${statusColors[activity.status as keyof typeof statusColors]}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Directories */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Directories</h3>
          <div className="space-y-4">
            {topDirectories.map((directory, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{directory.name}</span>
                  <span className="text-xs text-gray-500">
                    {directory.success}/{directory.submissions}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(directory.success / directory.submissions) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
            <Globe className="w-6 h-6 mb-2" />
            <span className="block text-sm font-medium">New Project</span>
          </button>
          <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all">
            <Target className="w-6 h-6 mb-2" />
            <span className="block text-sm font-medium">Directory Submit</span>
          </button>
          <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all">
            <BarChart3 className="w-6 h-6 mb-2" />
            <span className="block text-sm font-medium">Run SEO Audit</span>
          </button>
        </div>
      </div>
    </div>
  );
}