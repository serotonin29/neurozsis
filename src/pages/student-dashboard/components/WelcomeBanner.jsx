import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeBanner = ({ user }) => {
  const progressPercentage = user?.progress || 0;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground shadow-clinical">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-bold mb-2">
            Selamat datang kembali, {user?.name || 'Mahasiswa'}!
          </h1>
          <p className="text-primary-foreground/80 font-body mb-1">
            Semester {user?.semester || '4'} • Program Studi Kedokteran
          </p>
          <p className="text-primary-foreground/80 font-body text-sm">
            Fakultas Kedokteran Universitas Negeri Padang
          </p>
          
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-primary-foreground/80" />
              <span className="text-sm font-caption text-primary-foreground/80">
                Senin, 22 Juli 2025
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary-foreground/80" />
              <span className="text-sm font-caption text-primary-foreground/80">
                11:21 WIB
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-heading font-bold text-primary-foreground">
                {progressPercentage}%
              </span>
            </div>
          </div>
          <p className="text-xs font-caption text-primary-foreground/80 mt-2 text-center">
            Progress Keseluruhan
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;