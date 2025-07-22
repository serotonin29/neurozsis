import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import MaterialGrid from './components/MaterialGrid';
import PreviewModal from './components/PreviewModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MaterialCatalogSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [previewMaterial, setPreviewMaterial] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    subjects: [],
    contentTypes: [],
    difficulty: [],
    dateRange: []
  });

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Andi Pratama",
    email: "andi.pratama@student.unp.ac.id",
    role: "Mahasiswa",
    studentId: "2024001",
    progress: 78
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Materi Baru Tersedia",
      message: "Materi Anatomi Sistem Kardiovaskular telah ditambahkan",
      time: "2 jam yang lalu",
      read: false
    },
    {
      id: 2,
      title: "Kuis Farmakologi",
      message: "Kuis baru tentang Farmakologi Dasar tersedia",
      time: "5 jam yang lalu",
      read: false
    }
  ];

  // Mock search suggestions
  const mockSuggestions = [
    { query: "anatomi jantung", category: "Anatomi", type: "keyword", count: 45 },
    { query: "sistem respirasi", category: "Fisiologi", type: "keyword", count: 32 },
    { query: "bagaimana cara kerja insulin?", category: "Farmakologi", type: "question", count: 18 },
    { query: "patofisiologi diabetes", category: "Patologi", type: "keyword", count: 27 }
  ];

  // Mock materials data
  const mockMaterials = [
    {
      id: 1,
      title: "Anatomi Jantung dan Sistem Kardiovaskular",
      description: "Pembahasan lengkap tentang struktur anatomi jantung, pembuluh darah, dan sistem sirkulasi dalam tubuh manusia.",
      subject: "Anatomi",
      contentType: "PDF",
      difficulty: "Menengah",
      duration: 45,
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      views: 1234,
      likes: 89,
      publishedDate: "15 Jan 2025",
      author: "Dr. Sari Indrawati",
      isBookmarked: false,
      learningObjectives: [
        "Memahami struktur anatomi jantung",
        "Menjelaskan sistem sirkulasi darah",
        "Mengidentifikasi pembuluh darah utama"
      ],
      prerequisites: ["Anatomi Dasar", "Histologi"]
    },
    {
      id: 2,
      title: "Fisiologi Sistem Respirasi",
      description: "Mekanisme pernapasan, pertukaran gas, dan regulasi sistem respirasi pada manusia.",
      subject: "Fisiologi",
      contentType: "Video",
      difficulty: "Pemula",
      duration: 30,
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      views: 2156,
      likes: 145,
      publishedDate: "12 Jan 2025",
      author: "Prof. Ahmad Rizki",
      isBookmarked: true,
      learningObjectives: [
        "Memahami mekanisme inspirasi dan ekspirasi",
        "Menjelaskan pertukaran gas di alveoli",
        "Menganalisis regulasi pernapasan"
      ],
      prerequisites: ["Anatomi Respirasi"]
    },
    {
      id: 3,
      title: "Farmakologi Sistem Saraf",
      description: "Obat-obatan yang bekerja pada sistem saraf pusat dan perifer, mekanisme kerja, dan efek samping.",
      subject: "Farmakologi",
      contentType: "Infographic",
      difficulty: "Lanjutan",
      duration: 60,
      thumbnail: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
      views: 987,
      likes: 67,
      publishedDate: "10 Jan 2025",
      author: "Dr. Maya Sari",
      isBookmarked: false,
      learningObjectives: [
        "Memahami klasifikasi obat sistem saraf",
        "Menjelaskan mekanisme kerja neurotransmitter",
        "Menganalisis efek samping obat"
      ],
      prerequisites: ["Farmakologi Dasar", "Neuroanatomi"]
    },
    {
      id: 4,
      title: "Patologi Sistem Pencernaan",
      description: "Penyakit-penyakit yang menyerang sistem pencernaan, patogenesis, dan manifestasi klinis.",
      subject: "Patologi",
      contentType: "Presentation",
      difficulty: "Menengah",
      duration: 50,
      thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      views: 1567,
      likes: 98,
      publishedDate: "8 Jan 2025",
      author: "Dr. Budi Santoso",
      isBookmarked: false,
      learningObjectives: [
        "Mengidentifikasi penyakit sistem pencernaan",
        "Memahami patogenesis penyakit",
        "Menjelaskan manifestasi klinis"
      ],
      prerequisites: ["Anatomi Pencernaan", "Histologi"]
    },
    {
      id: 5,
      title: "Biokimia Metabolisme Karbohidrat",
      description: "Jalur metabolisme karbohidrat, glikolisis, siklus Krebs, dan regulasi metabolisme glukosa.",
      subject: "Biokimia",
      contentType: "PDF",
      difficulty: "Lanjutan",
      duration: 75,
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      views: 834,
      likes: 56,
      publishedDate: "5 Jan 2025",
      author: "Prof. Lisa Hartono",
      isBookmarked: true,
      learningObjectives: [
        "Memahami jalur glikolisis",
        "Menjelaskan siklus asam sitrat",
        "Menganalisis regulasi metabolisme"
      ],
      prerequisites: ["Kimia Organik", "Biokimia Dasar"]
    },
    {
      id: 6,
      title: "Mikrobiologi Bakteri Patogen",
      description: "Karakteristik bakteri patogen, mekanisme patogenesis, dan metode identifikasi laboratorium.",
      subject: "Mikrobiologi",
      contentType: "Video",
      difficulty: "Menengah",
      duration: 40,
      thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop",
      views: 1245,
      likes: 78,
      publishedDate: "3 Jan 2025",
      author: "Dr. Rina Wati",
      isBookmarked: false,
      learningObjectives: [
        "Mengidentifikasi bakteri patogen",
        "Memahami mekanisme patogenesis",
        "Menjelaskan metode identifikasi"
      ],
      prerequisites: ["Mikrobiologi Dasar"]
    }
  ];

  // Get active filters for chips
  const getActiveFilters = useCallback(() => {
    const active = [];
    Object.entries(filters).forEach(([type, values]) => {
      if (Array.isArray(values)) {
        values.forEach(value => {
          active.push({
            type,
            value,
            label: value.charAt(0).toUpperCase() + value.slice(1)
          });
        });
      }
    });
    return active;
  }, [filters]);

  // Search functionality
  const performSearch = useCallback(async (query = searchQuery, newFilters = filters, sort = currentSort, page = 1) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredMaterials = [...mockMaterials];
      
      // Apply search query filter
      if (query.trim()) {
        filteredMaterials = filteredMaterials.filter(material =>
          material.title.toLowerCase().includes(query.toLowerCase()) ||
          material.description.toLowerCase().includes(query.toLowerCase()) ||
          material.subject.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Apply filters
      if (newFilters.subjects.length > 0) {
        filteredMaterials = filteredMaterials.filter(material =>
          newFilters.subjects.some(subject => 
            material.subject.toLowerCase() === subject.toLowerCase()
          )
        );
      }
      
      if (newFilters.contentTypes.length > 0) {
        filteredMaterials = filteredMaterials.filter(material =>
          newFilters.contentTypes.some(type => 
            material.contentType.toLowerCase() === type.toLowerCase()
          )
        );
      }
      
      if (newFilters.difficulty.length > 0) {
        filteredMaterials = filteredMaterials.filter(material =>
          newFilters.difficulty.some(diff => 
            material.difficulty.toLowerCase() === diff.toLowerCase()
          )
        );
      }
      
      // Apply sorting
      switch (sort) {
        case 'newest':
          filteredMaterials.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
          break;
        case 'oldest':
          filteredMaterials.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
          break;
        case 'popular':
          filteredMaterials.sort((a, b) => b.views - a.views);
          break;
        case 'alphabetical':
          filteredMaterials.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'rating':
          filteredMaterials.sort((a, b) => b.likes - a.likes);
          break;
        default: // relevance
          break;
      }
      
      setTotalResults(filteredMaterials.length);
      
      if (page === 1) {
        setMaterials(filteredMaterials);
      } else {
        setMaterials(prev => [...prev, ...filteredMaterials.slice((page - 1) * 9, page * 9)]);
      }
      
      setHasMoreResults(filteredMaterials.length > page * 9);
      
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filters, currentSort]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
    
    performSearch(query, filters, currentSort, 1);
  };

  // Handle filter changes
  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...filters };
    
    if (checked) {
      if (!newFilters[category].includes(value)) {
        newFilters[category] = [...newFilters[category], value];
      }
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }
    
    setFilters(newFilters);
    setCurrentPage(1);
    performSearch(searchQuery, newFilters, currentSort, 1);
  };

  // Handle filter removal
  const handleRemoveFilter = (filter) => {
    const newFilters = { ...filters };
    newFilters[filter.type] = newFilters[filter.type].filter(item => item !== filter.value);
    setFilters(newFilters);
    setCurrentPage(1);
    performSearch(searchQuery, newFilters, currentSort, 1);
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    const newFilters = {
      subjects: [],
      contentTypes: [],
      difficulty: [],
      dateRange: []
    };
    setFilters(newFilters);
    setCurrentPage(1);
    performSearch(searchQuery, newFilters, currentSort, 1);
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setCurrentSort(sort);
    setCurrentPage(1);
    performSearch(searchQuery, filters, sort, 1);
  };

  // Handle bookmark
  const handleBookmark = (materialId, isBookmarked) => {
    setMaterials(prev => 
      prev.map(material => 
        material.id === materialId 
          ? { ...material, isBookmarked }
          : material
      )
    );
  };

  // Handle preview
  const handlePreview = (material) => {
    setPreviewMaterial(material);
    setIsPreviewOpen(true);
  };

  // Handle open material
  const handleOpenMaterial = (material) => {
    navigate(`/material-viewer?id=${material.id}`);
  };

  // Handle load more
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    performSearch(searchQuery, filters, currentSort, nextPage);
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/login-registration');
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  // Initial search on mount
  useEffect(() => {
    performSearch();
  }, []);

  // Update search query from URL params
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam && queryParam !== searchQuery) {
      setSearchQuery(queryParam);
      performSearch(queryParam);
    }
  }, [searchParams]);

  const activeFilters = getActiveFilters();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        user={mockUser}
        notifications={mockNotifications}
        onLogout={handleLogout}
        onNotificationClick={handleNotificationClick}
      />

      {/* Navigation */}
      <Navigation className="top-16" />

      {/* Main Content */}
      <main className="pt-32 lg:pt-28 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Search Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                Katalog Materi Pembelajaran
              </h1>
              <p className="font-body text-muted-foreground max-w-2xl mx-auto">
                Temukan materi pembelajaran medis yang komprehensif untuk mendukung studi Anda di FK UNP
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={handleSearch}
                suggestions={mockSuggestions}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="mb-6">
              <FilterChips
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
                totalResults={totalResults}
              />
            </div>
          )}

          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Panel */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(true)}
                  className="w-full justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Filter" size={18} />
                    <span>Filter</span>
                    {activeFilters.length > 0 && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-caption rounded-full">
                        {activeFilters.length}
                      </span>
                    )}
                  </div>
                  <Icon name="ChevronRight" size={18} />
                </Button>
              </div>
              
              <FilterPanel
                isOpen={isFilterPanelOpen}
                onClose={() => setIsFilterPanelOpen(false)}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearAllFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="font-heading font-semibold text-lg text-foreground">
                    {searchQuery ? `Hasil untuk "${searchQuery}"` : 'Semua Materi'}
                  </h2>
                  <span className="font-body text-sm text-muted-foreground">
                    {totalResults.toLocaleString('id-ID')} materi ditemukan
                  </span>
                </div>
                
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                />
              </div>

              {/* Materials Grid */}
              <MaterialGrid
                materials={materials}
                isLoading={isLoading && currentPage === 1}
                onBookmark={handleBookmark}
                onPreview={handlePreview}
              />

              {/* Load More */}
              {hasMoreResults && materials.length > 0 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-8"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                        Memuat...
                      </>
                    ) : (
                      <>
                        <Icon name="ChevronDown" size={18} className="mr-2" />
                        Muat Lebih Banyak
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <PreviewModal
        material={previewMaterial}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onOpenMaterial={handleOpenMaterial}
      />
    </div>
  );
};

export default MaterialCatalogSearch;