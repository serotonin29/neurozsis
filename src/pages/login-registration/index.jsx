import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthCard from './components/AuthCard';
import TabSwitcher from './components/TabSwitcher';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UniversityBranding from './components/UniversityBranding';
import Icon from '../../components/AppIcon';

const LoginRegistration = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="GraduationCap" size={32} className="text-primary" />
          </div>
          <p className="font-body text-sm text-muted-foreground">Memuat platform pembelajaran...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Masuk & Daftar - NeuroZsis FK UNP</title>
        <meta name="description" content="Akses platform pembelajaran digital khusus mahasiswa Fakultas Kedokteran UNP. Masuk atau daftar untuk mengakses materi neurosains dan kurikulum medis." />
        <meta name="keywords" content="login, daftar, FK UNP, kedokteran, neurosains, pembelajaran" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex flex-col">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Branding (Hidden on mobile) */}
              <div className="hidden lg:block">
                <UniversityBranding />
                
                {/* Additional Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="BookOpen" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-sm text-foreground mb-1">
                        Materi Pembelajaran Lengkap
                      </h5>
                      <p className="font-caption text-xs text-muted-foreground">
                        Akses ribuan materi neurosains, anatomi, dan fisiologi yang terstruktur
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Brain" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-sm text-foreground mb-1">
                        Kuis Interaktif & AI
                      </h5>
                      <p className="font-caption text-xs text-muted-foreground">
                        Latihan soal dengan AI chatbot untuk membantu pemahaman konsep medis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-sm text-foreground mb-1">
                        Forum Diskusi
                      </h5>
                      <p className="font-caption text-xs text-muted-foreground">
                        Berinteraksi dengan sesama mahasiswa dan dosen dalam forum pembelajaran
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Authentication Form */}
              <div className="w-full">
                <AuthCard
                  title={activeTab === 'login' ? 'Selamat Datang Kembali' : 'Bergabung dengan NeuroZsis'}
                  subtitle={activeTab === 'login' ?'Masuk ke akun Anda untuk melanjutkan pembelajaran' :'Daftar sebagai mahasiswa FK UNP untuk mengakses platform'
                  }
                >
                  <TabSwitcher 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                  />
                  
                  {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                </AuthCard>

                {/* Mobile Branding */}
                <div className="lg:hidden mt-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Shield" size={14} className="text-success" />
                        <span className="font-caption">Aman</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 py-6 px-4 border-t border-border/50 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="font-caption">© {new Date().getFullYear()} NeuroZsis FK UNP</span>
                <span className="hidden sm:inline">•</span>
                <button className="font-caption hover:text-foreground transition-clinical">
                  Syarat & Ketentuan
                </button>
                <span className="hidden sm:inline">•</span>
                <button className="font-caption hover:text-foreground transition-clinical">
                  Kebijakan Privasi
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="MapPin" size={12} />
                  <span className="font-caption">Padang, Indonesia</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span className="font-caption">WIB</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginRegistration;