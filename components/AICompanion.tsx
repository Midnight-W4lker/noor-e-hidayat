import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { localAiService } from '../services/localAiService';

export const AICompanion: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "As-salamu alaykum. I am Noor, your local guardian of knowledge. I rely on the Quran, Sahih Hadith, and fiqh resources bundled inside this portal."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await localAiService.sendMessage(history, userMsg.text);
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };

      setHistory(prev => [...prev, modelMsg]);
    } catch (e) {
       const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, I encountered a momentary disconnect. Please ask again."
      };
      setHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto bg-divinity-50 shadow-2xl md:rounded-xl overflow-hidden border border-baghdad-500/20 my-0 md:my-4">
      
      {/* Chat Header */}
      <div className="p-4 border-b border-baghdad-500/20 flex items-center gap-4 bg-white">
        <div className="w-12 h-12 rounded-full bg-ink-900 border-2 border-baghdad-500 flex items-center justify-center shadow-md">
           <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-ink-900">Noor AI Guardian</h2>
             <p className="text-xs text-ink-500">Built on the Noor Offline Knowledge Pack</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-pattern-islamic">
        {history.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[85%] md:max-w-[70%] p-5 rounded-2xl shadow-sm relative text-base leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-ink-900 text-divinity-100 rounded-br-none' 
                  : 'bg-white text-ink-800 border border-baghdad-500/20 rounded-bl-none'}
              `}
            >
              <div className="font-body whitespace-pre-wrap">
                {msg.text}
              </div>
              
              <div className={`text-[10px] mt-3 opacity-50 font-bold uppercase tracking-wider flex items-center gap-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                {msg.role === 'user' ? 'You' : 'Noor'}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-baghdad-500/20 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 bg-baghdad-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-baghdad-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-baghdad-500 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-baghdad-500/20 bg-white">
        <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Riba, Inheritance, or History..."
            className="w-full bg-divinity-50 text-ink-900 border border-baghdad-500/30 rounded-xl p-4 pr-12 focus:outline-none focus:border-baghdad-500 focus:ring-1 focus:ring-baghdad-500/50 resize-none h-14 max-h-32 font-body shadow-inner"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 p-2 bg-baghdad-500 text-divinity-100 rounded-lg hover:bg-baghdad-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] text-ink-400 mt-2">
          AI responses are for educational purposes. Consult a scholar for Fatwas.
        </p>
      </div>
    </div>
  );
};
