import React from 'react';
import Button from '../../../components/ui/Button';

const PreviewModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  const renderPreviewContent = () => {
    switch (item.type) {
      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg">
            <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium text-gray-900">PDF Document</p>
            <p className="text-sm text-gray-500 mt-1">Click "Open Full Preview" to view the PDF</p>
          </div>
        );

      case 'video':
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg">
            <svg className="w-16 h-16 text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293L12 11l.707-.707A1 1 0 0113.414 10H15M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-900">Video Content</p>
            <p className="text-sm text-gray-500 mt-1">Video preview would load here</p>
          </div>
        );

      case 'image':
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg">
            <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium text-gray-900">Image Preview</p>
            <p className="text-sm text-gray-500 mt-1">Image would be displayed here</p>
          </div>
        );

      case 'quiz':
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Quiz Preview</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border">
                <p className="font-medium text-gray-900 mb-3">Sample Question:</p>
                <p className="text-gray-700 mb-3">Which of the following is the largest chamber of the heart?</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="sample" className="mr-2" />
                    <span className="text-sm">Right atrium</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="sample" className="mr-2" />
                    <span className="text-sm">Left atrium</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="sample" className="mr-2" />
                    <span className="text-sm">Right ventricle</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="sample" className="mr-2" />
                    <span className="text-sm">Left ventricle</span>
                  </label>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Total Questions: 12</p>
                <p>Estimated Time: 15 minutes</p>
                <p>Difficulty: Intermediate</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Preview not available for this file type</p>
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            {getStatusBadge(item.status)}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Preview Area */}
          {renderPreviewContent()}

          {/* Metadata */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">File Information</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Type:</dt>
                  <dd className="text-sm text-gray-900 capitalize">{item.type}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Size:</dt>
                  <dd className="text-sm text-gray-900">{item.size}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Author:</dt>
                  <dd className="text-sm text-gray-900">{item.author}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Upload Date:</dt>
                  <dd className="text-sm text-gray-900">{item.uploadDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Downloads:</dt>
                  <dd className="text-sm text-gray-900">{item.downloads}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Learning Objectives</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Understand basic anatomical structures</li>
                <li>• Identify key physiological processes</li>
                <li>• Apply knowledge to clinical scenarios</li>
                <li>• Demonstrate comprehension through assessment</li>
              </ul>
              
              <h3 className="text-sm font-medium text-gray-900 mb-3 mt-4">Prerequisites</h3>
              <p className="text-sm text-gray-600">Basic understanding of medical terminology and human biology</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{item.downloads}</p>
                <p className="text-xs text-gray-500">Total Downloads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">4.8</p>
                <p className="text-xs text-gray-500">Avg Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">89%</p>
                <p className="text-xs text-gray-500">Completion Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">7.2min</p>
                <p className="text-xs text-gray-500">Avg Study Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Download
            </Button>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Open Full Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;