import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContinueLearningSection = () => {
  const recentMaterials = [
    {
      id: 1,
      title: "Anatomi Sistem Saraf Pusat",
      category: "Neuroanatomi",
      progress: 75,
      timeRemaining: "15 menit",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      lastAccessed: "2 jam yang lalu",
      difficulty: "Menengah"
    },
    {
      id: 2,
      title: "Fisiologi Neurotransmitter",
      category: "Neurofisiologi",
      progress: 45,
      timeRemaining: "25 menit",
      thumbnail: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?w=300&h=200&fit=crop",
      lastAccessed: "1 hari yang lalu",
      difficulty: "Lanjutan"
    },
    {
      id: 3,
      title: "Farmakologi Sistem Saraf",
      category: "Neurofarmakologi",
      progress: 20,
      timeRemaining: "40 menit",
      thumbnail: "https://images.pixabay.com/photo/2017/03/25/17/55/color-2174045_1280.jpg?w=300&h=200&fit=crop",
      lastAccessed: "3 hari yang lalu",
      difficulty: "Dasar"
    },
    {
      id: 4,
      title: "Patologi Sistem Saraf",
      category: "Neuropatologi",
      progress: 60,
      timeRemaining: "20 menit",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
      lastAccessed: "5 hari yang lalu",
      difficulty: "Lanjutan"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Dasar': return 'bg-success/10 text-success';
      case 'Menengah': return 'bg-warning/10 text-warning';
      case 'Lanjutan': return 'bg-error/10 text-error';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-clinical">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Lanjutkan Belajar
          </h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Materi yang sedang Anda pelajari
          </p>
        </div>
        <Link 
          to="/material-catalog-search"
          className="text-primary hover:text-primary/80 font-body font-medium text-sm transition-clinical"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentMaterials.map((material) => (
          <Link
            key={material.id}
            to="/material-viewer"
            className="group bg-muted/50 rounded-lg overflow-hidden hover:shadow-clinical-lg transition-clinical"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={material.thumbnail}
                alt={material.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-clinical-slow"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-caption font-medium ${getDifficultyColor(material.difficulty)}`}>
                  {material.difficulty}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-caption text-foreground">{material.progress}%</span>
                    <span className="font-caption text-muted-foreground">{material.timeRemaining}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1 mt-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-clinical" 
                      style={{ width: `${material.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BookOpen" size={14} className="text-primary" />
                <span className="text-xs font-caption text-primary font-medium">
                  {material.category}
                </span>
              </div>
              <h3 className="font-body font-semibold text-sm text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-clinical">
                {material.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span className="font-caption">{material.lastAccessed}</span>
                </div>
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-clinical" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearningSection;