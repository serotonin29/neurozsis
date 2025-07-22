import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCards = () => {
  const statistics = [
    {
      id: 1,
      title: "Jam Belajar Minggu Ini",
      value: "18.5",
      unit: "jam",
      change: "+2.3",
      changeType: "increase",
      icon: "Clock",
      color: "bg-primary",
      textColor: "text-primary-foreground",
      description: "Target: 20 jam/minggu"
    },
    {
      id: 2,
      title: "Kuis Diselesaikan",
      value: "12",
      unit: "kuis",
      change: "+4",
      changeType: "increase",
      icon: "CheckCircle",
      color: "bg-success",
      textColor: "text-success-foreground",
      description: "Rata-rata skor: 85%"
    },
    {
      id: 3,
      title: "Deadline Mendatang",
      value: "3",
      unit: "tugas",
      change: "2 hari",
      changeType: "warning",
      icon: "AlertTriangle",
      color: "bg-warning",
      textColor: "text-warning-foreground",
      description: "Tugas terdekat besok"
    },
    {
      id: 4,
      title: "Materi Dikuasai",
      value: "67",
      unit: "%",
      change: "+5%",
      changeType: "increase",
      icon: "TrendingUp",
      color: "bg-accent",
      textColor: "text-accent-foreground",
      description: "Blok Neurologi"
    }
  ];

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      case 'warning': return 'Clock';
      default: return 'Minus';
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase': return 'text-success';
      case 'decrease': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statistics.map((stat) => (
        <div key={stat.id} className="bg-card rounded-xl p-6 shadow-clinical border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} className={stat.textColor} />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(stat.changeType)}`}>
              <Icon name={getChangeIcon(stat.changeType)} size={14} />
              <span className="text-sm font-caption font-medium">
                {stat.change}
              </span>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-heading font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-sm font-caption text-muted-foreground">
                {stat.unit}
              </span>
            </div>
          </div>
          
          <h3 className="font-body font-medium text-sm text-foreground mb-1">
            {stat.title}
          </h3>
          <p className="text-xs font-caption text-muted-foreground">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;