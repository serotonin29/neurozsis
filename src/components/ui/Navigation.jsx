import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Navigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Beranda',
      path: '/student-dashboard',
      icon: 'Home',
      tooltip: 'Dashboard utama dengan ringkasan progress dan aktivitas terbaru'
    },
    {
      label: 'Materi',
      path: '/material-catalog-search',
      icon: 'BookOpen',
      tooltip: 'Jelajahi dan akses materi pembelajaran medis'
    },
    {
      label: 'Kuis',
      path: '/interactive-quiz-system',
      icon: 'Brain',
      tooltip: 'Uji pemahaman dengan kuis interaktif dan latihan soal'
    },
    {
      label: 'Forum',
      path: '/discussion-forum',
      icon: 'MessageSquare',
      tooltip: 'Diskusi dengan sesama mahasiswa dan dosen'
    }
  ];

  const isActive = (path) => {
    if (path === '/student-dashboard') {
      return location.pathname === path;
    }
    if (path === '/material-catalog-search') {
      return location.pathname === path || location.pathname === '/material-viewer';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className={`hidden lg:block fixed top-16 left-0 right-0 z-1000 bg-card border-b border-border ${className}`}>
        <div className="px-6">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center space-x-2 py-4 px-2 transition-clinical ${
                    active
                      ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                  title={item.tooltip}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`transition-clinical ${
                      active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  <span className="font-body font-medium text-sm">{item.label}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-clinical-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-clinical z-1050 w-64">
                    <p className="font-caption text-xs text-popover-foreground text-center">
                      {item.tooltip}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-1000 bg-card border-t border-border safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-clinical min-w-0 flex-1 ${
                  active
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`transition-clinical ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span className={`font-caption text-xs font-medium truncate ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {active && (
                  <div className="w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;