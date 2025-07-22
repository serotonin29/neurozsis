import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user, notifications = [], onLogout, onNotificationClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Mock search suggestions
  const mockSuggestions = [
    { id: 1, title: 'Anatomi Jantung', type: 'Materi', category: 'Kardiologi' },
    { id: 2, title: 'Sistem Respirasi', type: 'Materi', category: 'Pulmonologi' },
    { id: 3, title: 'Farmakologi Dasar', type: 'Kuis', category: 'Farmasi' },
    { id: 4, title: 'Patofisiologi', type: 'Diskusi', category: 'Patologi' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to material catalog with search query
      window.location.href = `/material-catalog-search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setIsSearchFocused(false);
    // Navigate based on suggestion type
    if (suggestion.type === 'Materi') {
      window.location.href = `/material-catalog-search?q=${encodeURIComponent(suggestion.title)}`;
    } else if (suggestion.type === 'Kuis') {
      window.location.href = '/interactive-quiz-system';
    } else if (suggestion.type === 'Diskusi') {
      window.location.href = '/discussion-forum';
    }
  };

  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    setIsNotificationOpen(false);
  };

  const isSearchPage = location.pathname === '/material-catalog-search';

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border shadow-clinical">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/student-dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-clinical">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-semibold text-lg text-foreground">NeuroZsis</h1>
              <p className="text-xs text-muted-foreground font-caption">FK UNP Medical Learning</p>
            </div>
          </Link>
        </div>

        {/* Search Section - Only show on material pages */}
        {(isSearchPage || location.pathname === '/material-viewer') && (
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Cari materi, topik, atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-clinical font-body text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-clinical"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>

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
                        <div>
                          <p className="font-body font-medium text-sm text-foreground">{suggestion.title}</p>
                          <p className="font-caption text-xs text-muted-foreground">{suggestion.category}</p>
                        </div>
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-caption rounded">
                          {suggestion.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-caption font-medium rounded-full flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-clinical-lg z-1050 animate-slide-up">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-sm text-foreground">Notifikasi</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className="w-full p-4 text-left hover:bg-muted transition-clinical border-b border-border last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-muted-foreground' : 'bg-primary'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-body font-medium text-sm text-foreground truncate">
                              {notification.title}
                            </p>
                            <p className="font-caption text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="font-caption text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
                      <p className="font-body text-sm text-muted-foreground">Tidak ada notifikasi</p>
                    </div>
                  )}
                </div>
                {notifications.length > 5 && (
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      Lihat Semua Notifikasi
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-medium text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="font-body font-medium text-sm text-foreground">
                  {user?.name || 'User'}
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  {user?.role || 'Mahasiswa'}
                </p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-clinical-lg z-1050 animate-slide-up">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-heading font-semibold text-lg">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm text-foreground">
                        {user?.name || 'User Name'}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground">
                        {user?.email || 'user@example.com'}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground">
                        {user?.studentId || 'ID: 2024001'}
                      </p>
                    </div>
                  </div>
                  {user?.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-caption text-xs text-muted-foreground">Progress Belajar</span>
                        <span className="font-caption text-xs font-medium text-foreground">{user.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full transition-clinical" 
                          style={{ width: `${user.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="User" size={16} className="mr-2" />
                    Profil Saya
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Pengaturan
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    Riwayat Belajar
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Bantuan
                  </Button>
                </div>
                
                <div className="p-2 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-error hover:text-error hover:bg-error/10"
                    onClick={onLogout}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Keluar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;