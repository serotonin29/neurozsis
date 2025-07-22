import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const ContentList = ({ 
  selectedFolder, 
  selectedItems, 
  onSelectItems, 
  onPreview, 
  onEdit,
  searchQuery,
  filterBy,
  sortBy
}) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Mock data - replace with real data
  const mockContent = [
    {
      id: 1,
      name: 'Human Heart Anatomy.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-01-15',
      author: 'Dr. Sarah Johnson',
      status: 'published',
      downloads: 234,
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 2,
      name: 'Cardiovascular System Video.mp4',
      type: 'video',
      size: '45.6 MB',
      uploadDate: '2025-01-14',
      author: 'Dr. Michael Chen',
      status: 'draft',
      downloads: 89,
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 3,
      name: 'Cell Structure Diagram.png',
      type: 'image',
      size: '892 KB',
      uploadDate: '2025-01-13',
      author: 'Prof. Amanda White',
      status: 'published',
      downloads: 156,
      thumbnail: '/api/placeholder/120/80'
    },
    {
      id: 4,
      name: 'Anatomy Quiz - Chapter 3',
      type: 'quiz',
      size: '12 questions',
      uploadDate: '2025-01-12',
      author: 'Dr. Sarah Johnson',
      status: 'published',
      downloads: 445,
      thumbnail: '/api/placeholder/120/80'
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return (
          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'video':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293L12 11l.707-.707A1 1 0 0113.414 10H15M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'image':
        return (
          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'quiz':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Published</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Draft</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Unknown</span>;
    }
  };

  const handleSelectItem = (itemId) => {
    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    onSelectItems(newSelection);
  };

  const handleSelectAll = () => {
    const allIds = mockContent.map(item => item.id);
    const newSelection = selectedItems.length === mockContent.length ? [] : allIds;
    onSelectItems(newSelection);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* View mode toggle */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Content Items</h3>
          <p className="text-sm text-gray-500">{mockContent.length} items in this folder</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* List View */
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.length === mockContent.length && mockContent.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm font-medium text-gray-700">
                  Name
                </label>
              </div>
              <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:ml-6">
                <div className="grid grid-cols-4 gap-4 flex-1 text-left">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Type</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Size</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Actions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content rows */}
          <div className="divide-y divide-gray-200">
            {mockContent.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex items-center">
                      {getFileIcon(item.type)}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">by {item.author} • {item.uploadDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:ml-6">
                    <div className="grid grid-cols-4 gap-4 flex-1">
                      <div className="text-sm text-gray-900 capitalize">{item.type}</div>
                      <div className="text-sm text-gray-500">{item.size}</div>
                      <div>{getStatusBadge(item.status)}</div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onPreview(item)}
                        >
                          Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onEdit(item)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockContent.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
                  {getFileIcon(item.type)}
                </div>
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  {getStatusBadge(item.status)}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">{item.name}</h4>
                <p className="text-xs text-gray-500 mb-2">by {item.author}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{item.size}</span>
                  <span>{item.downloads} downloads</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="xs"
                    fullWidth
                    onClick={() => onPreview(item)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;