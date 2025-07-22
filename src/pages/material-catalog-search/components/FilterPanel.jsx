import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  className = '' 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    subjects: true,
    contentTypes: true,
    difficulty: true,
    dateRange: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    if (onFilterChange) {
      onFilterChange(category, value, checked);
    }
  };

  const subjects = [
    { value: 'anatomi', label: 'Anatomi', count: 156 },
    { value: 'fisiologi', label: 'Fisiologi', count: 142 },
    { value: 'farmakologi', label: 'Farmakologi', count: 98 },
    { value: 'patologi', label: 'Patologi', count: 87 },
    { value: 'biokimia', label: 'Biokimia', count: 76 },
    { value: 'mikrobiologi', label: 'Mikrobiologi', count: 65 },
    { value: 'histologi', label: 'Histologi', count: 54 },
    { value: 'embriologi', label: 'Embriologi', count: 43 }
  ];

  const contentTypes = [
    { value: 'pdf', label: 'PDF', icon: 'FileText', count: 234 },
    { value: 'video', label: 'Video', icon: 'Play', count: 187 },
    { value: 'infographic', label: 'Infografis', icon: 'Image', count: 156 },
    { value: 'presentation', label: 'Presentasi', icon: 'Presentation', count: 98 },
    { value: 'audio', label: 'Audio', icon: 'Volume2', count: 45 }
  ];

  const difficultyLevels = [
    { value: 'pemula', label: 'Pemula', count: 198, color: 'text-success' },
    { value: 'menengah', label: 'Menengah', count: 267, color: 'text-warning' },
    { value: 'lanjutan', label: 'Lanjutan', count: 156, color: 'text-error' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Hari ini', count: 12 },
    { value: 'week', label: 'Minggu ini', count: 45 },
    { value: 'month', label: 'Bulan ini', count: 123 },
    { value: 'quarter', label: '3 bulan terakhir', count: 298 },
    { value: 'year', label: 'Tahun ini', count: 567 }
  ];

  const FilterSection = ({ title, items, category, icon, expanded, onToggle }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => onToggle(category)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-clinical"
      >
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={16} className="text-muted-foreground" />
          <span className="font-body font-medium text-sm text-foreground">{title}</span>
        </div>
        <Icon 
          name={expanded ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      
      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {items.map((item) => (
            <div key={item.value} className="flex items-center justify-between">
              <Checkbox
                checked={filters[category]?.includes(item.value) || false}
                onChange={(e) => handleFilterChange(category, item.value, e.target.checked)}
                label={
                  <div className="flex items-center space-x-2">
                    {item.icon && <Icon name={item.icon} size={14} className="text-muted-foreground" />}
                    <span className={`font-body text-sm ${item.color || 'text-foreground'}`}>
                      {item.label}
                    </span>
                  </div>
                }
                size="sm"
              />
              <span className="font-caption text-xs text-muted-foreground">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const activeFiltersCount = Object.values(filters).reduce((total, filterArray) => {
    return total + (Array.isArray(filterArray) ? filterArray.length : 0);
  }, 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-full
        bg-card border-r lg:border-r-0 lg:border border-border
        transition-transform duration-300 ease-in-out z-50 lg:z-auto
        overflow-y-auto lg:rounded-xl
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-foreground" />
            <h2 className="font-heading font-semibold text-lg text-foreground">Filter</h2>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-caption rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-foreground" />
            <h3 className="font-heading font-semibold text-base text-foreground">Filter Materi</h3>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-caption rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset
            </Button>
          )}
        </div>

        {/* Filter Sections */}
        <div className="flex-1">
          <FilterSection
            title="Mata Kuliah"
            items={subjects}
            category="subjects"
            icon="BookOpen"
            expanded={expandedSections.subjects}
            onToggle={() => toggleSection('subjects')}
          />
          
          <FilterSection
            title="Jenis Konten"
            items={contentTypes}
            category="contentTypes"
            icon="FileText"
            expanded={expandedSections.contentTypes}
            onToggle={() => toggleSection('contentTypes')}
          />
          
          <FilterSection
            title="Tingkat Kesulitan"
            items={difficultyLevels}
            category="difficulty"
            icon="BarChart3"
            expanded={expandedSections.difficulty}
            onToggle={() => toggleSection('difficulty')}
          />
          
          <FilterSection
            title="Tanggal Publikasi"
            items={dateRanges}
            category="dateRange"
            icon="Calendar"
            expanded={expandedSections.dateRange}
            onToggle={() => toggleSection('dateRange')}
          />
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden p-4 border-t border-border bg-card">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex-1"
              disabled={activeFiltersCount === 0}
            >
              Reset Filter
            </Button>
            <Button
              variant="default"
              onClick={onClose}
              className="flex-1"
            >
              Terapkan Filter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;