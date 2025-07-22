import React from 'react';
import Icon from '../../../components/AppIcon';


const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-2xl shadow-clinical-lg overflow-hidden">
      {/* Header with Medical Theme */}
      <div className="relative bg-gradient-to-br from-primary to-primary/80 p-6 text-center">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="GraduationCap" size={32} className="text-white" />
          </div>
          <h1 className="font-heading font-bold text-xl text-white mb-1">NeuroZsis</h1>
          <p className="font-caption text-sm text-white/90">FK UNP Medical Learning Platform</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-2">{title}</h2>
          <p className="font-body text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;