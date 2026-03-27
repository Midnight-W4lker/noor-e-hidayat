import React, { useState, useEffect } from 'react';
import { backend } from '../services/mockBackend';
import { Masjid, User } from '../types';

interface MasjidManagerProps {
  currentUser: User | null;
}

export const MasjidManager: React.FC<MasjidManagerProps> = ({ currentUser }) => {
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'register'>('list');
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formCapacity, setFormCapacity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadMasjids();
  }, []);

  const loadMasjids = async () => {
    const data = await backend.getMasjids();
    setMasjids(data);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await backend.registerMasjid({
            name: formName,
            address: formAddress,
            imams: [currentUser?.name || 'Unknown'],
            facilities: ['Basic'],
            capacity: parseInt(formCapacity) || 100,
            nextJummah: '01:30 PM',
        });
        await loadMasjids();
        setViewMode('list');
        setFormName('');
        setFormAddress('');
        setFormCapacity('');
    } catch (err) {
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4 md:p-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 pb-6 border-b border-cream-200">
        <div>
          <span className="text-xs font-bold text-sage-600 uppercase tracking-[0.2em]">Community</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-900 mt-1">Masjid Network</h2>
        </div>
        
        {currentUser && (
            <div className="bg-white p-1 rounded-xl border border-cream-200 flex shadow-sm mt-4 md:mt-0">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all ${viewMode === 'list' ? 'bg-ink-900 text-cream-50 shadow-md' : 'text-ink-500 hover:text-ink-900'}`}
                >
                    Directory
                </button>
                <button 
                    onClick={() => setViewMode('register')}
                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all ${viewMode === 'register' ? 'bg-ink-900 text-cream-50 shadow-md' : 'text-ink-500 hover:text-ink-900'}`}
                >
                    + Register
                </button>
            </div>
        )}
      </div>

      {viewMode === 'register' && currentUser ? (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-cream-200">
              <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📝</div>
                  <h3 className="font-heading font-bold text-2xl text-ink-900">Register New Masjid</h3>
                  <p className="text-sm text-ink-500">Add your community center to the Noor network.</p>
              </div>
              
              <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-ink-400 ml-1">Masjid Name</label>
                      <input required value={formName} onChange={e => setFormName(e.target.value)} className="w-full p-4 bg-cream-50 border border-cream-200 rounded-xl outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-all" placeholder="e.g. Masjid Al-Falah" />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-ink-400 ml-1">Location</label>
                      <input required value={formAddress} onChange={e => setFormAddress(e.target.value)} className="w-full p-4 bg-cream-50 border border-cream-200 rounded-xl outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-all" placeholder="Street, City" />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-ink-400 ml-1">Capacity</label>
                      <input type="number" required value={formCapacity} onChange={e => setFormCapacity(e.target.value)} className="w-full p-4 bg-cream-50 border border-cream-200 rounded-xl outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-all" placeholder="500" />
                  </div>
                  <button disabled={isSubmitting} className="w-full py-4 bg-sage-700 text-cream-50 font-bold rounded-xl hover:bg-sage-800 transition-colors shadow-lg mt-4">
                      {isSubmitting ? 'Processing...' : 'Submit Registration'}
                  </button>
              </form>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masjids.map((masjid) => (
            <div key={masjid.id} className="bg-white rounded-2xl p-6 border border-cream-200 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sage-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                
                {!masjid.isVerified && (
                    <span className="absolute top-4 right-4 bg-antique-100 text-antique-800 text-[10px] font-bold px-2 py-1 rounded-full border border-antique-200">Pending</span>
                )}
                
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-sage-700 text-white flex items-center justify-center text-2xl mb-4 shadow-md group-hover:bg-sage-800 transition-colors">
                        🕌
                    </div>
                    
                    <h3 className="font-heading font-bold text-xl text-ink-900 mb-1 line-clamp-1">{masjid.name}</h3>
                    <p className="text-sm text-ink-500 mb-4 truncate">{masjid.address}</p>
                    
                    <div className="flex gap-4 text-xs text-ink-600 font-medium border-t border-cream-100 pt-4">
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-ink-400 font-bold">Capacity</span>
                            <span>{masjid.capacity}</span>
                        </div>
                        <div className="w-px bg-cream-200"></div>
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-ink-400 font-bold">Jummah</span>
                            <span className="text-sage-700 font-bold">{masjid.nextJummah}</span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};