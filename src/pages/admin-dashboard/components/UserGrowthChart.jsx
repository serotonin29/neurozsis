import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const UserGrowthChart = ({ timeRange }) => {
  const data = [
    { name: 'Mon', users: 2400, engagement: 89 },
    { name: 'Tue', users: 2210, engagement: 92 },
    { name: 'Wed', users: 2290, engagement: 87 },
    { name: 'Thu', users: 2000, engagement: 94 },
    { name: 'Fri', users: 2181, engagement: 91 },
    { name: 'Sat', users: 2500, engagement: 88 },
    { name: 'Sun', users: 2100, engagement: 90 },
  ];

  const contentData = [
    { name: 'Anatomy', value: 45, color: '#3B82F6' },
    { name: 'Physiology', value: 35, color: '#10B981' },
    { name: 'Pharmacology', value: 20, color: '#F59E0B' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">User Activity & Engagement</h3>
        <div className="flex space-x-2">
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Users
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Engagement %
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Daily Active Users</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Popular Content Categories</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={contentData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="value" fill="#8884d8">
                {contentData.map((entry, index) => (
                  <Bar key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assessment completion rates */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Assessment Completion Rates</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">94%</p>
            <p className="text-xs text-blue-700">Quiz Completion</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">87%</p>
            <p className="text-xs text-green-700">Assignment Submission</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">78%</p>
            <p className="text-xs text-orange-700">Discussion Participation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGrowthChart;