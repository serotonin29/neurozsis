import React from 'react';
import Icon from '../../../components/AppIcon';

const ForumCategoryCard = ({ category, onClick, isExpanded }) => {
  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'anatomy':
        return 'User';
      case 'physiology':
        return 'Heart';
      case 'pharmacology':
        return 'Pill';
      case 'general':
        return 'MessageCircle';
      default:
        return 'BookOpen';
    }
  };

  const getCategoryColor = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'anatomy':
        return 'bg-blue-500';
      case 'physiology':
        return 'bg-green-500';
      case 'pharmacology':
        return 'bg-purple-500';
      case 'general':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 cursor-pointer transition-clinical hover:shadow-clinical-lg ${
        isExpanded ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${getCategoryColor(category.name)} rounded-lg flex items-center justify-center`}>
            <Icon name={getCategoryIcon(category.name)} size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">{category.name}</h3>
            <p className="font-caption text-sm text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {category.unreadCount > 0 && (
            <span className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
              {category.unreadCount}
            </span>
          )}
          <div className="text-right">
            <p className="font-caption text-xs text-muted-foreground">
              {category.totalThreads} diskusi
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              {category.totalPosts} pesan
            </p>
          </div>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </div>
      
      {category.recentActivity && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-caption text-xs font-medium">
                {category.recentActivity.author.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-caption text-xs text-muted-foreground truncate">
                <span className="font-medium">{category.recentActivity.author}</span> membalas di{' '}
                <span className="font-medium">{category.recentActivity.thread}</span>
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                {category.recentActivity.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumCategoryCard;