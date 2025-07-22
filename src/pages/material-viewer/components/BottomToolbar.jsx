import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BottomToolbar = ({ 
  material, 
  isBookmarked, 
  progress, 
  onBookmarkToggle, 
  onNoteAdd, 
  onShare, 
  onDownload,
  studyTime 
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const formatStudyTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}j ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}d`;
    } else {
      return `${secs}d`;
    }
  };

  const shareOptions = [
    { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-600' },
    { id: 'telegram', name: 'Telegram', icon: 'Send', color: 'text-blue-500' },
    { id: 'email', name: 'Email', icon: 'Mail', color: 'text-gray-600' },
    { id: 'copy', name: 'Salin Link', icon: 'Copy', color: 'text-gray-600' }
  ];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Sedang belajar: ${material.title} - NeuroZsis FK UNP`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // Show toast notification
        break;
    }
    
    setShowShareMenu(false);
    if (onShare) onShare(platform);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto bg-card border-t border-border shadow-clinical-lg z-1000 safe-area-inset-bottom">
      <div className="px-4 py-3">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-caption text-xs text-muted-foreground">Progress Belajar</span>
            <span className="font-caption text-xs font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-clinical" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={onBookmarkToggle}
              className="flex items-center space-x-1"
            >
              <Icon 
                name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
                size={16} 
                className={isBookmarked ? "text-primary-foreground" : "text-muted-foreground"}
              />
              <span className="hidden sm:inline font-body text-sm">
                {isBookmarked ? "Tersimpan" : "Simpan"}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onNoteAdd}
              className="flex items-center space-x-1"
            >
              <Icon name="StickyNote" size={16} className="text-muted-foreground" />
              <span className="hidden sm:inline font-body text-sm">Catatan</span>
            </Button>
          </div>

          {/* Center - Study Timer */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-lg">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="font-mono text-sm font-medium text-foreground">
              {formatStudyTime(studyTime)}
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center space-x-1"
              >
                <Icon name="Share2" size={16} className="text-muted-foreground" />
                <span className="hidden sm:inline font-body text-sm">Bagikan</span>
              </Button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-clinical-lg z-1050 min-w-48">
                  <div className="p-2">
                    <div className="mb-2 px-3 py-2 border-b border-border">
                      <p className="font-body font-medium text-sm text-foreground">Bagikan Materi</p>
                      <p className="font-caption text-xs text-muted-foreground truncate">{material.title}</p>
                    </div>
                    {shareOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleShare(option.id)}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-muted rounded-md transition-clinical"
                      >
                        <Icon name={option.icon} size={16} className={option.color} />
                        <span className="font-body text-sm text-foreground">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="flex items-center space-x-1"
            >
              <Icon name="Download" size={16} className="text-muted-foreground" />
              <span className="hidden sm:inline font-body text-sm">Unduh</span>
            </Button>
          </div>
        </div>

        {/* Mobile-specific quick actions */}
        <div className="lg:hidden mt-3 flex items-center justify-center space-x-4">
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted transition-clinical">
            <Icon name="Lightbulb" size={16} className="text-muted-foreground" />
            <span className="font-caption text-xs text-muted-foreground">Tips</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted transition-clinical">
            <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
            <span className="font-caption text-xs text-muted-foreground">Diskusi</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted transition-clinical">
            <Icon name="BarChart3" size={16} className="text-muted-foreground" />
            <span className="font-caption text-xs text-muted-foreground">Statistik</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomToolbar;