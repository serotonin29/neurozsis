import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ForumCategoryCard from './components/ForumCategoryCard';
import ThreadList from './components/ThreadList';
import ThreadView from './components/ThreadView';
import CreateThreadModal from './components/CreateThreadModal';
import SearchBar from './components/SearchBar';

const DiscussionForum = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('categories'); // categories, threads, thread
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    categories: [],
    dateRange: 'all',
    status: []
  });

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Ahmad Rizki",
    email: "ahmad.rizki@student.unp.ac.id",
    role: "student",
    studentId: "2024001",
    progress: 78,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Balasan Baru",
      message: "Dr. Sarah membalas diskusi Anda tentang Anatomi Jantung",
      time: "5 menit yang lalu",
      read: false
    },
    {
      id: 2,
      title: "Diskusi Dipinkan",
      message: "Diskusi tentang Farmakologi Dasar telah dipinkan",
      time: "1 jam yang lalu",
      read: false
    },
    {
      id: 3,
      title: "Mention Baru",
      message: "Anda disebutkan dalam diskusi Sistem Respirasi",
      time: "2 jam yang lalu",
      read: true
    }
  ];

  // Mock forum categories
  const forumCategories = [
    {
      id: 'anatomy',
      name: 'Anatomy',
      description: 'Diskusi tentang struktur tubuh manusia dan sistem organ',
      totalThreads: 156,
      totalPosts: 892,
      unreadCount: 12,
      recentActivity: {
        author: 'Dr. Sarah Wijaya',
        thread: 'Anatomi Sistem Kardiovaskular',
        time: '15 menit yang lalu'
      }
    },
    {
      id: 'physiology',
      name: 'Physiology',
      description: 'Pembahasan fungsi organ dan sistem tubuh manusia',
      totalThreads: 134,
      totalPosts: 756,
      unreadCount: 8,
      recentActivity: {
        author: 'Ahmad Rizki',
        thread: 'Mekanisme Kontraksi Otot',
        time: '32 menit yang lalu'
      }
    },
    {
      id: 'pharmacology',
      name: 'Pharmacology',
      description: 'Diskusi obat-obatan, dosis, dan interaksi farmakologi',
      totalThreads: 98,
      totalPosts: 543,
      unreadCount: 5,
      recentActivity: {
        author: 'Dr. Budi Santoso',
        thread: 'Farmakologi Antibiotik',
        time: '1 jam yang lalu'
      }
    },
    {
      id: 'general',
      name: 'General',
      description: 'Diskusi umum seputar kedokteran dan pembelajaran',
      totalThreads: 87,
      totalPosts: 421,
      unreadCount: 3,
      recentActivity: {
        author: 'Siti Nurhaliza',
        thread: 'Tips Belajar Efektif',
        time: '2 jam yang lalu'
      }
    }
  ];

  // Mock threads data
  const mockThreads = {
    anatomy: [
      {
        id: 1,
        title: "Bagaimana cara mengingat nama-nama tulang dengan mudah?",
        preview: "Saya kesulitan menghafalkan nama-nama tulang dalam sistem skeletal. Ada tips atau metode khusus yang bisa membantu?",
        author: {
          name: "Ahmad Rizki",
          role: "student"
        },
        createdAt: new Date(Date.now() - 3600000),
        replyCount: 15,
        viewCount: 234,
        isUnread: true,
        status: null,
        tags: ["skeletal", "memorization", "study-tips"],
        lastReply: {
          author: "Dr. Sarah",
          timestamp: new Date(Date.now() - 1800000)
        },
        content: `Halo teman-teman,\n\nSaya sedang belajar tentang sistem skeletal dan merasa kewalahan dengan banyaknya nama tulang yang harus dihafalkan. Khususnya untuk tulang-tulang kecil di tangan dan kaki.\n\nAda yang punya tips atau metode khusus untuk mengingat nama-nama tulang ini? Mungkin ada mnemonik atau cara visualisasi yang efektif?\n\nTerima kasih sebelumnya!`,
        replies: [
          {
            id: 1,
            author: {
              name: "Dr. Sarah Wijaya",
              role: "instructor"
            },
            content: `Halo Ahmad,\n\nUntuk menghafalkan nama tulang, saya sarankan beberapa metode:\n\n1. Gunakan mnemonik - buat kalimat yang mudah diingat\n2. Visualisasi - gambar tulang sambil menyebutkan namanya\n3. Repetisi spaced - ulangi dalam interval waktu tertentu\n4. Gunakan model 3D atau aplikasi anatomi\n\nSemoga membantu!`,
            createdAt: new Date(Date.now() - 1800000),
            likes: 8
          },
          {
            id: 2,
            author: {
              name: "Siti Nurhaliza",
              role: "student"
            },
            content: `Saya juga punya masalah yang sama! Tapi setelah menggunakan aplikasi Complete Anatomy, jadi lebih mudah. Bisa lihat tulang dari berbagai sudut dan ada quiz interaktifnya juga.`,
            createdAt: new Date(Date.now() - 1200000),
            likes: 3
          }
        ]
      },
      {
        id: 2,
        title: "Perbedaan antara tulang rawan hialin dan elastis",
        preview: "Mohon penjelasan detail tentang karakteristik dan lokasi tulang rawan hialin vs elastis dalam tubuh manusia.",
        author: {
          name: "Dr. Sarah Wijaya",
          role: "instructor"
        },
        createdAt: new Date(Date.now() - 7200000),
        replyCount: 8,
        viewCount: 156,
        isUnread: false,
        status: "pinned",
        tags: ["cartilage", "histology"],
        lastReply: {
          author: "Budi Santoso",
          timestamp: new Date(Date.now() - 3600000)
        },
        content: `Selamat pagi mahasiswa,\n\nHari ini kita akan membahas perbedaan mendasar antara tulang rawan hialin dan elastis.\n\nTulang rawan hialin:\n- Paling umum ditemukan\n- Matriks homogen dengan serat kolagen halus\n- Lokasi: ujung tulang panjang, hidung, trakea\n\nTulang rawan elastis:\n- Mengandung serat elastin\n- Lebih fleksibel\n- Lokasi: daun telinga, epiglotis\n\nSilakan diskusikan jika ada pertanyaan!`,
        replies: [
          {
            id: 1,
            author: {
              name: "Ahmad Rizki",
              role: "student"
            },
            content: `Terima kasih Bu Sarah untuk penjelasannya. Apakah ada perbedaan dalam proses regenerasi antara kedua jenis tulang rawan ini?`,
            createdAt: new Date(Date.now() - 5400000),
            likes: 2
          }
        ]
      }
    ],
    physiology: [
      {
        id: 3,
        title: "Mekanisme kontraksi otot jantung vs otot rangka",
        preview: "Bisa dijelaskan perbedaan mekanisme kontraksi antara otot jantung dan otot rangka dari segi molekuler?",
        author: {
          name: "Budi Santoso",
          role: "student"
        },
        createdAt: new Date(Date.now() - 5400000),
        replyCount: 12,
        viewCount: 189,
        isUnread: true,
        status: null,
        tags: ["muscle", "contraction", "cardiac"],
        lastReply: {
          author: "Dr. Ahmad",
          timestamp: new Date(Date.now() - 2700000)
        },
        content: `Halo semuanya,\n\nSaya ingin memahami lebih dalam tentang perbedaan mekanisme kontraksi otot jantung dan otot rangka.\n\nYang saya tahu:\n- Keduanya menggunakan aktin-myosin\n- Otot jantung punya autorhythmicity\n- Otot rangka butuh stimulasi saraf\n\nTapi bagaimana perbedaan detailnya dari segi:\n1. Coupling excitation-contraction\n2. Sumber kalsium\n3. Durasi kontraksi\n\nMohon penjelasannya, terima kasih!`,
        replies: []
      }
    ],
    pharmacology: [
      {
        id: 4,
        title: "Interaksi obat: ACE inhibitor dengan NSAID",
        preview: "Bagaimana mekanisme interaksi antara ACE inhibitor dan NSAID? Apa risiko klinisnya?",
        author: {
          name: "Dr. Budi Santoso",
          role: "instructor"
        },
        createdAt: new Date(Date.now() - 10800000),
        replyCount: 6,
        viewCount: 98,
        isUnread: false,
        status: "solved",
        tags: ["drug-interaction", "ace-inhibitor", "nsaid"],
        lastReply: {
          author: "Siti Nurhaliza",
          timestamp: new Date(Date.now() - 7200000)
        },
        content: `Mahasiswa yang terhormat,\n\nHari ini kita akan membahas interaksi penting antara ACE inhibitor dan NSAID.\n\nMekanisme interaksi:\n1. ACE inhibitor mengurangi produksi angiotensin II\n2. NSAID menghambat COX, mengurangi prostaglandin\n3. Keduanya mempengaruhi fungsi ginjal\n\nRisiko klinis:\n- Penurunan fungsi ginjal\n- Hiperkalemia\n- Penurunan efektivitas antihipertensi\n\nDiskusikan kasus klinis yang pernah Anda temui!`,
        replies: [
          {
            id: 1,
            author: {
              name: "Siti Nurhaliza",
              role: "student"
            },
            content: `Pak Budi, saya pernah melihat pasien dengan kombinasi ini di RS. Kreatininnya naik signifikan. Apakah harus stop kedua obat atau cukup salah satu?`,
            createdAt: new Date(Date.now() - 7200000),
            likes: 1
          }
        ]
      }
    ],
    general: [
      {
        id: 5,
        title: "Tips mengatur waktu belajar selama rotasi klinik",
        preview: "Bagaimana cara efektif mengatur waktu belajar teori sambil menjalani rotasi klinik yang padat?",
        author: {
          name: "Siti Nurhaliza",
          role: "student"
        },
        createdAt: new Date(Date.now() - 14400000),
        replyCount: 20,
        viewCount: 345,
        isUnread: false,
        status: null,
        tags: ["study-tips", "clinical-rotation", "time-management"],
        lastReply: {
          author: "Ahmad Rizki",
          timestamp: new Date(Date.now() - 10800000)
        },
        content: `Halo teman-teman,\n\nSaya sedang menjalani rotasi klinik dan merasa kesulitan mengatur waktu untuk belajar teori. Jadwal di RS sangat padat, pulang sudah capek, tapi masih ada ujian yang harus dipersiapkan.\n\nAda yang punya tips efektif untuk:\n1. Mengatur waktu belajar\n2. Memilih prioritas materi\n3. Tetap fresh meski capek\n4. Menghubungkan teori dengan praktik\n\nShare pengalaman kalian dong!`,
        replies: [
          {
            id: 1,
            author: {
              name: "Ahmad Rizki",
              role: "student"
            },
            content: `Siti, saya juga pernah mengalami hal yang sama. Yang membantu saya:\n\n1. Belajar 30 menit sebelum tidur - review kasus hari itu\n2. Gunakan waktu istirahat di RS untuk baca ringkasan\n3. Buat mind map untuk menghubungkan teori-praktik\n4. Join study group online untuk diskusi cepat\n\nSemangat!`,
            createdAt: new Date(Date.now() - 10800000),
            likes: 5
          }
        ]
      }
    ]
  };

  const handleLogout = () => {
    navigate('/login-registration');
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setExpandedCategory(expandedCategory === category.id ? null : category.id);
    setCurrentView('threads');
  };

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
    setCurrentView('thread');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setExpandedCategory(null);
  };

  const handleBackToThreads = () => {
    setCurrentView('threads');
    setSelectedThread(null);
  };

  const handleCreateThread = (threadData) => {
    console.log('Creating thread:', threadData);
    // Here you would typically send the data to your backend
    setShowCreateModal(false);
    // Optionally refresh the thread list or add the new thread to the state
  };

  const handleReply = (replyContent) => {
    console.log('Adding reply:', replyContent);
    // Here you would typically send the reply to your backend
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // Here you would typically filter threads based on the search query
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setSearchFilters({
        categories: [],
        dateRange: 'all',
        status: []
      });
    } else {
      setSearchFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
    console.log('Filters changed:', filterType, value);
  };

  const getCurrentThreads = () => {
    if (!selectedCategory) return [];
    return mockThreads[selectedCategory.id] || [];
  };

  const getFilteredThreads = () => {
    let threads = getCurrentThreads();
    
    // Apply search query filter
    if (searchQuery) {
      threads = threads.filter(thread =>
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter (if searching across all categories)
    if (searchFilters.categories.length > 0 && !selectedCategory) {
      threads = threads.filter(thread =>
        searchFilters.categories.includes(thread.category)
      );
    }
    
    // Apply status filter
    if (searchFilters.status.length > 0) {
      threads = threads.filter(thread =>
        searchFilters.status.includes(thread.status) ||
        (searchFilters.status.includes('unanswered') && thread.replyCount === 0)
      );
    }
    
    return threads;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={currentUser}
        notifications={notifications}
        onLogout={handleLogout}
        onNotificationClick={handleNotificationClick}
      />
      
      <Navigation />
      
      <main className="pt-32 lg:pt-28 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                  Forum Diskusi
                </h1>
                <p className="font-body text-muted-foreground">
                  Bergabunglah dalam diskusi akademik dengan sesama mahasiswa dan dosen
                </p>
              </div>
              
              <Button
                variant="default"
                onClick={() => setShowCreateModal(true)}
                iconName="Plus"
                iconPosition="left"
                className="hidden lg:flex"
              >
                Buat Diskusi
              </Button>
            </div>
            
            {/* Mobile Create Button */}
            <div className="lg:hidden">
              <Button
                variant="default"
                onClick={() => setShowCreateModal(true)}
                iconName="Plus"
                iconPosition="left"
                fullWidth
              >
                Buat Diskusi Baru
              </Button>
            </div>
          </div>

          {/* Search Bar - Show when in threads view or searching */}
          {(currentView === 'threads' || searchQuery) && (
            <div className="mb-6">
              <SearchBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                activeFilters={searchFilters}
              />
            </div>
          )}

          {/* Content Area */}
          <div className="space-y-6">
            {currentView === 'categories' && (
              <>
                {/* Forum Statistics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name="MessageSquare" size={20} className="text-primary" />
                    </div>
                    <p className="font-heading font-bold text-lg text-foreground">475</p>
                    <p className="font-caption text-xs text-muted-foreground">Total Diskusi</p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name="Users" size={20} className="text-success" />
                    </div>
                    <p className="font-heading font-bold text-lg text-foreground">1,247</p>
                    <p className="font-caption text-xs text-muted-foreground">Anggota Aktif</p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name="Clock" size={20} className="text-warning" />
                    </div>
                    <p className="font-heading font-bold text-lg text-foreground">28</p>
                    <p className="font-caption text-xs text-muted-foreground">Belum Terjawab</p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name="TrendingUp" size={20} className="text-accent" />
                    </div>
                    <p className="font-heading font-bold text-lg text-foreground">156</p>
                    <p className="font-caption text-xs text-muted-foreground">Diskusi Minggu Ini</p>
                  </div>
                </div>

                {/* Forum Categories */}
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-lg text-foreground">
                    Kategori Forum
                  </h2>
                  
                  <div className="grid gap-4">
                    {forumCategories.map((category) => (
                      <ForumCategoryCard
                        key={category.id}
                        category={category}
                        onClick={() => handleCategoryClick(category)}
                        isExpanded={expandedCategory === category.id}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      Aktivitas Terbaru
                    </h3>
                    <Button variant="ghost" size="sm" iconName="RefreshCw">
                      Refresh
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: 'reply',
                        user: 'Dr. Sarah Wijaya',
                        action: 'membalas diskusi',
                        target: 'Anatomi Sistem Kardiovaskular',
                        time: '5 menit yang lalu',
                        category: 'Anatomy'
                      },
                      {
                        id: 2,
                        type: 'thread',
                        user: 'Ahmad Rizki',
                        action: 'membuat diskusi baru',
                        target: 'Tips Mengingat Nama Tulang',
                        time: '15 menit yang lalu',
                        category: 'Anatomy'
                      },
                      {
                        id: 3,
                        type: 'solve',
                        user: 'Dr. Budi Santoso',
                        action: 'menandai sebagai terpecahkan',
                        target: 'Interaksi ACE Inhibitor dengan NSAID',
                        time: '32 menit yang lalu',
                        category: 'Pharmacology'
                      }
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-clinical">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-foreground font-heading font-medium text-xs">
                            {activity.user.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-foreground">
                            <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-caption">
                              {activity.category}
                            </span>
                            <span className="font-caption text-xs text-muted-foreground">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentView === 'threads' && selectedCategory && (
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      onClick={handleBackToCategories}
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      Kembali
                    </Button>
                    <div>
                      <h2 className="font-heading font-bold text-xl text-foreground">
                        {selectedCategory.name}
                      </h2>
                      <p className="font-caption text-sm text-muted-foreground">
                        {selectedCategory.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex items-center space-x-2">
                    <span className="font-caption text-sm text-muted-foreground">
                      {selectedCategory.totalThreads} diskusi
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCreateModal(true)}
                      iconName="Plus"
                    >
                      Buat Diskusi
                    </Button>
                  </div>
                </div>

                {/* Thread List */}
                <ThreadList
                  threads={getFilteredThreads()}
                  onThreadClick={handleThreadClick}
                />

                {getFilteredThreads().length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Belum Ada Diskusi
                    </h3>
                    <p className="font-body text-muted-foreground mb-4">
                      Jadilah yang pertama memulai diskusi di kategori ini
                    </p>
                    <Button
                      variant="default"
                      onClick={() => setShowCreateModal(true)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Buat Diskusi Pertama
                    </Button>
                  </div>
                )}
              </div>
            )}

            {currentView === 'thread' && selectedThread && (
              <ThreadView
                thread={selectedThread}
                onBack={handleBackToThreads}
                onReply={handleReply}
              />
            )}
          </div>
        </div>
      </main>

      {/* Create Thread Modal */}
      <CreateThreadModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateThread}
        categories={forumCategories}
      />

      {/* Mobile FAB for Create Thread */}
      <div className="lg:hidden fixed bottom-20 right-4 z-1000">
        <Button
          variant="default"
          size="icon"
          onClick={() => setShowCreateModal(true)}
          className="w-14 h-14 rounded-full shadow-clinical-lg"
          iconName="Plus"
        />
      </div>
    </div>
  );
};

export default DiscussionForum;