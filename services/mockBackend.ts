import { User, Masjid, KhutbahDraft } from '../types';
import { MOCK_MASJIDS, MOCK_KHUTBAHS } from '../constants';

// Database Keys
const DB_KEYS = {
  USERS: 'nh_users',
  MASJIDS: 'nh_masjids',
  KHUTBAHS: 'nh_khutbahs',
  CURRENT_USER: 'nh_current_user_session'
};

class MockBackendService {
  constructor() {
    // Ensure code runs only in browser
    if (typeof window !== 'undefined') {
      this.initializeDB();
    }
  }

  private initializeDB() {
    // Seed Data if missing
    if (!localStorage.getItem(DB_KEYS.MASJIDS)) {
      localStorage.setItem(DB_KEYS.MASJIDS, JSON.stringify(MOCK_MASJIDS));
    }
    if (!localStorage.getItem(DB_KEYS.KHUTBAHS)) {
      localStorage.setItem(DB_KEYS.KHUTBAHS, JSON.stringify(MOCK_KHUTBAHS));
    }
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        const defaultUsers: User[] = [
            {
                id: 'imam_ahmed',
                name: 'Imam Ahmed',
                email: 'imam@noor.com',
                role: 'imam',
                masjidId: '1',
            },
            {
                id: 'admin_1',
                name: 'System Admin',
                email: 'admin@noor.com',
                role: 'super_admin'
            }
        ];
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
    }
  }

  // --- Auth Methods ---

  async login(email: string): Promise<User | null> {
    // Simulate Network Latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const users: User[] = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
      return user;
    }
    return null;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(DB_KEYS.CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  }

  // --- Masjid Methods ---

  async getMasjids(): Promise<Masjid[]> {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(DB_KEYS.MASJIDS) || '[]');
  }

  async registerMasjid(masjidData: Omit<Masjid, 'id' | 'isVerified'>): Promise<Masjid> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const masjids = await this.getMasjids();
    const newMasjid: Masjid = {
        ...masjidData,
        id: Date.now().toString(),
        isVerified: false 
    };
    
    masjids.push(newMasjid);
    localStorage.setItem(DB_KEYS.MASJIDS, JSON.stringify(masjids));
    return newMasjid;
  }

  // --- Khutbah Methods ---

  async getKhutbahs(userId: string): Promise<KhutbahDraft[]> {
    if (typeof window === 'undefined') return [];
    const all = JSON.parse(localStorage.getItem(DB_KEYS.KHUTBAHS) || '[]');
    return all.filter((k: KhutbahDraft) => k.authorId === userId);
  }

  async saveKhutbah(draft: KhutbahDraft): Promise<void> {
      const all = JSON.parse(localStorage.getItem(DB_KEYS.KHUTBAHS) || '[]');
      const index = all.findIndex((k: KhutbahDraft) => k.id === draft.id);
      
      if (index >= 0) {
          all[index] = draft;
      } else {
          all.push(draft);
      }
      localStorage.setItem(DB_KEYS.KHUTBAHS, JSON.stringify(all));
  }
}

export const backend = new MockBackendService();
