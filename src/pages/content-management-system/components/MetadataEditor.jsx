import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MetadataEditor = ({ isOpen, onClose, item }) => {
  const [formData, setFormData] = useState({
    title: item?.name || '',
    description: item?.description || '',
    subject: item?.subject || 'anatomy',
    difficulty: item?.difficulty || 'intermediate',
    tags: item?.tags || ['anatomy', 'heart', 'cardiovascular'],
    learningObjectives: item?.learningObjectives || [''],
    prerequisites: item?.prerequisites || '',
    estimatedTime: item?.estimatedTime || '',
    targetAudience: item?.targetAudience || 'medical students',
    language: item?.language || 'english',
    contentType: item?.contentType || 'educational',
    visibility: item?.visibility || 'public'
  });

  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isOpen || !item) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addLearningObjective = () => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const updateLearningObjective = (index, value) => {
    const updated = [...formData.learningObjectives];
    updated[index] = value;
    setFormData(prev => ({ ...prev, learningObjectives: updated }));
  };

  const removeLearningObjective = (index) => {
    const updated = formData.learningObjectives.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, learningObjectives: updated }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaving(false);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name === 'newTag') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Content Metadata</h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <Input
                label="Title"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter a detailed description of the content..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="anatomy">Anatomy</option>
                    <option value="physiology">Physiology</option>
                    <option value="pharmacology">Pharmacology</option>
                    <option value="pathology">Pathology</option>
                    <option value="biochemistry">Biochemistry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    name="newTag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag..."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                    className="rounded-l-none border-l-0"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Learning Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Learning Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objectives</label>
                <div className="space-y-2">
                  {formData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => updateLearningObjective(index, e.target.value)}
                        placeholder="Enter learning objective..."
                        className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeLearningObjective(index)}
                        className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addLearningObjective}>
                    Add Learning Objective
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prerequisites
                </label>
                <textarea
                  rows={3}
                  value={formData.prerequisites}
                  onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="List any prerequisite knowledge or courses..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Estimated Time (minutes)"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="medical students">Medical Students</option>
                    <option value="nursing students">Nursing Students</option>
                    <option value="residents">Residents</option>
                    <option value="healthcare professionals">Healthcare Professionals</option>
                    <option value="general public">General Public</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => handleInputChange('visibility', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Version Control */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Version Control</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Current Version: 1.2</p>
              <p>Last Modified: January 20, 2025</p>
              <p>Modified by: Dr. Sarah Johnson</p>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Version Notes (optional)
                </label>
                <input
                  type="text"
                  placeholder="Brief description of changes..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Preview Changes
            </Button>
            <Button variant="outline" size="sm">
              View History
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} loading={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataEditor;