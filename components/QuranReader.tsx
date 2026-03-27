
import React, { useState, useEffect } from 'react';
import { ALL_SURAHS_METADATA, AVAILABLE_TAFSIRS } from '../constants';
import { Surah, SurahMetadata, QuranSettings } from '../types';
import { quranService } from '../services/quranService';

export const QuranReader: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // --- Reader Settings State ---
  const [settings, setSettings] = useState<QuranSettings>({
      fontSizeArabic: 32,
      fontSizeTranslation: 18,
      lineSpacing: 2.2,
      showTafsir: false,
      selectedTafsirId: 'ur.maududi', // Default to Tafheem
      showTajweedMode: true
  });

  // Re-fetch Surah if Tafsir setting changes while inside a Surah
  useEffect(() => {
    if (selectedSurah && settings.showTafsir) {
        // Check if current loaded surah has tafsir data, if not, re-fetch
        if (!selectedSurah.ayahs[0].textTafsir) {
            handleSurahClick(selectedSurah as SurahMetadata, true); // Force reload with Tafsir
        }
    }
  }, [settings.showTafsir, settings.selectedTafsirId]);

  const handleSurahClick = async (metadata: SurahMetadata, forceTafsirFetch = false) => {
      setIsLoading(true);
      setError('');
      try {
          // Pass Tafsir ID only if enabled
          const tafsirToFetch = (settings.showTafsir || forceTafsirFetch) ? settings.selectedTafsirId : undefined;
          const fullSurah = await quranService.getSurah(metadata, tafsirToFetch);
          setSelectedSurah(fullSurah);
      } catch (err) {
          setError("Connection failed. Please ensure you are online to download this Surah content.");
      } finally {
          setIsLoading(false);
      }
  };

  // --- Settings Controls Handlers ---
  const adjustFontSize = (delta: number) => {
      setSettings(prev => ({
          ...prev,
          fontSizeArabic: Math.max(20, Math.min(60, prev.fontSizeArabic + delta)),
          fontSizeTranslation: Math.max(12, Math.min(30, prev.fontSizeTranslation + (delta * 0.5)))
      }));
  };

  const adjustSpacing = (delta: number) => {
      setSettings(prev => ({
          ...prev,
          lineSpacing: Math.max(1.5, Math.min(4.0, prev.lineSpacing + delta))
      }));
  };

  const toggleTafsir = () => {
      setSettings(prev => ({ ...prev, showTafsir: !prev.showTafsir }));
  };

  // --- SURAH INDEX VIEW ---
  if (!selectedSurah && !isLoading) {
    return (
      <div className="h-full overflow-y-auto scrollbar-hide p-4 md:p-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <span className="text-xs font-bold text-antique-600 uppercase tracking-[0.3em] mb-2 block">The Holy Book</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink-900">Al-Quran Al-Kareem</h2>
            <div className="w-24 h-1 bg-antique-400 mx-auto mt-6 rounded-full"></div>
        </div>
        
        {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center mb-8 border border-red-200">
                {error}
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_SURAHS_METADATA.map((surah) => (
            <button
              key={surah.number}
              onClick={() => handleSurahClick(surah)}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-cream-200 hover:border-antique-400 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 relative flex items-center justify-center bg-cream-100 rounded-lg border border-antique-200 group-hover:bg-antique-500 group-hover:text-white transition-colors">
                   <span className="text-sm font-bold font-mono">{surah.number}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-ink-900 group-hover:text-antique-700">{surah.nameEnglish}</h3>
                  <p className="text-xs text-ink-500 font-medium">{surah.meaningEnglish}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-arabic text-xl text-sage-700 leading-none mb-1">{surah.nameArabic}</p>
                <p className="text-[9px] text-ink-400 uppercase tracking-wide font-bold">{surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
      return (
          <div className="h-full flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-700 rounded-full animate-spin"></div>
              <p className="font-heading text-xl text-ink-600">Retrieving Sacred Text...</p>
              <p className="text-xs text-ink-400">
                  {settings.showTafsir ? "Downloading Ayahs and Commentary..." : "Downloading Ayahs..."}
              </p>
          </div>
      );
  }

  // --- READING VIEW ---
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto bg-white md:shadow-2xl md:my-4 md:rounded-2xl overflow-hidden border border-cream-200">
      
      {/* COMMAND BAR (Toolbar) */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 border-b border-cream-200 bg-cream-50/80 backdrop-blur-md sticky top-0 z-30 shadow-sm gap-4 md:gap-0">
        
        {/* Left: Navigation */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <button 
            onClick={() => setSelectedSurah(null)}
            className="group flex items-center gap-2 text-ink-500 hover:text-ink-900 transition-colors"
            >
            <div className="w-8 h-8 rounded-full bg-white border border-cream-300 flex items-center justify-center group-hover:bg-cream-200">←</div>
            <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Index</span>
            </button>
            
            <div className="text-center md:text-left">
            <h2 className="font-heading text-lg text-ink-900 font-bold leading-none">{selectedSurah?.nameEnglish}</h2>
            <span className="text-[10px] text-ink-400 uppercase font-bold">{selectedSurah?.revelationType} • {selectedSurah?.ayahs.length} Ayahs</span>
            </div>
        </div>

        {/* Right: Reading Controls */}
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
             
             {/* Zoom Controls */}
             <div className="flex items-center bg-white border border-cream-200 rounded-lg p-1 shadow-sm">
                 <button onClick={() => adjustFontSize(-2)} className="p-1.5 hover:bg-cream-100 rounded text-ink-500 text-xs">A-</button>
                 <div className="w-px h-4 bg-cream-200 mx-1"></div>
                 <button onClick={() => adjustFontSize(2)} className="p-1.5 hover:bg-cream-100 rounded text-ink-900 font-bold text-sm">A+</button>
             </div>

             {/* Spacing Controls */}
             <div className="flex items-center bg-white border border-cream-200 rounded-lg p-1 shadow-sm">
                 <button onClick={() => adjustSpacing(-0.2)} className="p-1.5 hover:bg-cream-100 rounded text-ink-500" title="Decrease Spacing">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16M12 4v2m0 12v2"/></svg>
                 </button>
                 <div className="w-px h-4 bg-cream-200 mx-1"></div>
                 <button onClick={() => adjustSpacing(0.2)} className="p-1.5 hover:bg-cream-100 rounded text-ink-900" title="Increase Spacing">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16M12 2v6m0 8v6"/></svg>
                 </button>
             </div>

             {/* Tafsir Settings */}
             <div className="flex items-center gap-2 bg-white border border-cream-200 rounded-lg p-1 pr-3 shadow-sm">
                <button 
                    onClick={toggleTafsir}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${settings.showTafsir ? 'bg-antique-500 text-white' : 'bg-cream-50 text-ink-500 hover:bg-cream-100'}`}
                >
                    Tafsir
                </button>
                {settings.showTafsir && (
                    <select 
                        value={settings.selectedTafsirId}
                        onChange={(e) => setSettings(prev => ({ ...prev, selectedTafsirId: e.target.value }))}
                        className="text-xs bg-transparent border-none outline-none font-medium text-ink-700 cursor-pointer max-w-[100px] md:max-w-none"
                    >
                        {AVAILABLE_TAFSIRS.map(t => (
                            <option key={t.id} value={t.apiEditionId}>{t.name}</option>
                        ))}
                    </select>
                )}
             </div>

        </div>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-texture-paper">
        
        <div className="max-w-4xl mx-auto p-6 md:p-12">
            {/* Bismillah */}
            {selectedSurah?.number !== 9 && (
                <div className="text-center mb-16 py-8 border-b border-antique-200/30">
                    <p className="font-arabic text-4xl md:text-6xl text-ink-900 mb-6 select-none drop-shadow-sm leading-[2.5]">
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                    </p>
                </div>
            )}

            <div className="space-y-16">
            {selectedSurah?.ayahs.map((ayah) => (
                <div key={ayah.number} className="relative group animate-fade-in-up">
                
                {/* Arabic Section */}
                <div className="w-full mb-8 text-center md:text-right bg-white/50 rounded-3xl p-4 md:p-6 shadow-sm border border-cream-100/50">
                    <p 
                        className="font-arabic dir-rtl font-medium"
                        style={{ 
                            fontSize: `${settings.fontSizeArabic}px`, 
                            lineHeight: settings.lineSpacing,
                            // Dynamic Color Logic: 
                            // If Tajweed Mode is ON, use a deep, rich, distinct color (#4A3B2C - Dark Sepia/Gold-Brown)
                            // This simulates the "special" ink of a Mushaf.
                            color: settings.showTajweedMode ? '#4A3B2C' : '#000000' 
                        }}
                    >
                        {ayah.textArabic} 
                        <span className="inline-flex items-center justify-center mx-3 align-middle select-none text-antique-400/80 text-[0.5em]">
                           ۝
                        </span>
                    </p>
                </div>

                {/* Translations Section */}
                <div className="flex flex-col gap-6 md:px-8">
                    {/* Urdu Translation (Black) */}
                    <p 
                        className="font-urdu text-ink-900 dir-rtl text-center md:text-right border-r-4 border-sage-200 pr-4"
                        style={{ 
                            fontSize: `${settings.fontSizeTranslation + 4}px`, // Urdu needs slightly larger base
                            lineHeight: settings.lineSpacing 
                        }}
                    >
                        {ayah.textUrdu}
                    </p>
                    
                    {/* English Translation (Slate/Grey) */}
                    <p 
                        className="font-body text-slate-600 text-center md:text-left pl-4 border-l-4 border-cream-200 md:border-l-0"
                        style={{ 
                            fontSize: `${settings.fontSizeTranslation}px`,
                            lineHeight: settings.lineSpacing * 0.8 
                        }}
                    >
                        {ayah.textEnglish}
                    </p>
                </div>

                {/* Tafsir Section (Expandable) */}
                {settings.showTafsir && (
                    <div className="mt-8 mx-2 md:mx-8 bg-cream-50 border border-antique-200 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-antique-400"></div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-antique-700">
                                {AVAILABLE_TAFSIRS.find(t => t.apiEditionId === settings.selectedTafsirId)?.name || "Tafsir"}
                            </span>
                        </div>
                        <p 
                            className="font-urdu text-ink-800 leading-loose text-right dir-rtl text-lg"
                        >
                            {ayah.textTafsir || "Tafsir content loading or unavailable for this Ayah."}
                        </p>
                    </div>
                )}
                
                {/* Action Bar (Hidden by default, shown on hover) */}
                <div className="flex justify-center md:justify-start gap-4 mt-6 opacity-30 group-hover:opacity-100 transition-opacity duration-300 md:px-8">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-sage-600 hover:text-sage-800 flex items-center gap-1">
                        <span>▶</span> Play Audio
                    </button>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-ink-400 hover:text-ink-900 flex items-center gap-1">
                        <span>🔗</span> Copy Ayah
                    </button>
                </div>
                
                {/* Divider */}
                <div className="w-24 h-px bg-cream-300 mx-auto mt-12 opacity-50"></div>

                </div>
            ))}
            </div>

            {/* Footer Element */}
            <div className="mt-24 text-center text-antique-300 pb-12">
                <span className="text-4xl select-none">۞</span>
            </div>
        </div>
      </div>
    </div>
  );
};
