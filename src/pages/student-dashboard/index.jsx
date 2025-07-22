import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import WelcomeBanner from './components/WelcomeBanner';
import ContinueLearningSection from './components/ContinueLearningSection';
import RecommendedSection from './components/RecommendedSection';
import QuickActionTiles from './components/QuickActionTiles';
import StatisticsCards from './components/StatisticsCards';
import StudyGroupsSection from './components/StudyGroupsSection';
import RecentActivitySection from './components/RecentActivitySection';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock user data
    const mockUser = {
      id: 1,
      name: "Andi Pratama",
      email: "andi.pratama@student.unp.ac.id",
      studentId: "2024001",
      role: "Mahasiswa",
      semester: 4,
      progress: 73,
      avatar: null
    };

    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        title: "Kuis Baru Tersedia",
        message: "Kuis Neuroanatomi telah dibuka untuk Blok 4",
        time: "5 menit yang lalu",
        read: false,
        type: "quiz"
      },
      {
        id: 2,
        title: "Deadline Tugas",
        message: "Tugas Farmakologi jatuh tempo besok",
        time: "2 jam yang lalu",
        read: false,
        type: "assignment"
      },
      {
        id: 3,
        title: "Materi Baru",
        message: "Materi Patofisiologi Sistem Saraf telah ditambahkan",
        time: "1 hari yang lalu",
        read: true,
        type: "material"
      },
      {
        id: 4,
        title: "Forum Diskusi",
        message: "Dr. Sari membalas pertanyaan Anda",
        time: "2 hari yang lalu",
        read: true,
        type: "forum"
      }
    ];

    setUser(mockUser);
    setNotifications(mockNotifications);
  }, []);

  const handleLogout = () => {
    // Mock logout functionality
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('user');
      window.location.href = '/login-registration';
    }
  };

  const handleNotificationClick = (notification) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    // Navigate based on notification type
    switch (notification.type) {
      case 'quiz':
        window.location.href = '/interactive-quiz-system';
        break;
      case 'assignment':
        window.location.href = '/material-catalog-search';
        break;
      case 'material':
        window.location.href = '/material-catalog-search';
        break;
      case 'forum':
        window.location.href = '/discussion-forum';
        break;
      default:
        break;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-body">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        user={user}
        notifications={notifications}
        onLogout={handleLogout}
        onNotificationClick={handleNotificationClick}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-16 lg:pt-32 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Welcome Banner */}
          <div className="mb-8">
            <WelcomeBanner user={user} />
          </div>

          {/* Quick Action Tiles */}
          <div className="mb-8">
            <QuickActionTiles />
          </div>

          {/* Statistics Cards */}
          <div className="mb-8">
            <StatisticsCards />
          </div>

          {/* Continue Learning Section */}
          <div className="mb-8">
            <ContinueLearningSection />
          </div>

          {/* Recommended Section */}
          <div className="mb-8">
            <RecommendedSection />
          </div>

          {/* Bottom Sections - Two Column Layout on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Study Groups Section */}
            <div>
              <StudyGroupsSection />
            </div>

            {/* Recent Activity Section */}
            <div>
              <RecentActivitySection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;