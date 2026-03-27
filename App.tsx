import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { QuranReader } from './components/QuranReader';
import { AICompanion } from './components/AICompanion';
import { MasjidManager } from './components/MasjidManager';
import { KhutbahBuilder } from './components/KhutbahBuilder';
import { HadithReader } from './components/HadithReader';
import { LoginModal } from './components/LoginModal';
import { ViewType, User } from './types';
import { backend } from './services/mockBackend';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Rehydrate session from simulated backend
    const user = backend.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleViewChange = (view: ViewType) => {
    if (view === currentView) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsTransitioning(false);
    }, 300); 
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await backend.logout();
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={handleViewChange} currentUser={currentUser} />;
      case 'quran':
        return <QuranReader />;
      case 'hadith':
        return <HadithReader />;
      case 'ai':
        return <AICompanion />;
      case 'masjid':
        return <MasjidManager currentUser={currentUser} />;
      case 'khutbah_builder':
        if (currentUser?.role === 'imam' || currentUser?.role === 'super_admin') {
            return <KhutbahBuilder />;
        }
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-heading font-bold text-ink-900 mb-2">Restricted Access</h2>
                <p className="text-ink-600 mb-6">The Khutbah Builder is reserved for verified Imams.</p>
                <button 
                    onClick={() => setIsLoginOpen(true)} 
                    className="bg-baghdad-500 text-divinity-100 px-6 py-3 rounded-xl font-bold hover:bg-baghdad-600 transition-colors"
                >
                    Login as Khateeb
                </button>
            </div>
        );
      default:
        return <Dashboard onViewChange={handleViewChange} currentUser={currentUser} />;
    }
  };

  return (
    <Layout 
        currentView={currentView} 
        onViewChange={handleViewChange}
        currentUser={currentUser}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogoutClick={handleLogout}
    >
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
      
      <div 
        className={`
          h-full w-full
          transition-opacity duration-300 ease-in-out
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {renderContent()}
      </div>
    </Layout>
  );
}
