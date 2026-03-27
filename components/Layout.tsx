import React, { ReactNode } from 'react';
import { ViewType, User } from '../types';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const NavItem = ({ 
  label, 
  isActive, 
  onClick, 
  icon
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
  icon: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 w-full text-left relative overflow-hidden
        ${isActive 
          ? 'bg-sage-700 text-cream-50 shadow-soft' 
          : 'text-ink-600 hover:bg-sage-700/5 hover:text-sage-800'}
      `}
    >
      <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
      <span className={`text-sm font-heading font-bold tracking-wide ${isActive ? 'font-semibold' : 'font-medium'}`}>{label}</span>
      
      {/* Active Indicator Line */}
      {isActive && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-antique-500 rounded-l-full"></div>
      )}
    </button>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange, currentUser, onLoginClick, onLogoutClick }) => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-cream-100 text-ink-900 font-body">
      
      {/* Desktop Sidebar - Floating Card Style */}
      <aside className="hidden md:flex flex-col w-72 p-4 h-full">
        <div className="flex flex-col h-full bg-white/60 backdrop-blur-md border border-cream-300/50 rounded-3xl shadow-soft relative overflow-hidden">
           
           {/* Decorative Header */}
           <div className="p-8 text-center relative z-10">
               <div className="w-16 h-16 mx-auto bg-sage-700 rounded-2xl rotate-3 flex items-center justify-center shadow-lg mb-4">
                  <span className="text-3xl -rotate-3 text-cream-50">🕌</span>
               </div>
               <h1 className="text-2xl font-heading font-bold text-ink-900 tracking-tight">{APP_NAME}</h1>
               <p className="text-xs text-sage-700 mt-1 font-urdu tracking-widest">نور ہدایت</p>
           </div>

           {/* Navigation */}
           <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
             <div className="mb-6">
               <p className="px-4 text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2">Main</p>
               <NavItem label="Dashboard" icon="🏠" isActive={currentView === 'dashboard'} onClick={() => onViewChange('dashboard')} />
               <NavItem label="Masjid Finder" icon="📍" isActive={currentView === 'masjid'} onClick={() => onViewChange('masjid')} />
             </div>

             <div className="mb-6">
               <p className="px-4 text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2">Knowledge</p>
               <NavItem label="Al-Quran" icon="📖" isActive={currentView === 'quran'} onClick={() => onViewChange('quran')} />
               <NavItem label="Hadith Library" icon="📚" isActive={currentView === 'hadith'} onClick={() => onViewChange('hadith')} />
               <NavItem label="Ask Noor AI" icon="✨" isActive={currentView === 'ai'} onClick={() => onViewChange('ai')} />
             </div>

             <div>
               <p className="px-4 text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2">Imam Services</p>
               <NavItem label="Khutbah Writer" icon="✒️" isActive={currentView === 'khutbah_builder'} onClick={() => onViewChange('khutbah_builder')} />
             </div>
           </nav>

           {/* User Profile / Auth */}
           <div className="p-4 mt-auto">
             {currentUser ? (
                <div className="bg-cream-100 p-3 rounded-xl flex items-center justify-between border border-cream-200">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-antique-600 text-cream-50 flex items-center justify-center font-bold text-xs shadow-sm">
                          {currentUser.name.substring(0,2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                          <span className="text-xs font-bold text-ink-900">{currentUser.name}</span>
                          <span className="text-[9px] text-ink-500 uppercase font-semibold">{currentUser.role === 'imam' ? 'Khateeb' : 'Musalli'}</span>
                      </div>
                   </div>
                   <button onClick={onLogoutClick} className="text-ink-400 hover:text-red-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                   </button>
                </div>
             ) : (
                <button 
                  onClick={onLoginClick}
                  className="w-full py-3 bg-ink-900 text-cream-100 font-bold rounded-xl text-sm hover:bg-sage-800 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>🔒</span> Login Portal
                </button>
             )}
           </div>

           {/* Pattern BG */}
           <div className="absolute bottom-0 left-0 w-full h-32 bg-texture-paper opacity-50 pointer-events-none z-0 mix-blend-multiply"></div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center p-4 bg-cream-100 border-b border-cream-200 z-20 sticky top-0">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-sage-700 rounded-lg flex items-center justify-center text-white">🕌</div>
           <h1 className="text-lg font-heading font-bold text-ink-900">{APP_NAME}</h1>
        </div>
        <button onClick={currentUser ? onLogoutClick : onLoginClick} className="text-sage-700 font-bold text-xs uppercase tracking-widest border border-sage-200 px-3 py-1 rounded-full">
           {currentUser ? 'Exit' : 'Login'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col h-[calc(100vh-60px)] md:h-screen overflow-hidden bg-cream-50 md:rounded-l-3xl md:my-4 md:mr-4 md:shadow-2xl md:border border-cream-200/50">
        <div className="absolute inset-0 bg-texture-paper opacity-40 pointer-events-none"></div>
        <div className="relative z-10 h-full w-full overflow-hidden">
            {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white border-t border-cream-200 flex justify-around p-2 pb-safe z-30 fixed bottom-0 w-full shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
         <button onClick={() => onViewChange('dashboard')} className={`flex flex-col items-center p-2 ${currentView === 'dashboard' ? 'text-sage-700' : 'text-ink-400'}`}>
            <span className="text-xl">🏠</span>
            <span className="text-[9px] font-bold mt-1">Home</span>
         </button>
         <button onClick={() => onViewChange('quran')} className={`flex flex-col items-center p-2 ${currentView === 'quran' ? 'text-sage-700' : 'text-ink-400'}`}>
            <span className="text-xl">📖</span>
            <span className="text-[9px] font-bold mt-1">Quran</span>
         </button>
         <button onClick={() => onViewChange('khutbah_builder')} className={`flex flex-col items-center p-2 ${currentView === 'khutbah_builder' ? 'text-sage-700' : 'text-ink-400'}`}>
            <span className="text-xl">✒️</span>
            <span className="text-[9px] font-bold mt-1">Imam</span>
         </button>
         <button onClick={() => onViewChange('ai')} className={`flex flex-col items-center p-2 ${currentView === 'ai' ? 'text-sage-700' : 'text-ink-400'}`}>
            <span className="text-xl">🤖</span>
            <span className="text-[9px] font-bold mt-1">AI</span>
         </button>
      </nav>

    </div>
  );
};