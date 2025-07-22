import React, { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const UserProfilePanel = ({ user, userType, onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = {
    students: [
      { id: 'overview', label: 'Ringkasan', icon: 'User' },
      { id: 'academic', label: 'Akademik', icon: 'GraduationCap' },
      { id: 'activity', label: 'Aktivitas', icon: 'Activity' },
      { id: 'security', label: 'Keamanan', icon: 'Shield' }
    ],
    faculty: [
      { id: 'overview', label: 'Ringkasan', icon: 'User' },
      { id: 'teaching', label: 'Pengajaran', icon: 'BookOpen' },
      { id: 'activity', label: 'Aktivitas', icon: 'Activity' },
      { id: 'security', label: 'Keamanan', icon: 'Shield' }
    ],
    administrators: [
      { id: 'overview', label: 'Ringkasan', icon: 'User' },
      { id: 'permissions', label: 'Hak Akses', icon: 'Key' },
      { id: 'activity', label: 'Aktivitas', icon: 'Activity' },
      { id: 'security', label: 'Keamanan', icon: 'Shield' }
    ]
  };

  const currentSections = sections[userType] || sections.students;

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: id });
  };

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 p-6 bg-muted/30 rounded-xl">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {user.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-heading font-bold text-foreground">
            {user.name}
          </h3>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <div className={cn("w-2 h-2 rounded-full", user.onlineStatus ? "bg-success" : "bg-muted")} />
              <span className="text-xs text-muted-foreground">
                {user.onlineStatus ? 'Online' : 'Offline'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Bergabung {formatDate(user.registrationDate)}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Mail">
            Kirim Email
          </Button>
          <Button variant="outline" size="sm" iconName="Edit">
            Edit Profil
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Informasi Dasar</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", 
                user.status === 'active' ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"
              )}>
                {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
              </span>
            </div>
            
            {userType === 'students' && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Program</span>
                  <span className="text-sm text-foreground">{user.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Angkatan</span>
                  <span className="text-sm text-foreground">{user.year}</span>
                </div>
              </>
            )}
            
            {userType === 'faculty' && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Spesialisasi</span>
                  <span className="text-sm text-foreground">{user.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fakultas</span>
                  <span className="text-sm text-foreground">{user.department}</span>
                </div>
              </>
            )}
            
            {userType === 'administrators' && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peran</span>
                <span className="text-sm text-foreground">{user.role}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Aktivitas Terakhir</span>
              <span className="text-sm text-foreground">
                {format(new Date(user.lastActivity), 'dd/MM/yyyy HH:mm', { locale: id })}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Statistik</h4>
          <div className="space-y-3">
            {userType === 'students' && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Skor Assessment</span>
                  <span className="text-sm font-medium text-foreground">{user.assessmentScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Progress Belajar</span>
                  <span className="text-sm font-medium text-foreground">{user.learningProgress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Partisipasi Forum</span>
                  <span className="text-sm text-foreground">{user.forumParticipation} post</span>
                </div>
              </>
            )}
            
            {userType === 'faculty' && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mata Kuliah</span>
                  <span className="text-sm font-medium text-foreground">{user.coursesTeaching} kelas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mahasiswa Bimbingan</span>
                  <span className="text-sm text-foreground">{user.studentsSupervised} mahasiswa</span>
                </div>
              </>
            )}
            
            {userType === 'administrators' && user.permissions && (
              <div>
                <span className="text-sm text-muted-foreground">Hak Akses</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {user.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {permission.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademicSection = () => {
    if (userType !== 'students') return null;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progress Belajar</p>
                <p className="text-2xl font-bold text-primary">{user.learningProgress}%</p>
              </div>
              <Icon name="TrendingUp" size={24} className="text-primary" />
            </div>
          </div>
          <div className="bg-success/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Skor Assessment</p>
                <p className="text-2xl font-bold text-success">{user.assessmentScore}</p>
              </div>
              <Icon name="Target" size={24} className="text-success" />
            </div>
          </div>
          <div className="bg-accent/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Partisipasi Forum</p>
                <p className="text-2xl font-bold text-accent-foreground">{user.forumParticipation}</p>
              </div>
              <Icon name="MessageSquare" size={24} className="text-accent-foreground" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="font-medium text-foreground mb-4">Riwayat Assessment</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Quiz Neurologi Dasar</p>
                <p className="text-xs text-muted-foreground">20 Jan 2025</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                92/100
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Assessment Anatomi</p>
                <p className="text-xs text-muted-foreground">18 Jan 2025</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-warning/10 text-warning rounded-full">
                78/100
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActivitySection = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h4 className="font-medium text-foreground mb-4">Aktivitas Terakhir</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <div>
              <p className="text-sm text-foreground">Login ke sistem</p>
              <p className="text-xs text-muted-foreground">22 Jan 2025, 11:50</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-success rounded-full mt-2" />
            <div>
              <p className="text-sm text-foreground">Menyelesaikan Quiz Neurologi</p>
              <p className="text-xs text-muted-foreground">21 Jan 2025, 14:30</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2" />
            <div>
              <p className="text-sm text-foreground">Posting di forum diskusi</p>
              <p className="text-xs text-muted-foreground">20 Jan 2025, 09:15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPermissionsSection = () => {
    if (userType !== 'administrators' || !user.permissions) return null;
    
    return (
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="font-medium text-foreground mb-4">Hak Akses Sistem</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.permissions.map((permission) => (
              <div key={permission} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-foreground capitalize">
                  {permission.replace('_', ' ')}
                </span>
                <Icon name="Check" size={16} className="text-success" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h4 className="font-medium text-foreground mb-4">Keamanan Akun</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Password terakhir diubah</p>
              <p className="text-xs text-muted-foreground">15 Jan 2025</p>
            </div>
            <Button variant="outline" size="sm">Reset Password</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Tidak aktif</p>
            </div>
            <Button variant="outline" size="sm">Aktifkan 2FA</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Sesi Login Aktif</p>
              <p className="text-xs text-muted-foreground">2 perangkat</p>
            </div>
            <Button variant="outline" size="sm" iconName="LogOut">
              Logout Semua
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverviewSection();
      case 'academic': return renderAcademicSection();
      case 'teaching': return userType === 'faculty' ? renderActivitySection() : null;
      case 'permissions': return renderPermissionsSection();
      case 'activity': return renderActivitySection();
      case 'security': return renderSecuritySection();
      default: return renderOverviewSection();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-end">
      <div className="w-full max-w-2xl h-full bg-card border-l border-border shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground">
              Profil Pengguna
            </h2>
            <p className="text-sm text-muted-foreground">
              Detail informasi dan pengaturan akun
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-1 p-6 border-b border-border">
          {currentSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon name={section.icon} size={16} />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePanel;