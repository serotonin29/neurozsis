import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterChange, activeFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const searchRef = useRef(null);
  const filtersRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    { id: 1, text: 'anatomi jantung', type: 'keyword', category: 'Anatomy' },
    { id: 2, text: 'sistem respirasi', type: 'keyword', category: 'Physiology' },
    { id: 3, text: 'farmakologi dasar', type: 'keyword', category: 'Pharmacology' },
    { id: 4, text: 'patofisiologi', type: 'keyword', category: 'General' },
    { id: 5, text: 'Bagaimana cara kerja insulin?', type: 'question', category: 'Physiology' },
    { id: 6, text: 'Apa itu aritmia?', type: 'question', category: 'Anatomy' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(item =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    onSearch(suggestion.text);
    setIsSearchFocused(false);
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearFilters = () => {
    onFilterChange('clear', null);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Cari diskusi, pertanyaan, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-10 pr-12 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-clinical font-body text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-clinical"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Icon name="Search" size={16} />
            </Button>
          </div>
        </form>

        {/* Search Suggestions */}
        {isSearchFocused && searchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-clinical-lg z-1050 max-h-80 overflow-y-auto">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-muted transition-clinical border-b border-border last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={suggestion.type === 'question' ? 'HelpCircle' : 'Hash'} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">
                        {suggestion.text}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground">
                        {suggestion.category}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-caption rounded">
                    {suggestion.type === 'question' ? 'Pertanyaan' : 'Kata Kunci'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative" ref={filtersRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Filter"
              iconPosition="left"
            >
              Filter
              {getActiveFilterCount() > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-clinical-lg z-1050">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-sm text-foreground">
                      Filter Diskusi
                    </h3>
                    {getActiveFilterCount() > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs"
                      >
                        Hapus Semua
                      </Button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block font-body font-medium text-xs text-foreground mb-2">
                      Kategori
                    </label>
                    <div className="space-y-2">
                      {['Anatomy', 'Physiology', 'Pharmacology', 'General'].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={activeFilters.categories?.includes(category) || false}
                            onChange={(e) => {
                              const currentCategories = activeFilters.categories || [];
                              const newCategories = e.target.checked
                                ? [...currentCategories, category]
                                : currentCategories.filter(c => c !== category);
                              handleFilterChange('categories', newCategories);
                            }}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                          />
                          <span className="font-caption text-sm text-foreground">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="block font-body font-medium text-xs text-foreground mb-2">
                      Waktu
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'today', label: 'Hari ini' },
                        { value: 'week', label: 'Minggu ini' },
                        { value: 'month', label: 'Bulan ini' },
                        { value: 'all', label: 'Semua waktu' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="dateRange"
                            value={option.value}
                            checked={activeFilters.dateRange === option.value}
                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                            className="w-4 h-4 text-primary border-border focus:ring-primary"
                          />
                          <span className="font-caption text-sm text-foreground">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block font-body font-medium text-xs text-foreground mb-2">
                      Status
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'unanswered', label: 'Belum terjawab' },
                        { value: 'solved', label: 'Terpecahkan' },
                        { value: 'pinned', label: 'Dipinkan' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={activeFilters.status?.includes(option.value) || false}
                            onChange={(e) => {
                              const currentStatus = activeFilters.status || [];
                              const newStatus = e.target.checked
                                ? [...currentStatus, option.value]
                                : currentStatus.filter(s => s !== option.value);
                              handleFilterChange('status', newStatus);
                            }}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                          />
                          <span className="font-caption text-sm text-foreground">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="SortDesc"
            iconPosition="left"
          >
            Terbaru
          </Button>
        </div>

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="flex items-center space-x-2">
            <span className="font-caption text-xs text-muted-foreground">
              {getActiveFilterCount()} filter aktif
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Hapus
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;