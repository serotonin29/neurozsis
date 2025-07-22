import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MaterialCard = ({ material, onBookmark, onPreview }) => {
  const [isBookmarked, setIsBookmarked] = useState(material.isBookmarked || false);
  const [imageError, setImageError] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    if (onBookmark) {
      onBookmark(material.id, !isBookmarked);
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPreview) {
      onPreview(material);
    }
  };

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

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-clinical-lg transition-clinical">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {!imageError ? (
          <Image
            src={material.thumbnail}
            alt={material.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-clinical"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Icon name={getContentTypeIcon(material.contentType)} size={32} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Content Type Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-lg border border-border/50">
          <Icon name={getContentTypeIcon(material.contentType)} size={14} className="text-muted-foreground" />
          <span className="font-caption text-xs text-foreground">{material.contentType}</span>
        </div>

        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmark}
          className="absolute top-3 right-3 w-8 h-8 bg-card/90 backdrop-blur-sm hover:bg-card border border-border/50"
        >
          <Icon 
            name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
            size={16} 
            className={isBookmarked ? 'text-primary fill-current' : 'text-muted-foreground'} 
          />
        </Button>

        {/* Duration */}
        {material.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded text-xs font-caption text-foreground border border-border/50">
            {formatDuration(material.duration)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Subject Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption rounded border border-primary/20">
            {material.subject}
          </span>
          <span className={`px-2 py-1 text-xs font-caption rounded border ${getDifficultyColor(material.difficulty)}`}>
            {material.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-base text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-clinical">
          {material.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
          {material.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span className="font-caption">{material.views?.toLocaleString('id-ID') || '0'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ThumbsUp" size={12} />
              <span className="font-caption">{material.likes?.toLocaleString('id-ID') || '0'}</span>
            </div>
          </div>
          <span className="font-caption">{material.publishedDate}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Link
            to={`/material-viewer?id=${material.id}`}
            className="flex-1"
          >
            <Button variant="default" size="sm" className="w-full">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Baca Materi
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="px-3"
          >
            <Icon name="Eye" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;