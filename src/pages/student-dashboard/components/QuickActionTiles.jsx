import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionTiles = () => {
  const quickActions = [
    {
      id: 1,
      title: "Bookmark",
      description: "Materi tersimpan",
      icon: "Bookmark",
      count: 24,
      color: "bg-primary",
      textColor: "text-primary-foreground",
      link: "/material-catalog-search?filter=bookmarked"
    },
    {
      id: 2,
      title: "Forum Diskusi",
      description: "Diskusi aktif",
      icon: "MessageSquare",
      count: 8,
      color: "bg-accent",
      textColor: "text-accent-foreground",
      link: "/discussion-forum"
    },
    {
      id: 3,
      title: "Latihan Kuis",
      description: "Kuis tersedia",
      icon: "Brain",
      count: 12,
      color: "bg-warning",
      textColor: "text-warning-foreground",
      link: "/interactive-quiz-system"
    },
    {
      id: 4,
      title: "Study Timer",
      description: "Mulai sesi belajar",
      icon: "Timer",
      count: null,
      color: "bg-success",
      textColor: "text-success-foreground",
      link: "#",
      action: "timer"
    }
  ];

  const handleTimerClick = () => {
    // Mock timer functionality
    alert("Study Timer akan segera dimulai!\nSesi belajar 25 menit dengan teknik Pomodoro.");
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action) => (
        <div key={action.id}>
          {action.action === 'timer' ? (
            <button
              onClick={handleTimerClick}
              className="w-full bg-card rounded-xl p-4 shadow-clinical hover:shadow-clinical-lg transition-clinical group border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-clinical`}>
                  <Icon name={action.icon} size={20} className={action.textColor} />
                </div>
                {action.count && (
                  <span className="text-lg font-heading font-bold text-foreground">
                    {action.count}
                  </span>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-body font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-clinical">
                  {action.title}
                </h3>
                <p className="text-xs font-caption text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </button>
          ) : (
            <Link
              to={action.link}
              className="block w-full bg-card rounded-xl p-4 shadow-clinical hover:shadow-clinical-lg transition-clinical group border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-clinical`}>
                  <Icon name={action.icon} size={20} className={action.textColor} />
                </div>
                {action.count && (
                  <span className="text-lg font-heading font-bold text-foreground">
                    {action.count}
                  </span>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-body font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-clinical">
                  {action.title}
                </h3>
                <p className="text-xs font-caption text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickActionTiles;