import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevansi', icon: 'Target' },
    { value: 'newest', label: 'Terbaru', icon: 'Clock' },
    { value: 'oldest', label: 'Terlama', icon: 'History' },
    { value: 'popular', label: 'Terpopuler', icon: 'TrendingUp' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpAZ' },
    { value: 'rating', label: 'Rating Tertinggi', icon: 'Star' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Urutkan';
  };

  const getCurrentSortIcon = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.icon : 'ArrowUpDown';
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-0"
      >
        <Icon name={getCurrentSortIcon()} size={16} className="text-muted-foreground" />
        <span className="font-body text-sm text-foreground hidden sm:inline">
          {getCurrentSortLabel()}
        </span>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground" 
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-clinical-lg z-50 animate-slide-up">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-caption text-muted-foreground border-b border-border mb-2">
              Urutkan berdasarkan
            </div>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-clinical text-left ${
                  currentSort === option.value
                    ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={currentSort === option.value ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className="font-body text-sm flex-1">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;