import React from 'react';

import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      title: 'User Management',
      description: 'Manage students and faculty',
      href: '/user-management',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Content Upload',
      description: 'Add new learning materials',
      href: '/content-management-system',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'System Alerts',
      description: 'View critical notifications',
      href: '/system-alerts',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: 'Backup Status',
      description: 'Monitor system backups',
      href: '/backup-status',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color} text-white transition-colors`}>
                {action.icon}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
            
            {/* Hover effect arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;