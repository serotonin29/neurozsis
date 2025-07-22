import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreadList = ({ threads, onThreadClick }) => {
  const getThreadStatusIcon = (status) => {
    switch (status) {
      case 'pinned':
        return 'Pin';
      case 'locked':
        return 'Lock';
      case 'solved':
        return 'CheckCircle';
      default:
        return null;
    }
  };

  const getThreadStatusColor = (status) => {
    switch (status) {
      case 'pinned':
        return 'text-warning';
      case 'locked':
        return 'text-error';
      case 'solved':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
    return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`;
  };

  return (
    <div className="space-y-2">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-clinical transition-clinical"
          onClick={() => onThreadClick(thread)}
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-heading font-medium text-sm">
                {thread.author.name.charAt(0)}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-body font-semibold text-sm text-foreground truncate">
                      {thread.title}
                    </h4>
                    {thread.status && getThreadStatusIcon(thread.status) && (
                      <Icon 
                        name={getThreadStatusIcon(thread.status)} 
                        size={16} 
                        className={getThreadStatusColor(thread.status)} 
                      />
                    )}
                    {thread.isUnread && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  
                  <p className="font-caption text-xs text-muted-foreground mb-2 line-clamp-2">
                    {thread.preview}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{thread.author.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        thread.author.role === 'instructor' ?'bg-accent/10 text-accent' :'bg-muted text-muted-foreground'
                      }`}>
                        {thread.author.role === 'instructor' ? 'Dosen' : 'Mahasiswa'}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{formatTimeAgo(thread.createdAt)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 ml-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="MessageSquare" size={14} />
                      <span className="font-caption text-xs">{thread.replyCount}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground mt-1">
                      <Icon name="Eye" size={14} />
                      <span className="font-caption text-xs">{thread.viewCount}</span>
                    </div>
                  </div>
                  
                  {thread.lastReply && (
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-secondary-foreground font-caption text-xs">
                          {thread.lastReply.author.charAt(0)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-caption text-xs text-muted-foreground">
                          {formatTimeAgo(thread.lastReply.timestamp)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {thread.tags && thread.tags.length > 0 && (
            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
              {thread.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-caption"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThreadList;