import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PreviewModal = ({ material, isOpen, onClose, onOpenMaterial }) => {
  if (!isOpen || !material) return null;

  const getContentTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'video':
        return 'Play';
      case 'infographic':
        return 'Image';
      case 'presentation':
        return 'Presentation';
      case 'audio':
        return 'Volume2';
      default:
        return 'File';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'pemula':
        return 'bg-success/10 text-success border-success/20';
      case 'menengah':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'lanjutan':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} menit`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}j ${remainingMinutes}m` : `${hours} jam`;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenMaterial = () => {
    if (onOpenMaterial) {
      onOpenMaterial(material);
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-xl shadow-clinical-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getContentTypeIcon(material.contentType)} size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg text-foreground">Preview Materi</h2>
              <p className="font-caption text-sm text-muted-foreground">{material.contentType}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-6">
            <Image
              src={material.thumbnail}
              alt={material.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-caption border ${getDifficultyColor(material.difficulty)}`}>
                  {material.difficulty}
                </span>
                {material.duration && (
                  <span className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-sm font-caption text-foreground border border-border/50">
                    {formatDuration(material.duration)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Title and Subject */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-caption rounded-full border border-primary/20">
                {material.subject}
              </span>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span className="font-caption">{material.views?.toLocaleString('id-ID') || '0'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="ThumbsUp" size={14} />
                  <span className="font-caption">{material.likes?.toLocaleString('id-ID') || '0'}</span>
                </div>
              </div>
            </div>
            <h1 className="font-heading font-bold text-xl text-foreground mb-2">
              {material.title}
            </h1>
            <p className="font-body text-muted-foreground">
              {material.description}
            </p>
          </div>

          {/* Learning Objectives */}
          {material.learningObjectives && (
            <div className="mb-6">
              <h3 className="font-heading font-semibold text-base text-foreground mb-3 flex items-center">
                <Icon name="Target" size={18} className="mr-2 text-primary" />
                Tujuan Pembelajaran
              </h3>
              <ul className="space-y-2">
                {material.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites */}
          {material.prerequisites && material.prerequisites.length > 0 && (
            <div className="mb-6">
              <h3 className="font-heading font-semibold text-base text-foreground mb-3 flex items-center">
                <Icon name="BookOpen" size={18} className="mr-2 text-warning" />
                Prasyarat
              </h3>
              <div className="flex flex-wrap gap-2">
                {material.prerequisites.map((prerequisite, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-warning/10 text-warning text-sm font-caption rounded-full border border-warning/20"
                  >
                    {prerequisite}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg mb-6">
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-1">Dipublikasikan</p>
              <p className="font-body text-sm text-foreground">{material.publishedDate}</p>
            </div>
            <div>
              <p className="font-caption text-xs text-muted-foreground mb-1">Penulis</p>
              <p className="font-body text-sm text-foreground">{material.author || 'Tim FK UNP'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="default"
              onClick={handleOpenMaterial}
              className="flex-1"
            >
              <Icon name="BookOpen" size={18} className="mr-2" />
              Buka Materi
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;