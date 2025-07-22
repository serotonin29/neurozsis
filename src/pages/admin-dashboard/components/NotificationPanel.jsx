import React from 'react';

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'Content Flagged for Review',
      message: 'Anatomy module reported by 3 users',
      time: '5 minutes ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    },
    {
      id: 2,
      type: 'error',
      title: 'System Error Detected',
      message: 'Database connection timeout',
      time: '12 minutes ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      type: 'support',
      title: 'New Support Ticket',
      message: 'Student unable to access quiz module',
      time: '25 minutes ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 4,
      type: 'info',
      title: 'Backup Completed',
      message: 'Daily backup finished successfully',
      time: '1 hour ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'text-red-500 bg-red-50';
      case 'error':
        return 'text-red-500 bg-red-50';
      case 'support':
        return 'text-blue-500 bg-blue-50';
      case 'info':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (type) => {
    switch (type) {
      case 'urgent':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Urgent</span>;
      case 'error':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Error</span>;
      case 'support':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Support</span>;
      case 'info':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Info</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Priority Notifications</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
              {notification.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {notification.title}
                </p>
                {getPriorityBadge(notification.type)}
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400">
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {notifications.filter(n => n.type === 'urgent' || n.type === 'error').length} urgent items
          </span>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Manage Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;