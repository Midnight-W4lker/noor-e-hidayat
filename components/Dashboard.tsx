import React, { useEffect, useState } from 'react';
import { ViewType, User } from '../types';
import { MOCK_PRAYER_TIMES, MOCK_SURAHS, MOCK_KHUTBAHS } from '../constants';

interface DashboardProps {
  onViewChange: (view: ViewType) => void;
  currentUser?: User | null;
}

const WidgetCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
    <div 
        onClick={onClick}
        className={`bg-white border border-cream-200 rounded-2xl p-6 shadow-soft hover:shadow-md transition-all duration-300 ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} ${className}`}
    >
        {children}
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onViewChange, currentUser }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dailyAyah = MOCK_SURAHS[1].ayahs[1]; 
  const isImam = currentUser?.role === 'imam' || currentUser?.role === 'super_admin';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4 md:p-8 space-y-8">
      
      {/* Hero Section */}
      <div className="relative bg-sage-800 rounded-3xl p-8 md:p-10 text-cream-50 shadow-lg overflow-hidden">
          {/* Decorative Pattern Overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-texture-paper opacity-10 rounded-full mix-blend-overlay -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <p className="text-sage-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    {currentUser ? `Welcome, ${currentUser.name}` : 'Noor-e-Hidayat Portal'}
                </p>
                <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-2">
                    As-salamu alaykum
                </h1>
                <p className="text-sage-200 font-body text-lg max-w-xl">
                    {isImam 
                        ? "Your community awaits guidance. You have 2 upcoming events and a draft pending." 
                        : "May your day be filled with barakah and light."}
                </p>
            </div>
            <div className="text-left md:text-right">
                <p className="font-urdu text-3xl text-antique-400 mb-1">١٤ رجب ١٤٤٥</p>
                <p className="text-sm text-sage-300 font-bold">{currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Focus: Prayer & Content) */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Prayer Times Strip (Minimalist) */}
            <div className="grid grid-cols-5 gap-2 md:gap-4">
                {MOCK_PRAYER_TIMES.map((pt, idx) => {
                    const isNext = idx === 3; // Mocking Maghrib as next
                    return (
                        <div key={pt.name} className={`
                            flex flex-col items-center justify-center py-4 rounded-2xl border transition-all
                            ${isNext 
                                ? 'bg-antique-500 text-white border-antique-600 shadow-md' 
                                : 'bg-white text-ink-600 border-cream-200 hover:border-antique-400'}
                        `}>
                            <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${isNext ? 'opacity-100' : 'opacity-50'}`}>{pt.name}</span>
                            <span className="font-heading font-bold text-lg md:text-xl">{pt.time.split(' ')[0]}</span>
                            <span className="text-[10px] opacity-70">{pt.time.split(' ')[1]}</span>
                        </div>
                    )
                })}
            </div>

            {/* Dual View Logic */}
            {isImam ? (
                // --- IMAM DASHBOARD VIEW ---
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WidgetCard onClick={() => onViewChange('khutbah_builder')} className="bg-gradient-to-br from-ink-900 to-ink-800 text-cream-50 border-none">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">✒️</div>
                            <span className="px-2 py-1 bg-sage-500 text-white text-[10px] font-bold uppercase rounded">Draft</span>
                        </div>
                        <h3 className="font-heading font-bold text-2xl mb-2">Continue Writing</h3>
                        <p className="text-sm text-ink-400 mb-4 line-clamp-2">The Importance of Sincerity (Ikhlas) - Last edited 2 hours ago.</p>
                        <div className="flex items-center text-xs font-bold uppercase tracking-widest text-antique-400">
                            Open Editor <span className="ml-2">→</span>
                        </div>
                    </WidgetCard>

                    <WidgetCard>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-heading font-bold text-lg">Community Stats</h3>
                            <span className="text-xs text-ink-400">This Month</span>
                        </div>
                        <div className="space-y-4">
                             <div className="flex justify-between items-end">
                                 <span className="text-sm text-ink-600">Jummah Avg</span>
                                 <span className="text-xl font-bold text-ink-900">~850</span>
                             </div>
                             <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-sage-600 h-full w-[75%] rounded-full"></div>
                             </div>
                             <div className="flex justify-between items-end">
                                 <span className="text-sm text-ink-600">Sadaqah</span>
                                 <span className="text-xl font-bold text-ink-900">PKR 45k</span>
                             </div>
                             <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-antique-500 h-full w-[40%] rounded-full"></div>
                             </div>
                        </div>
                    </WidgetCard>
                </div>
            ) : (
                // --- USER DASHBOARD VIEW ---
                <WidgetCard onClick={() => onViewChange('quran')} className="relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-cream-100 to-transparent opacity-50"></div>
                    <span className="text-xs font-bold text-sage-600 uppercase tracking-widest mb-2 block">Daily Inspiration</span>
                    
                    <div className="text-center py-4">
                        <p className="font-arabic text-3xl md:text-4xl text-ink-900 mb-4 dir-rtl leading-loose">{dailyAyah.textArabic}</p>
                        <p className="font-urdu text-xl text-ink-600 mb-2 dir-rtl">{dailyAyah.textUrdu}</p>
                        <p className="text-sm text-ink-400 italic">"{dailyAyah.textEnglish}"</p>
                        <p className="text-xs font-bold text-antique-600 mt-4 uppercase tracking-widest">— Surah Al-Baqarah, Ayah 255</p>
                    </div>
                </WidgetCard>
            )}

        </div>

        {/* Right Column (Tools & Quick Access) */}
        <div className="space-y-6">
            
            {/* AI Assistant Widget */}
            <WidgetCard onClick={() => onViewChange('ai')} className="bg-cream-50 border-antique-200/50 hover:border-antique-400">
                 <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-antique-400 to-antique-600 flex items-center justify-center text-white text-xl shadow-md">✨</div>
                     <div>
                         <h3 className="font-heading font-bold text-lg">Ask Noor AI</h3>
                         <p className="text-xs text-ink-500">Your Shariah-compliant guide</p>
                     </div>
                 </div>
                 <div className="bg-white p-3 rounded-xl border border-cream-200 text-sm text-ink-600 italic mb-3">
                     "What is the ruling on..."
                 </div>
                 <div className="flex justify-end">
                     <span className="text-xs font-bold text-antique-700 uppercase tracking-widest">Start Chat →</span>
                 </div>
            </WidgetCard>

            {/* Masjid Finder Mini */}
            <WidgetCard onClick={() => onViewChange('masjid')}>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-heading font-bold text-lg">Near You</h3>
                    <span className="text-xl">📍</span>
                 </div>
                 <div className="space-y-3">
                     <div className="flex items-start gap-3 pb-3 border-b border-cream-100">
                         <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                         <div>
                             <p className="font-bold text-sm text-ink-900">Jamia Masjid Al-Noor</p>
                             <p className="text-xs text-ink-500">0.4 km • Jummah 1:15 PM</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-3">
                         <div className="w-2 h-2 mt-2 rounded-full bg-gray-300"></div>
                         <div>
                             <p className="font-bold text-sm text-ink-900">Faisal Mosque</p>
                             <p className="text-xs text-ink-500">5.2 km • Jummah 1:30 PM</p>
                         </div>
                     </div>
                 </div>
            </WidgetCard>
        </div>

      </div>
    </div>
  );
};