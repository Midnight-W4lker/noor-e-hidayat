import React, { useState } from 'react';
import { MOCK_HADITH_BOOKS, MOCK_HADITHS } from '../constants';
import { HadithBook, Hadith } from '../types';

export const HadithReader: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<HadithBook | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic for Search
  const filteredHadiths = searchQuery 
    ? MOCK_HADITHS.filter(h => 
        h.textEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.textUrdu.includes(searchQuery) ||
        h.textArabic.includes(searchQuery) ||
        h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.chapterName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const isSearching = searchQuery.length > 0;

  // Component for rendering a single Hadith Card
  const HadithCard = ({ hadith, showBookName = false }: { hadith: Hadith, showBookName?: boolean }) => {
      const book = MOCK_HADITH_BOOKS.find(b => b.id === hadith.bookId);
      
      const getBadgeColor = (grade: string) => {
          if (grade === 'Sahih') return 'bg-sage-100 text-sage-800 border-sage-200';
          if (grade === 'Hadith Qudsi') return 'bg-antique-100 text-antique-800 border-antique-200';
          if (grade === 'Hasan') return 'bg-yellow-50 text-yellow-800 border-yellow-200';
          return 'bg-cream-200 text-ink-600 border-cream-300';
      };

      return (
        <div className="bg-cream-50 p-8 rounded-xl border border-cream-200 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-texture-paper opacity-50 pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 bg-antique-500 rounded-full"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-ink-500">{hadith.chapterName}</span>
                    </div>
                    {showBookName && <span className="text-[10px] text-sage-600 font-bold ml-3.5">{book?.nameEnglish}</span>}
                </div>
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase border ${getBadgeColor(hadith.grade)}`}>{hadith.grade}</span>
            </div>
            
            <p className="text-sm text-ink-500 mb-6 italic ml-1">Narrated by <span className="font-bold text-ink-700">{hadith.narrator}</span>:</p>
            
            <div className="bg-white p-6 rounded-xl border border-cream-200 mb-6">
                <p className="font-arabic text-2xl md:text-3xl leading-[2.4] text-right text-ink-900 dir-rtl">
                    {hadith.textArabic}
                </p>
            </div>
            
            <div className="space-y-6 px-2">
                <p className="font-urdu text-xl text-right text-ink-800 leading-[2.2] dir-rtl border-r-4 border-sage-200 pr-4">{hadith.textUrdu}</p>
                <p className="font-body text-lg text-ink-700 leading-relaxed pl-4 border-l-2 border-cream-300">{hadith.textEnglish}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-cream-200 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs font-bold uppercase text-ink-400 hover:text-sage-700 tracking-widest">Share Hadith</button>
            </div>
        </div>
      );
  };

  // --- MAIN VIEW (Search or Book List) ---
  if (!selectedBook) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto h-full overflow-y-auto scrollbar-hide">
        
        <div className="text-center mb-12 relative">
            <span className="text-xs font-bold text-sage-600 uppercase tracking-[0.3em] mb-2 block">Authentic Wisdom</span>
            <h2 className="text-4xl font-heading font-bold text-ink-900 mb-2">Hadith Library</h2>
            
            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto relative group">
                <input 
                    type="text"
                    placeholder="Search topics like 'Prayer', 'Charity', or 'Niyyah'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 pl-14 pr-4 bg-white border border-cream-300 rounded-2xl shadow-soft focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 outline-none text-ink-900 font-body transition-all text-lg placeholder-ink-300"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-ink-300 group-focus-within:text-sage-500 transition-colors">🔍</span>
            </div>
        </div>
        
        {isSearching ? (
            // SEARCH RESULTS VIEW
            <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto">
                <div className="flex items-center justify-between px-2 border-b border-cream-200 pb-2">
                    <h3 className="font-bold text-ink-500 uppercase text-xs tracking-widest">Search Results</h3>
                    <span className="text-xs font-bold bg-ink-900 text-cream-50 px-2 py-0.5 rounded">{filteredHadiths.length}</span>
                </div>
                
                {filteredHadiths.length > 0 ? (
                    filteredHadiths.map(hadith => <HadithCard key={hadith.id} hadith={hadith} showBookName={true} />)
                ) : (
                    <div className="text-center py-16 opacity-50">
                        <p className="text-4xl mb-4">🍂</p>
                        <p className="font-heading text-xl text-ink-600">No wisdom found matching your search.</p>
                        <p className="text-sm text-ink-400 mt-2">Try broader terms like "Faith" or "Patience".</p>
                    </div>
                )}
            </div>
        ) : (
            // BOOK LIST VIEW
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up pb-10">
                {MOCK_HADITH_BOOKS.map(book => (
                    <button 
                        key={book.id}
                        onClick={() => setSelectedBook(book)}
                        className="bg-white p-6 rounded-2xl border border-cream-200 hover:border-antique-400 hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300 group text-left relative overflow-hidden flex flex-col h-full"
                    >
                        <div className="absolute top-0 right-0 bg-cream-50 w-32 h-32 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 z-0"></div>
                        
                        <div className="relative z-10 mb-auto">
                            <p className="font-arabic text-2xl text-sage-700 mb-2 text-right dir-rtl leading-none py-2">{book.nameArabic}</p>
                            <h3 className="font-heading font-bold text-2xl text-ink-900 group-hover:text-antique-700 leading-tight mb-1">{book.nameEnglish}</h3>
                            <p className="text-sm text-ink-500 font-medium">{book.author}</p>
                        </div>
                        
                        <div className="mt-8 pt-4 border-t border-cream-100 flex justify-between items-center relative z-10">
                             <span className="px-3 py-1 bg-cream-100 text-ink-600 text-[10px] font-bold uppercase rounded-full tracking-wide group-hover:bg-antique-500 group-hover:text-white transition-colors">
                                {book.hadithCount.toLocaleString()} Hadiths
                             </span>
                             <span className="text-antique-400 text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </button>
                ))}
            </div>
        )}
      </div>
    );
  }

  // --- SINGLE BOOK VIEW ---
  const bookHadiths = MOCK_HADITHS.filter(h => h.bookId === selectedBook.id);

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto bg-white shadow-2xl my-0 md:my-4 rounded-none md:rounded-2xl overflow-hidden border-x border-cream-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200 bg-cream-50/90 backdrop-blur sticky top-0 z-10">
            <button onClick={() => setSelectedBook(null)} className="flex items-center gap-2 text-ink-500 hover:text-ink-900 group transition-colors">
                <div className="w-8 h-8 rounded-full border border-cream-300 flex items-center justify-center group-hover:bg-white">←</div>
                <span className="font-bold text-xs uppercase tracking-widest">Library</span>
            </button>
            
            <div className="text-center">
                <h2 className="font-heading font-bold text-xl text-ink-900">{selectedBook.nameEnglish}</h2>
                <p className="text-[10px] text-sage-600 font-bold uppercase tracking-widest">{selectedBook.author}</p>
            </div>
            
            <div className="w-20"></div> 
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-texture-paper space-y-8">
            {bookHadiths.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">📿</div>
                    <h3 className="font-heading text-2xl text-ink-900 font-bold mb-2">Collection Digitizing</h3>
                    <p className="text-ink-500 max-w-md mx-auto">We are currently verifying the metadata for this collection. Please check back soon.</p>
                </div>
            ) : (
                bookHadiths.map(hadith => (
                    <HadithCard key={hadith.id} hadith={hadith} />
                ))
            )}
        </div>
    </div>
  );
};