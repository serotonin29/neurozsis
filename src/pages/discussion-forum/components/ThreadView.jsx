import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreadView = ({ thread, onBack, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
    return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`;
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
          className="mb-4"
        >
          Kembali ke Forum
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Bookmark">
            Simpan
          </Button>
          <Button variant="outline" size="sm" iconName="Share">
            Bagikan
          </Button>
        </div>
      </div>

      {/* Thread Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="font-heading font-bold text-xl text-foreground">
                {thread.title}
              </h1>
              {thread.status && getThreadStatusIcon(thread.status) && (
                <Icon 
                  name={getThreadStatusIcon(thread.status)} 
                  size={20} 
                  className={getThreadStatusColor(thread.status)} 
                />
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-medium text-sm">
                    {thread.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="font-medium">{thread.author.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    thread.author.role === 'instructor' ?'bg-accent/10 text-accent' :'bg-muted text-muted-foreground'
                  }`}>
                    {thread.author.role === 'instructor' ? 'Dosen' : 'Mahasiswa'}
                  </span>
                </div>
              </div>
              <span>•</span>
              <span>{formatTimeAgo(thread.createdAt)}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={16} />
                <span>{thread.viewCount} views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="font-body text-foreground whitespace-pre-wrap">
            {thread.content}
          </p>
        </div>

        {thread.tags && thread.tags.length > 0 && (
          <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
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

      {/* Replies */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Balasan ({thread.replies?.length || 0})
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
            iconName="MessageSquare"
            iconPosition="left"
          >
            Balas
          </Button>
        </div>

        {thread.replies && thread.replies.map((reply, index) => (
          <div key={reply.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-secondary-foreground font-heading font-medium text-sm">
                  {reply.author.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-body font-semibold text-sm text-foreground">
                    {reply.author.name}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    reply.author.role === 'instructor' ?'bg-accent/10 text-accent' :'bg-muted text-muted-foreground'
                  }`}>
                    {reply.author.role === 'instructor' ? 'Dosen' : 'Mahasiswa'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    #{index + 1}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(reply.createdAt)}
                  </span>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <p className="font-body text-foreground whitespace-pre-wrap">
                    {reply.content}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 mt-3">
                  <Button variant="ghost" size="sm" iconName="ThumbsUp" iconPosition="left">
                    {reply.likes || 0}
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                    Balas
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Flag" iconPosition="left">
                    Laporkan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
            Tulis Balasan
          </h3>
          <form onSubmit={handleReplySubmit}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Tulis balasan Anda di sini..."
              className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body text-sm"
              required
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Info" size={14} />
                <span>Gunakan bahasa yang sopan dan konstruktif</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  iconName="Send"
                  iconPosition="left"
                >
                  Kirim Balasan
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ThreadView;