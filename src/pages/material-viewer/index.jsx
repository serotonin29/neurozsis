import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContentViewer from './components/ContentViewer';
import BottomToolbar from './components/BottomToolbar';
import SidePanel from './components/SidePanel';
import StudyTimer from './components/StudyTimer';

const MaterialViewer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const materialId = searchParams.get('id') || '1';
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [notes, setNotes] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  // Mock user data
  const user = {
    id: 1,
    name: "Ahmad Rizki",
    email: "ahmad.rizki@student.unp.ac.id",
    studentId: "2024001",
    role: "Mahasiswa",
    progress: 78
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Kuis Baru Tersedia",
      message: "Kuis Anatomi Sistem Saraf telah dibuka",
      time: "2 jam lalu",
      read: false
    },
    {
      id: 2,
      title: "Diskusi Baru",
      message: "Dr. Sarah membalas pertanyaan Anda",
      time: "5 jam lalu",
      read: false
    }
  ];

  // Mock material data
  const material = {
    id: materialId,
    title: "Anatomi dan Fisiologi Sistem Saraf Pusat",
    type: searchParams.get('type') || 'pdf',
    category: "Neurologi",
    difficulty: "Menengah",
    duration: "45 menit",
    totalPages: 24,
    author: "Dr. Sarah Wijaya, Sp.N",
    description: `Materi komprehensif tentang struktur dan fungsi sistem saraf pusat, mencakup anatomi otak, sumsum tulang belakang, dan mekanisme transmisi sinaptik. Dilengkapi dengan ilustrasi medis dan studi kasus klinis.`,
    tags: ["Anatomi", "Fisiologi", "Neurologi", "Sistem Saraf"],
    lastAccessed: new Date(Date.now() - 86400000),
    bookmarked: false
  };

  // Mock related materials
  const relatedMaterials = [
    {
      id: 2,
      title: "Patofisiologi Gangguan Neurologis",
      type: "video",
      category: "Neurologi",
      duration: "32 menit",
      difficulty: "Lanjut"
    },
    {
      id: 3,
      title: "Atlas Anatomi Otak",
      type: "interactive",
      category: "Anatomi",
      duration: "20 menit",
      difficulty: "Dasar"
    },
    {
      id: 4,
      title: "Farmakologi Sistem Saraf",
      type: "pdf",
      category: "Farmakologi",
      duration: "38 menit",
      difficulty: "Menengah"
    }
  ];

  // Mock discussions
  const discussions = [
    {
      id: 1,
      author: "Maria Santos",
      content: "Apakah ada perbedaan signifikan antara neuron motorik dan sensorik dalam hal struktur dendrit?",
      time: "2 jam lalu",
      likes: 5,
      replies: 3
    },
    {
      id: 2,
      author: "Dr. Ahmad Fauzi",
      content: "Materi ini sangat membantu untuk memahami konsep dasar transmisi sinaptik. Saya rekomendasikan untuk dibaca bersamaan dengan buku Harrison.",
      time: "1 hari lalu",
      likes: 12,
      replies: 7
    }
  ];

  // Mock initial notes
  const initialNotes = [
    {
      id: 1,
      content: "Korteks serebral terdiri dari 6 lapisan dengan fungsi yang berbeda-beda. Lapisan IV adalah lapisan input utama dari talamus.",
      timestamp: new Date(Date.now() - 3600000),
      materialId: materialId,
      page: 5
    },
    {
      id: 2,
      content: "Penting: Neurotransmitter utama di SSP adalah glutamat (eksitatori) dan GABA (inhibitori). Rasio keduanya menentukan aktivitas neural.",
      timestamp: new Date(Date.now() - 7200000),
      materialId: materialId,
      page: 12
    }
  ];

  useEffect(() => {
    setNotes(initialNotes);
    setIsBookmarked(material.bookmarked);
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode class
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [materialId]);

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // In real app, this would sync with backend
  };

  const handleNoteAdd = (note) => {
    setNotes(prev => [note, ...prev]);
  };

  const handleNoteEdit = (noteId, content) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, content, timestamp: new Date() } : note
    ));
  };

  const handleNoteDelete = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleProgressUpdate = (newProgress) => {
    setProgress(newProgress);
  };

  const handleShare = (platform) => {
    console.log(`Sharing to ${platform}`);
  };

  const handleDownload = () => {
    console.log('Downloading material for offline access');
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const breadcrumbs = [
    { label: 'Beranda', path: '/student-dashboard' },
    { label: 'Materi', path: '/material-catalog-search' },
    { label: material.category, path: `/material-catalog-search?category=${material.category}` },
    { label: material.title, path: '#', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user}
        notifications={notifications}
        onLogout={() => navigate('/login-registration')}
      />
      
      <Navigation />

      <main className="pt-32 lg:pt-28 pb-20 lg:pb-0">
        <div className="flex h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">
          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col ${isSidePanelOpen ? 'lg:mr-80' : ''} transition-clinical`}>
            {/* Header Bar */}
            <div className="bg-card border-b border-border px-4 lg:px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                      )}
                      {crumb.current ? (
                        <span className="font-body font-medium text-foreground truncate max-w-48">
                          {crumb.label}
                        </span>
                      ) : (
                        <Link
                          to={crumb.path}
                          className="font-body text-muted-foreground hover:text-foreground transition-clinical"
                        >
                          {crumb.label}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </nav>

                {/* Header Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTimer(!showTimer)}
                    className="hidden lg:flex"
                  >
                    <Icon name="Timer" size={20} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDarkModeToggle}
                  >
                    <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFullscreenToggle}
                    className="hidden lg:flex"
                  >
                    <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={20} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                  >
                    <Icon name="PanelRight" size={20} />
                  </Button>
                </div>
              </div>

              {/* Material Info */}
              <div className="mt-3 flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="font-heading font-bold text-lg text-foreground truncate">
                    {material.title}
                  </h1>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="font-caption text-xs text-muted-foreground">
                      {material.author}
                    </span>
                    <span className="font-caption text-xs text-muted-foreground">
                      {material.duration}
                    </span>
                    <span className="font-caption text-xs text-muted-foreground">
                      {material.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} className="text-muted-foreground" />
                    <span className="font-caption text-xs text-muted-foreground">1.2k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} className="text-muted-foreground" />
                    <span className="font-caption text-xs text-muted-foreground">89</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Viewer */}
            <div className="flex-1 overflow-hidden">
              <ContentViewer
                material={material}
                onBookmarkToggle={handleBookmarkToggle}
                onNoteAdd={handleNoteAdd}
                onProgressUpdate={handleProgressUpdate}
              />
            </div>
          </div>

          {/* Study Timer (Desktop) */}
          {showTimer && (
            <div className="hidden lg:block fixed top-32 right-4 w-64 z-1030">
              <StudyTimer
                onTimeUpdate={setStudyTime}
                isActive={true}
              />
            </div>
          )}

          {/* Side Panel */}
          <SidePanel
            isOpen={isSidePanelOpen}
            onClose={() => setIsSidePanelOpen(false)}
            material={material}
            notes={notes}
            onNoteAdd={handleNoteAdd}
            onNoteEdit={handleNoteEdit}
            onNoteDelete={handleNoteDelete}
            relatedMaterials={relatedMaterials}
            discussions={discussions}
          />
        </div>

        {/* Bottom Toolbar */}
        <BottomToolbar
          material={material}
          isBookmarked={isBookmarked}
          progress={progress}
          studyTime={studyTime}
          onBookmarkToggle={handleBookmarkToggle}
          onNoteAdd={() => setIsSidePanelOpen(true)}
          onShare={handleShare}
          onDownload={handleDownload}
        />
      </main>
    </div>
  );
};

export default MaterialViewer;