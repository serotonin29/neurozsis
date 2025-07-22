import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit, suggestions = [], isLoading = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion.query);
    setShowSuggestions(false);
    onSearchSubmit(suggestion.query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearchSubmit(searchQuery);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" 
          />
          <input
            type="text"
            placeholder="Cari materi, topik, atau ajukan pertanyaan..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={`w-full pl-12 pr-12 py-4 bg-card border-2 rounded-xl font-body text-base transition-clinical focus:outline-none focus:ring-0 ${
              isFocused 
                ? 'border-primary shadow-clinical-lg' 
                : 'border-border hover:border-muted-foreground'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                setShowSuggestions(false);
              }}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-clinical"
            >
              <Icon name="X" size={18} />
            </button>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <Icon name="Loader2" size={18} className="animate-spin" />
            ) : (
              <Icon name="Search" size={18} />
            )}
          </Button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-clinical-lg z-50 max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-caption text-muted-foreground border-b border-border">
                Saran Pencarian
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-3 py-3 text-left hover:bg-muted rounded-lg transition-clinical"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={suggestion.type === 'question' ? 'HelpCircle' : 'Search'} size={16} className="text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-foreground truncate">
                        {suggestion.query}
                      </p>
                      {suggestion.category && (
                        <p className="font-caption text-xs text-muted-foreground">
                          {suggestion.category}
                        </p>
                      )}
                    </div>
                    {suggestion.count && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded">
                        {suggestion.count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;