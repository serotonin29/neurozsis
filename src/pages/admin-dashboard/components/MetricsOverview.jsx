import React from 'react';

const MetricsOverview = ({ timeRange }) => {
  const metrics = [
    {
      title: 'Active Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      title: 'Content Engagement',
      value: '89.2%',
      change: '+3.2%',
      trend: 'up',
      color: 'bg-green-500'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '0%',
      trend: 'stable',
      color: 'bg-purple-500'
    },
    {
      title: 'Quiz Completions',
      value: '1,543',
      change: '+8.7%',
      trend: 'up',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
              {metric.trend === 'up' && (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )}
              {metric.trend === 'stable' && (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )}
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 
              metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {metric.change} from last {timeRange}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;