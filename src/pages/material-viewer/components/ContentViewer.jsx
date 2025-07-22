import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentViewer = ({ material, onBookmarkToggle, onNoteAdd, onProgressUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  
  const videoRef = useRef(null);
  const pdfContainerRef = useRef(null);

  // Mock chapters for video content
  const videoChapters = [
    { id: 1, title: "Pengenalan Sistem Saraf", time: 0 },
    { id: 2, title: "Anatomi Otak", time: 180 },
    { id: 3, title: "Fungsi Neuron", time: 360 },
    { id: 4, title: "Transmisi Sinaptik", time: 540 }
  ];

  // Mock hotspots for interactive content
  const infographicHotspots = [
    { id: 1, x: 25, y: 30, title: "Korteks Serebral", description: "Bagian terluar otak yang bertanggung jawab untuk fungsi kognitif tingkat tinggi" },
    { id: 2, x: 50, y: 45, title: "Hipokampus", description: "Struktur penting untuk pembentukan memori jangka panjang" },
    { id: 3, x: 70, y: 60, title: "Amigdala", description: "Pusat pemrosesan emosi dan respons fight-or-flight" }
  ];

  useEffect(() => {
    // Simulate progress tracking
    const interval = setInterval(() => {
      if (material.type === 'video' && isPlaying) {
        const progress = Math.min((videoCurrentTime / videoDuration) * 100, 100);
        onProgressUpdate(progress);
      } else if (material.type === 'pdf') {
        const progress = (currentPage / material.totalPages) * 100;
        onProgressUpdate(progress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPage, videoCurrentTime, videoDuration, isPlaying, material.type, material.totalPages, onProgressUpdate]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handlePageNavigation = (direction) => {
    if (direction === 'next' && currentPage < material.totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleChapterClick = (chapterTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = chapterTime;
      setCurrentChapter(videoChapters.findIndex(ch => ch.time === chapterTime));
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPDFViewer = () => (
    <div className="flex flex-col h-full bg-muted">
      {/* PDF Controls */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageNavigation('prev')}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <span className="font-body text-sm text-foreground px-3">
            {currentPage} / {material.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageNavigation('next')}
            disabled={currentPage === material.totalPages}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <Icon name="ZoomOut" size={16} />
          </Button>
          <span className="font-body text-sm text-foreground px-2">{zoomLevel}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <Icon name="ZoomIn" size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari dalam dokumen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-1.5 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Icon name="Search" size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div 
        ref={pdfContainerRef}
        className="flex-1 overflow-auto p-4"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
      >
        <div className="bg-white shadow-clinical-lg rounded-lg p-8 mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="text-center border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                {material.title}
              </h1>
              <p className="text-sm text-gray-600">Halaman {currentPage}</p>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <h2 className="text-lg font-heading font-semibold text-gray-900 mb-3">
                Sistem Saraf Pusat - Anatomi dan Fisiologi
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Sistem saraf pusat (SSP) terdiri dari otak dan sumsum tulang belakang yang berfungsi sebagai pusat koordinasi dan kontrol seluruh aktivitas tubuh. Otak manusia dewasa memiliki berat sekitar 1,4 kg dan mengandung lebih dari 100 miliar neuron yang saling terhubung melalui triliunan sinapsis.
              </p>
              
              <h3 className="text-base font-heading font-medium text-gray-900 mb-2">
                Struktur Utama Otak
              </h3>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Serebrum: Bagian terbesar otak yang terdiri dari korteks serebral</li>
                <li>Serebelum: Mengatur keseimbangan dan koordinasi gerakan</li>
                <li>Batang otak: Mengendalikan fungsi vital seperti pernapasan dan detak jantung</li>
                <li>Diensefalon: Termasuk talamus dan hipotalamus</li>
              </ul>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
                <p className="text-blue-800 text-sm">
                  <strong>Catatan Penting:</strong> Korteks serebral dibagi menjadi empat lobus utama: frontal, parietal, temporal, dan oksipital, masing-masing memiliki fungsi spesifik dalam pemrosesan informasi.
                </p>
              </div>
              
              {searchTerm && (
                <div className="bg-yellow-100 border border-yellow-300 rounded p-2 text-sm">
                  Mencari: "{searchTerm}" - 3 hasil ditemukan
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideoPlayer = () => (
    <div className="flex flex-col h-full bg-black">
      {/* Video Element */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={handleVideoTimeUpdate}
          onLoadedMetadata={handleVideoTimeUpdate}
          poster="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop"
        >
          <source src="/mock-video.mp4" type="video/mp4" />
          {showSubtitles && (
            <track kind="subtitles" src="/subtitles-id.vtt" srcLang="id" label="Indonesian" default />
          )}
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-4 mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
            </Button>

            <div className="flex-1">
              <div className="w-full bg-white/30 rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-clinical"
                  style={{ width: `${(videoCurrentTime / videoDuration) * 100}%` }}
                />
              </div>
            </div>

            <span className="text-white text-sm font-mono">
              {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
            </span>

            {/* Speed Control */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                {playbackSpeed}x
              </Button>
              <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-clinical-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-clinical">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`block w-full px-3 py-2 text-sm text-left hover:bg-muted transition-clinical ${
                      playbackSpeed === speed ? 'bg-primary text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`text-white hover:bg-white/20 ${showSubtitles ? 'bg-white/20' : ''}`}
            >
              <Icon name="Subtitles" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Navigation */}
      <div className="bg-card border-t border-border p-4">
        <h4 className="font-heading font-medium text-sm text-foreground mb-3">Bab</h4>
        <div className="flex space-x-2 overflow-x-auto">
          {videoChapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => handleChapterClick(chapter.time)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-body transition-clinical ${
                currentChapter === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <div className="text-left">
                <p className="font-medium">{chapter.title}</p>
                <p className="text-xs opacity-80">{formatTime(chapter.time)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInteractiveContent = () => (
    <div className="flex flex-col h-full bg-muted">
      <div className="flex-1 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=800&fit=crop"
          alt="Interactive Brain Anatomy"
          className="w-full h-full object-cover"
        />
        
        {/* Interactive Hotspots */}
        {infographicHotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
            className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white shadow-clinical-lg hover:scale-110 transition-clinical animate-pulse"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            <span className="sr-only">{hotspot.title}</span>
          </button>
        ))}

        {/* Hotspot Detail Panel */}
        {selectedHotspot && (
          <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-clinical-lg p-4">
            {(() => {
              const hotspot = infographicHotspots.find(h => h.id === selectedHotspot);
              return (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-heading font-semibold text-foreground">{hotspot.title}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedHotspot(null)}
                      className="w-6 h-6"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{hotspot.description}</p>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Interactive Controls */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MousePointer" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              Klik titik biru untuk informasi detail
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Reset View
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (material.type) {
      case 'pdf':
        return renderPDFViewer();
      case 'video':
        return renderVideoPlayer();
      case 'interactive':
        return renderInteractiveContent();
      default:
        return (
          <div className="flex items-center justify-center h-full bg-muted">
            <div className="text-center">
              <Icon name="FileQuestion" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="font-body text-muted-foreground">Tipe konten tidak didukung</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {renderContent()}
    </div>
  );
};

export default ContentViewer;