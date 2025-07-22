import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll, totalResults }) => {
  if (!activeFilters || activeFilters.length === 0) {
    return null;
  }

  const getFilterIcon = (type) => {
    switch (type) {
      case 'subject':
        return 'BookOpen';
      case 'contentType':
        return 'FileText';
      case 'difficulty':
        return 'BarChart3';
      case 'dateRange':
        return 'Calendar';
      default:
        return 'Filter';
    }
  };

  const getFilterLabel = (filter) => {
    const labels = {
      subject: 'Mata Kuliah',
      contentType: 'Jenis Konten',
      difficulty: 'Tingkat Kesulitan',
      dateRange: 'Tanggal'
    };
    return labels[filter.type] || filter.type;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Filter" size={16} />
        <span className="font-caption">Filter aktif:</span>
        {totalResults !== undefined && (
          <span className="font-body font-medium text-foreground">
            {totalResults.toLocaleString('id-ID')} hasil
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20"
          >
            <Icon name={getFilterIcon(filter.type)} size={14} />
            <span className="font-caption text-xs">
              {getFilterLabel(filter)}: {filter.label || filter.value}
            </span>
            <button
              onClick={() => onRemoveFilter(filter)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-clinical"
              aria-label={`Hapus filter ${filter.label || filter.value}`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
        
        {activeFilters.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground px-2 py-1 h-auto"
          >
            <Icon name="X" size={14} className="mr-1" />
            Hapus Semua
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;