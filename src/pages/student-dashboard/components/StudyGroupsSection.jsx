import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StudyGroupsSection = () => {
  const studyGroups = [
    {
      id: 1,
      name: "Neuroanatomi Intensif",
      topic: "Sistem Saraf Pusat",
      members: 8,
      maxMembers: 12,
      status: "active",
      nextSession: "Hari ini, 14:00",
      leader: "Sarah Putri",
      leaderAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      progress: 75,
      description: "Fokus pada struktur dan fungsi otak"
    },
    {
      id: 2,
      name: "Farmakologi Klinik",
      topic: "Obat-obatan Neurologis",
      members: 6,
      maxMembers: 10,
      status: "scheduled",
      nextSession: "Besok, 16:30",
      leader: "Ahmad Rizki",
      leaderAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      progress: 45,
      description: "Diskusi kasus klinis dan terapi"
    },
    {
      id: 3,
      name: "Patofisiologi",
      topic: "Gangguan Neurologis",
      members: 10,
      maxMembers: 15,
      status: "full",
      nextSession: "Rabu, 13:00",
      leader: "Dina Maharani",
      leaderAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      progress: 60,
      description: "Mekanisme penyakit sistem saraf"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'scheduled': return 'bg-warning/10 text-warning border-warning/20';
      case 'full': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Sedang Berlangsung';
      case 'scheduled': return 'Terjadwal';
      case 'full': return 'Penuh';
      default: return 'Tidak Aktif';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-clinical">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Grup Belajar
          </h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Sesi kolaboratif dengan sesama mahasiswa
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
        {studyGroups.map((group) => (
          <div key={group.id} className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:shadow-clinical transition-clinical">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-body font-semibold text-sm text-foreground">
                    {group.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium border ${getStatusColor(group.status)}`}>
                    {getStatusText(group.status)}
                  </span>
                </div>
                <p className="text-xs font-caption text-muted-foreground mb-1">
                  {group.topic}
                </p>
                <p className="text-xs font-caption text-muted-foreground">
                  {group.description}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="text-xs font-caption text-foreground">
                    {group.members}/{group.maxMembers}
                  </span>
                </div>
                <div className="w-16 bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-clinical" 
                    style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Image
                    src={group.leaderAvatar}
                    alt={group.leader}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-xs font-caption font-medium text-foreground">
                      {group.leader}
                    </p>
                    <p className="text-xs font-caption text-muted-foreground">
                      Ketua Grup
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon name="Calendar" size={12} className="text-primary" />
                    <span className="text-xs font-caption text-foreground">
                      {group.nextSession}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-caption text-muted-foreground">
                      Progress: {group.progress}%
                    </span>
                  </div>
                </div>
                
                <Link
                  to="/discussion-forum"
                  className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-caption font-medium hover:bg-primary/90 transition-clinical"
                >
                  Gabung
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Link
          to="/discussion-forum"
          className="flex items-center justify-center space-x-2 bg-muted/50 hover:bg-muted rounded-lg py-3 transition-clinical group"
        >
          <Icon name="Plus" size={16} className="text-primary group-hover:scale-110 transition-clinical" />
          <span className="font-body font-medium text-sm text-foreground">
            Buat Grup Belajar Baru
          </span>
        </Link>
      </div>
    </div>
  );
};

export default StudyGroupsSection;