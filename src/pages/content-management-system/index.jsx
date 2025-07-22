import React, { useState } from 'react';
import ContentTree from './components/ContentTree';
import ContentList from './components/ContentList';
import UploadModal from './components/UploadModal';
import PreviewModal from './components/PreviewModal';
import MetadataEditor from './components/MetadataEditor';
import AdminSidebar from '../admin-dashboard/components/AdminSidebar';
import Button from '../../components/ui/Button';

const ContentManagementSystem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('root');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showMetadataEditor, setShowMetadataEditor] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const handlePreview = (item) => {
    setPreviewItem(item);
    setShowPreviewModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowMetadataEditor(true);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on`, selectedItems);
    // Implement bulk actions
    setSelectedItems([]);
  };

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
                <h1 className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0">Content Management</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="search"
                  className="hidden sm:inline-flex"
                >
                  Search
                </Button>
                <Button
                  onClick={() => setShowUploadModal(true)}
                  size="sm"
                  iconName="plus"
                >
                  Upload Content
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar - Content tree */}
          <div className="hidden md:flex md:w-80 md:flex-col">
            <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="px-4 mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Content Library</h2>
                </div>
                <ContentTree
                  selectedFolder={selectedFolder}
                  onSelectFolder={setSelectedFolder}
                />
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                {/* Search and filters */}
                <div className="flex-1 flex items-center space-x-4">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search content..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="pdf">PDF</option>
                      <option value="video">Video</option>
                      <option value="image">Images</option>
                      <option value="quiz">Quiz</option>
                    </select>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="name">Name</option>
                      <option value="date">Date</option>
                      <option value="size">Size</option>
                      <option value="type">Type</option>
                    </select>
                  </div>
                </div>

                {/* Bulk actions */}
                {selectedItems.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {selectedItems.length} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('delete')}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('move')}
                    >
                      Move
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('publish')}
                    >
                      Publish
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-auto">
              <ContentList
                selectedFolder={selectedFolder}
                selectedItems={selectedItems}
                onSelectItems={setSelectedItems}
                onPreview={handlePreview}
                onEdit={handleEdit}
                searchQuery={searchQuery}
                filterBy={filterBy}
                sortBy={sortBy}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          selectedFolder={selectedFolder}
        />
      )}

      {showPreviewModal && previewItem && (
        <PreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          item={previewItem}
        />
      )}

      {showMetadataEditor && editingItem && (
        <MetadataEditor
          isOpen={showMetadataEditor}
          onClose={() => setShowMetadataEditor(false)}
          item={editingItem}
        />
      )}
    </div>
  );
};

export default ContentManagementSystem;