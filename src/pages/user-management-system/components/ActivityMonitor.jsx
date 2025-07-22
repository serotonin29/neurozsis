import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const ActivityMonitor = ({ onlineCount, totalCount }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Mock real-time activity data
  const mockActivities = [
    {
      id: 1,
      user: 'Ahmad Ridwan',
      action: 'Login ke sistem',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      type: 'login',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      user: 'Prof. Bambang Suryadi',
      action: 'Mengakses materi pembelajaran',
      timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
      type: 'access',
      ip: '192.168.1.105'
    },
    {
      id: 3,
      user: 'Siti Nurhaliza',
      action: 'Menyelesaikan quiz',
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      type: 'quiz',
      ip: '192.168.1.102'
    },
    {
      id: 4,
      user: 'Unknown User',
      action: 'Failed login attempt',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      type: 'security_alert',
      ip: '45.123.45.67'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login': return 'LogIn';
      case 'access': return 'Eye';
      case 'quiz': return 'Brain';
      case 'security_alert': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'login': return 'text-success';
      case 'access': return 'text-primary';
      case 'quiz': return 'text-accent-foreground';
      case 'security_alert': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    return `${hours} jam lalu`;
  };

  const offlineCount = totalCount - onlineCount;
  const onlinePercentage = totalCount > 0 ? Math.round((onlineCount / totalCount) * 100) : 0;

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowDetails(!showDetails)}
        className="relative"
      >
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium">{onlineCount}</span>
          </div>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm">{totalCount}</span>
          <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} size={14} />
        </div>
      </Button>

      {/* Activity Details Dropdown */}
      {showDetails && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-2">Monitor Aktivitas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm font-medium text-foreground">{onlineCount}</span>
                </div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-muted rounded-full" />
                  <span className="text-sm font-medium text-foreground">{offlineCount}</span>
                </div>
                <span className="text-xs text-muted-foreground">Offline</span>
              </div>
            </div>
            
            {/* Online Percentage Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Status Online</span>
                <span>{onlinePercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-success rounded-full h-2 transition-all duration-300"
                  style={{ width: `${onlinePercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Aktivitas Terbaru</h4>
              <Button variant="ghost" size="xs" iconName="RefreshCw">
                Refresh
              </Button>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", 
                    activity.type === 'security_alert' ?'bg-error/10' :'bg-muted'
                  )}>
                    <Icon 
                      name={getActivityIcon(activity.type)} 
                      size={12} 
                      className={getActivityColor(activity.type)} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-foreground truncate">
                        {activity.user}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}
                    </p>
                    {activity.type === 'security_alert' && (
                      <div className="mt-1 flex items-center space-x-1">
                        <Icon name="MapPin" size={10} className="text-error" />
                        <span className="text-xs text-error">{activity.ip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Security Alert Summary */}
            <div className="mt-4 p-3 bg-error/5 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-error" />
                <span className="text-xs font-medium text-error">
                  1 aktivitas mencurigakan terdeteksi
                </span>
              </div>
              <p className="text-xs text-error/80 mt-1">
                Login gagal dari IP tidak dikenal
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="xs" iconName="Activity">
                Lihat Semua Log
              </Button>
              <Button variant="ghost" size="xs" iconName="Settings">
                Pengaturan Monitor
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityMonitor;