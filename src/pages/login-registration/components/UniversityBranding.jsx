import React from 'react';

import Icon from '../../../components/AppIcon';

const UniversityBranding = () => {
  return (
    <div className="text-center mb-8">
      {/* University Logo */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="School" size={24} className="text-primary" />
        </div>
        <div className="text-left">
          <h3 className="font-heading font-bold text-lg text-foreground">FK UNP</h3>
          <p className="font-caption text-xs text-muted-foreground">Fakultas Kedokteran</p>
          <p className="font-caption text-xs text-muted-foreground">Universitas Negeri Padang</p>
        </div>
      </div>

      {/* Medical Theme Visual */}
      <div className="relative w-full h-32 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4 opacity-20">
            <Icon name="Brain" size={32} className="text-primary" />
            <Icon name="Heart" size={32} className="text-accent" />
            <Icon name="Activity" size={32} className="text-secondary" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
            Platform Pembelajaran Digital
          </h4>
          <p className="font-caption text-xs text-muted-foreground">
            Khusus Mahasiswa Kedokteran FK UNP
          </p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span className="font-caption">Aman & Terpercaya</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} className="text-primary" />
          <span className="font-caption">1000+ Mahasiswa</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Award" size={14} className="text-accent" />
          <span className="font-caption">Terakreditasi</span>
        </div>
      </div>
    </div>
  );
};

export default UniversityBranding;