import React, { useState } from 'react';
import { backend } from '../services/mockBackend';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await backend.login(email);
      if (user) {
        onLoginSuccess(user);
        onClose();
      } else {
        setError('User not found. Try "imam@noor.com" or "admin@noor.com"');
      }
    } catch (err) {
      setError('System error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-cream-300 animate-fade-in-up">
        
        <div className="bg-sage-800 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-texture-paper opacity-10 mix-blend-overlay"></div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-inner text-3xl relative z-10 border border-white/20">
                🕌
            </div>
            <h2 className="text-2xl font-heading font-bold text-cream-50 relative z-10">Portal Access</h2>
            <p className="text-sage-200 text-sm relative z-10">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-xl text-sm border border-red-100 text-center font-medium">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-ink-400">Email Address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="imam@noor.com"
                    className="w-full p-4 bg-cream-50 border border-cream-200 rounded-xl focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all text-ink-900"
                    autoFocus
                />
                <p className="text-[10px] text-ink-400">Demo Accounts: <b>imam@noor.com</b>, <b>admin@noor.com</b></p>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-ink-900 text-cream-50 font-bold rounded-xl hover:bg-sage-800 transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
            >
                {loading ? 'Verifying...' : 'Enter Portal'}
            </button>
        </form>
        
        <div className="p-4 bg-cream-50 text-center border-t border-cream-100">
            <button onClick={onClose} className="text-sm text-ink-500 hover:text-sage-700 font-medium">
                Continue as Guest
            </button>
        </div>
      </div>
    </div>
  );
};