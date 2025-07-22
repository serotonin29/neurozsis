import React, { useState, useCallback } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UploadModal = ({ isOpen, onClose, selectedFolder }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      metadata: {
        title: file.name.split('.')[0],
        description: '',
        tags: [],
        difficulty: 'intermediate',
        subject: 'anatomy'
      }
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const updateFileMetadata = (fileId, field, value) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, metadata: { ...f.metadata, [field]: value } }
        : f
    ));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFiles = () => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      'application/pdf',
      'video/mp4',
      'video/avi',
      'video/mov',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];
    
    return files.every(f => f.file.size <= maxSize && allowedTypes.includes(f.file.type));
  };

  const handleUpload = async () => {
    if (!validateFiles()) return;
    
    setUploading(true);
    
    for (const fileItem of files) {
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadProgress(prev => ({ ...prev, [fileItem.id]: progress }));
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id ? { ...f, progress } : f
          ));
        }
        
        // Mark as completed
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id ? { ...f, status: 'completed' } : f
        ));
        
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id ? { ...f, status: 'error' } : f
        ));
      }
    }
    
    setUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Content</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Upload area */}
        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' :'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>
                <span className="text-sm text-gray-500"> or drag and drop</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleFileInput}
                  accept="application/pdf,video/*,image/*"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PDF, Video, Images up to 100MB each
            </p>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Files to Upload</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {files.map((fileItem) => (
                  <div key={fileItem.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{fileItem.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(fileItem.file.size)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {fileItem.status === 'completed' && (
                          <span className="text-green-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                        {fileItem.status === 'error' && (
                          <span className="text-red-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                        <button
                          onClick={() => removeFile(fileItem.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    {fileItem.status === 'pending' && uploading && (
                      <div className="mb-3">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${fileItem.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{fileItem.progress}% uploaded</p>
                      </div>
                    )}

                    {/* Metadata form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Title"
                        value={fileItem.metadata.title}
                        onChange={(e) => updateFileMetadata(fileItem.id, 'title', e.target.value)}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select
                          value={fileItem.metadata.subject}
                          onChange={(e) => updateFileMetadata(fileItem.id, 'subject', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="anatomy">Anatomy</option>
                          <option value="physiology">Physiology</option>
                          <option value="pharmacology">Pharmacology</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <Input
                          label="Description"
                          value={fileItem.metadata.description}
                          onChange={(e) => updateFileMetadata(fileItem.id, 'description', e.target.value)}
                        />
                      </div>
                      
                      <Input
                        label="Tags (comma-separated)"
                        value={fileItem.metadata.tags.join(', ')}
                        onChange={(e) => updateFileMetadata(fileItem.id, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                        <select
                          value={fileItem.metadata.difficulty}
                          onChange={(e) => updateFileMetadata(fileItem.id, 'difficulty', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading || !validateFiles()}
            loading={uploading}
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} files`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;