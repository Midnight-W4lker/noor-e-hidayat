import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

export const KhutbahBuilder: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleAIAssist = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const points = await geminiService.generateKhutbahPoints(topic);
      setContent(prev => prev + (prev ? "\n\n" : "") + points);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-row overflow-hidden bg-cream-50">
      
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col h-full relative shadow-2xl z-10">
        
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-cream-200 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <input 
                    type="text" 
                    placeholder="Untitled Khutbah..." 
                    className="bg-transparent text-lg font-heading font-bold text-ink-900 placeholder-ink-300 outline-none min-w-[200px]"
                />
                <span className="px-2 py-0.5 bg-sage-100 text-sage-700 text-[10px] font-bold uppercase rounded tracking-wide">Draft</span>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="p-2 text-ink-400 hover:text-sage-700 md:hidden"
                >
                   ✨ AI
                </button>
                <button className="px-4 py-2 text-xs font-bold text-cream-50 bg-ink-900 rounded-lg hover:bg-sage-800 transition-colors">
                    Save
                </button>
            </div>
        </div>

        {/* Paper Editor */}
        <div className="flex-1 overflow-y-auto bg-white p-8 md:p-12">
             <div className="max-w-3xl mx-auto h-full">
                <textarea 
                    className="w-full h-full resize-none outline-none text-lg leading-loose font-serif text-ink-800 placeholder-ink-200 bg-transparent"
                    placeholder="In the name of Allah, the Most Gracious, the Most Merciful..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
             </div>
        </div>
      </div>

      {/* AI Sidebar (Tools) */}
      <div className={`
        w-80 bg-cream-100 border-l border-cream-200 flex flex-col transition-all duration-300 absolute md:relative right-0 h-full z-20 shadow-xl md:shadow-none
        ${showSidebar ? 'translate-x-0' : 'translate-x-full md:translate-x-0 hidden md:flex'}
      `}>
         <div className="p-5 border-b border-cream-200 bg-cream-50">
            <h3 className="font-heading font-bold text-ink-900 flex items-center gap-2">
                <span className="text-antique-600">✦</span> Copilot
            </h3>
            <p className="text-[10px] text-ink-500 mt-1">AI-assisted references & outlines</p>
         </div>

         <div className="p-5 space-y-6 overflow-y-auto flex-1">
            
            {/* Feature: Generator */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Topic Generator</label>
                <div className="bg-white p-1 rounded-xl border border-cream-300 shadow-sm focus-within:border-sage-500 focus-within:ring-1 focus-within:ring-sage-500/20 transition-all">
                    <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Rights of Parents"
                        className="w-full bg-transparent px-3 py-2 text-sm outline-none text-ink-900"
                    />
                </div>
                <button 
                    onClick={handleAIAssist}
                    disabled={isGenerating || !topic}
                    className="w-full py-2.5 bg-antique-500 text-white text-xs font-bold rounded-lg hover:bg-antique-600 disabled:opacity-50 transition-colors shadow-sm"
                >
                    {isGenerating ? 'Thinking...' : 'Generate Outline'}
                </button>
            </div>

            <hr className="border-cream-200" />

            {/* Feature: Snippets */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Quick Insert</label>
                <div className="grid grid-cols-1 gap-2">
                    {['Khutbah Al-Haajah', 'Closing Dua', 'Salawat'].map(item => (
                        <button key={item} className="flex items-center justify-between w-full px-3 py-2 bg-white border border-cream-200 rounded-lg text-xs font-medium text-ink-700 hover:border-antique-400 hover:text-antique-700 transition-all group">
                            <span>{item}</span>
                            <span className="text-antique-300 group-hover:text-antique-600">+</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tip Card */}
            <div className="mt-auto bg-sage-50 p-4 rounded-xl border border-sage-100">
                <p className="text-xs text-sage-800 italic leading-relaxed">
                    "Speak to people according to their level of understanding."
                </p>
                <p className="text-[10px] text-sage-600 font-bold mt-2 text-right">— Ali ibn Abi Talib (RA)</p>
            </div>

         </div>
      </div>

    </div>
  );
};