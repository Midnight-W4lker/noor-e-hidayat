
export type ViewType = 'dashboard' | 'quran' | 'hadith' | 'ai' | 'masjid' | 'khutbah_builder' | 'settings';

export type UserRole = 'guest' | 'user' | 'imam' | 'masjid_admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  masjidId?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Ayah {
  number: number; // Ayah number in Surah
  textArabic: string;
  textUrdu: string;
  textEnglish: string;
  textTafsir?: string; // Optional Tafsir content
  numberInSurah?: number;
  juz?: number;
}

export interface SurahMetadata {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameUrdu: string; // Transliteration or Translation
  meaningEnglish: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
}

// Extended interface for when full text is loaded
export interface Surah extends SurahMetadata {
  ayahs: Ayah[];
}

export interface Hadith {
  id: string;
  bookId: string;
  chapterName: string;
  narrator: string;
  textArabic: string;
  textUrdu: string;
  textEnglish: string;
  grade: 'Sahih' | 'Hasan' | 'Daif' | 'Hadith Qudsi';
}

export interface HadithBook {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  author: string;
  hadithCount: number;
}

export interface PrayerTime {
  name: string;
  time: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  references?: string[];
}

export interface Masjid {
  id: string;
  name: string;
  address: string;
  imams: string[];
  facilities: string[];
  capacity: number;
  nextJummah: string;
  coordinates?: { lat: number; lng: number };
  isVerified: boolean;
}

export interface KhutbahDraft {
  id: string;
  authorId: string;
  title: string;
  date: string;
  content: string; 
  status: 'draft' | 'published';
  tags: string[];
}

export interface QuranSettings {
  fontSizeArabic: number;
  fontSizeTranslation: number;
  lineSpacing: number;
  showTafsir: boolean;
  selectedTafsirId: string;
  showTajweedMode: boolean;
}

export interface TafsirOption {
  id: string;
  name: string;
  author: string;
  apiEditionId: string; // The ID used by alquran.cloud
}
