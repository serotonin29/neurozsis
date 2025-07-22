import React, { useState } from 'react';
import MetricsOverview from './components/MetricsOverview';
import UserGrowthChart from './components/UserGrowthChart';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import NotificationPanel from './components/NotificationPanel';
import AdminSidebar from './components/AdminSidebar';

const AdminDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0">Admin Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Metrics Overview */}
            <MetricsOverview timeRange={selectedTimeRange} />

            {/* Quick Actions */}
            <QuickActions />

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <UserGrowthChart timeRange={selectedTimeRange} />
              </div>
              <div>
                <NotificationPanel />
              </div>
            </div>

            {/* Activity Feed */}
            <ActivityFeed />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;