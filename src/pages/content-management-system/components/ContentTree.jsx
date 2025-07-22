import React, { useState } from 'react';

const ContentTree = ({ selectedFolder, onSelectFolder }) => {
  const [expandedFolders, setExpandedFolders] = useState(['root', 'anatomy']);

  const contentStructure = [
    {
      id: 'root',
      name: 'Medical Content',
      type: 'folder',
      children: [
        {
          id: 'anatomy',
          name: 'Anatomy',
          type: 'folder',
          children: [
            { id: 'anatomy-basics', name: 'Basic Anatomy', type: 'folder' },
            { id: 'anatomy-systems', name: 'Body Systems', type: 'folder' },
            { id: 'anatomy-advanced', name: 'Advanced Topics', type: 'folder' }
          ]
        },
        {
          id: 'physiology',
          name: 'Physiology',
          type: 'folder',
          children: [
            { id: 'physiology-cellular', name: 'Cellular Physiology', type: 'folder' },
            { id: 'physiology-systems', name: 'Systems Physiology', type: 'folder' },
            { id: 'physiology-pathology', name: 'Pathophysiology', type: 'folder' }
          ]
        },
        {
          id: 'pharmacology',
          name: 'Pharmacology',
          type: 'folder',
          children: [
            { id: 'pharmacology-basics', name: 'Drug Basics', type: 'folder' },
            { id: 'pharmacology-classes', name: 'Drug Classifications', type: 'folder' },
            { id: 'pharmacology-interactions', name: 'Drug Interactions', type: 'folder' }
          ]
        }
      ]
    }
  ];

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const renderTreeItem = (item, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedFolders.includes(item.id);
    const isSelected = selectedFolder === item.id;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center py-2 px-3 text-sm cursor-pointer rounded-md transition-colors ${
            isSelected 
              ? 'bg-blue-100 text-blue-700 font-medium' :'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleFolder(item.id);
            }
            onSelectFolder(item.id);
          }}
        >
          {hasChildren && (
            <span className="mr-2 flex-shrink-0">
              {isExpanded ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </span>
          )}
          
          <span className="mr-3 flex-shrink-0">
            {item.type === 'folder' ? (
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 002 2H6a2 2 0 00-2-2V5z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
          </span>
          
          <span className="truncate">{item.name}</span>
          
          {item.children && (
            <span className="ml-auto text-xs text-gray-500">
              {item.children.length}
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {item.children.map(child => renderTreeItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-4">
      {contentStructure.map(item => renderTreeItem(item))}
    </div>
  );
};

export default ContentTree;