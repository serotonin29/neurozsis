import React, { useState } from 'react';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'user_action',
      user: 'Sarah Johnson',
      action: 'completed Anatomy Quiz #3',
      timestamp: '2 minutes ago',
      details: 'Score: 94%',
      avatar: 'SJ'
    },
    {
      id: 2,
      type: 'content_upload',
      user: 'Dr. Michael Chen',
      action: 'uploaded new Physiology material',
      timestamp: '15 minutes ago',
      details: 'Cardiovascular System Module',
      avatar: 'MC'
    },
    {
      id: 3,
      type: 'system_event',
      user: 'System',
      action: 'automated backup completed',
      timestamp: '30 minutes ago',
      details: 'Database size: 2.3GB',
      avatar: 'SY'
    },
    {
      id: 4,
      type: 'user_action',
      user: 'Emma Davis',
      action: 'started Pharmacology course',
      timestamp: '45 minutes ago',
      details: 'Drug Classifications module',
      avatar: 'ED'
    },
    {
      id: 5,
      type: 'content_upload',
      user: 'Prof. Amanda White',
      action: 'updated quiz questions',
      timestamp: '1 hour ago',
      details: 'Nervous System Assessment',
      avatar: 'AW'
    },
    {
      id: 6,
      type: 'user_action',
      user: 'James Wilson',
      action: 'posted in discussion forum',
      timestamp: '1 hour ago',
      details: 'Topic: Cell Biology Questions',
      avatar: 'JW'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_action':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'content_upload':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'system_event':
        return (
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const filteredActivities = filter === 'all' ? activities : activities.filter(activity => activity.type === filter);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        
        {/* Filter buttons */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('user_action')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'user_action' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setFilter('content_upload')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'content_upload' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setFilter('system_event')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'system_event' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
            }`}
          >
            System
          </button>
        </div>
      </div>

      <div className="flow-root">
        <ul className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => (
            <li key={activity.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative">
                    <span className="text-sm font-medium text-gray-600">{activity.avatar}</span>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-200">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span>{activity.action}</span>
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      {activity.timestamp}
                    </div>
                  </div>
                  {activity.details && (
                    <p className="text-sm text-gray-500 mt-1">{activity.details}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Load more activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;