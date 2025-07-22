import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecommendedSection = () => {
  const recommendations = [
    {
      id: 1,
      title: "Struktur dan Fungsi Neuron",
      category: "Neuroanatomi",
      type: "Video",
      duration: "12 menit",
      thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
      difficulty: "Dasar",
      rating: 4.8,
      views: 1250,
      reason: "Berdasarkan progress Anatomi Sistem Saraf"
    },
    {
      id: 2,
      title: "Mekanisme Transmisi Sinaptik",
      category: "Neurofisiologi",
      type: "Infografis",
      duration: "8 menit",
      thumbnail: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?w=300&h=200&fit=crop",
      difficulty: "Menengah",
      rating: 4.6,
      views: 890,
      reason: "Melengkapi materi Neurotransmitter"
    },
    {
      id: 3,
      title: "Gangguan Neurologis Umum",
      category: "Neuropatologi",
      type: "PDF",
      duration: "20 menit",
      thumbnail: "https://images.pixabay.com/photo/2017/03/25/17/55/color-2174045_1280.jpg?w=300&h=200&fit=crop",
      difficulty: "Lanjutan",
      rating: 4.9,
      views: 2100,
      reason: "Persiapan ujian blok Neurologi"
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video': return 'Play';
      case 'PDF': return 'FileText';
      case 'Infografis': return 'Image';
      default: return 'BookOpen';
    }
  };

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
            Rekomendasi untuk Anda
          </h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Materi yang dipersonalisasi berdasarkan pola belajar Anda
          </p>
        </div>
        <div className="flex items-center space-x-2 text-primary">
          <Icon name="Sparkles" size={16} />
          <span className="text-sm font-caption font-medium">AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <Link
            key={item.id}
            to="/material-viewer"
            className="group bg-muted/30 rounded-lg overflow-hidden hover:shadow-clinical-lg transition-clinical border border-border/50"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-clinical-slow"
              />
              <div className="absolute top-3 left-3">
                <div className="flex items-center space-x-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Icon name={getTypeIcon(item.type)} size={12} className="text-primary" />
                  <span className="text-xs font-caption font-medium text-foreground">
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getDifficultyColor(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-background/90 backdrop-blur-sm rounded px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-xs font-caption text-foreground">{item.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs font-caption text-foreground">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BookOpen" size={14} className="text-primary" />
                <span className="text-xs font-caption text-primary font-medium">
                  {item.category}
                </span>
              </div>
              <h3 className="font-body font-semibold text-sm text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-clinical">
                {item.title}
              </h3>
              
              <div className="bg-accent/10 rounded-lg p-3 mb-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={14} className="text-accent mt-0.5" />
                  <div>
                    <p className="text-xs font-caption font-medium text-accent mb-1">
                      Mengapa direkomendasikan?
                    </p>
                    <p className="text-xs font-caption text-muted-foreground">
                      {item.reason}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span className="font-caption">{item.views.toLocaleString('id-ID')} views</span>
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

export default RecommendedSection;