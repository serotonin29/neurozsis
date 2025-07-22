import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivitySection = () => {
  const activities = [
    {
      id: 1,
      type: "material_completed",
      title: "Menyelesaikan materi",
      content: "Anatomi Sistem Saraf Pusat",
      user: "Anda",
      userAvatar: null,
      timestamp: "2 jam yang lalu",
      icon: "CheckCircle",
      iconColor: "text-success",
      link: "/material-viewer"
    },
    {
      id: 2,
      type: "forum_reply",
      title: "Membalas diskusi",
      content: "Perbedaan neuron motorik dan sensorik",
      user: "Dr. Sari Indrawati",
      userAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
      timestamp: "4 jam yang lalu",
      icon: "MessageSquare",
      iconColor: "text-primary",
      link: "/discussion-forum"
    },
    {
      id: 3,
      type: "quiz_completed",
      title: "Menyelesaikan kuis",
      content: "Neurofisiologi Dasar - Skor: 88%",
      user: "Anda",
      userAvatar: null,
      timestamp: "1 hari yang lalu",
      icon: "Brain",
      iconColor: "text-warning",
      link: "/interactive-quiz-system"
    },
    {
      id: 4,
      type: "material_bookmarked",
      title: "Menyimpan bookmark",
      content: "Farmakologi Sistem Saraf",
      user: "Anda",
      userAvatar: null,
      timestamp: "1 hari yang lalu",
      icon: "Bookmark",
      iconColor: "text-accent",
      link: "/material-catalog-search"
    },
    {
      id: 5,
      type: "forum_post",
      title: "Membuat diskusi baru",
      content: "Bagaimana cara mengingat nama-nama saraf kranial?",
      user: "Ahmad Rizki",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      timestamp: "2 hari yang lalu",
      icon: "Plus",
      iconColor: "text-primary",
      link: "/discussion-forum"
    },
    {
      id: 6,
      type: "study_session",
      title: "Sesi belajar selesai",
      content: "45 menit - Fokus: Patofisiologi",
      user: "Anda",
      userAvatar: null,
      timestamp: "2 hari yang lalu",
      icon: "Timer",
      iconColor: "text-success",
      link: "#"
    }
  ];

  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'material_completed':
        return `${activity.user} telah menyelesaikan materi "${activity.content}"`;
      case 'forum_reply':
        return `${activity.user} membalas diskusi tentang "${activity.content}"`;
      case 'quiz_completed':
        return `${activity.user} menyelesaikan "${activity.content}"`;
      case 'material_bookmarked':
        return `${activity.user} menyimpan bookmark "${activity.content}"`;
      case 'forum_post':
        return `${activity.user} membuat diskusi: "${activity.content}"`;
      case 'study_session':
        return `${activity.user} menyelesaikan sesi belajar "${activity.content}"`;
      default:
        return activity.content;
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-clinical">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Aktivitas Terbaru
          </h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Update terbaru dari forum dan pembelajaran
          </p>
        </div>
        <Link 
          to="/discussion-forum"
          className="text-primary hover:text-primary/80 font-body font-medium text-sm transition-clinical"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3 group">
            <div className="flex-shrink-0">
              {activity.userAvatar ? (
                <Image
                  src={activity.userAvatar}
                  alt={activity.user}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-medium text-xs">
                    {activity.user === 'Anda' ? 'A' : activity.user.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={activity.icon} size={14} className={activity.iconColor} />
                    <span className="font-body font-medium text-sm text-foreground">
                      {activity.title}
                    </span>
                  </div>
                  <p className="text-sm font-body text-muted-foreground mb-1">
                    {getActivityDescription(activity)}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
                
                {activity.link !== '#' && (
                  <Link
                    to={activity.link}
                    className="opacity-0 group-hover:opacity-100 transition-clinical ml-2"
                  >
                    <Icon name="ArrowRight" size={14} className="text-muted-foreground hover:text-primary transition-clinical" />
                  </Link>
                )}
              </div>
            </div>
            
            {index < activities.length - 1 && (
              <div className="absolute left-7 mt-10 w-px h-6 bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span className="text-xs font-caption">
            Terakhir diperbarui: Hari ini, 11:21 WIB
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivitySection;