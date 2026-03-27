
import { Surah, SurahMetadata, Ayah } from '../types';

const CACHE_PREFIX = 'nh_quran_surah_';

// API Endpoints (Using AlQuran.cloud free API)
// We fetch 3 editions: Arabic (Uthmani), Urdu (Jalandhry), English (Sahih International)
const API_BASE = 'https://api.alquran.cloud/v1';

export class QuranService {
  
  /**
   * Fetches a Surah either from local storage (cache) or from the API.
   * Supports optional Tafsir injection.
   */
  async getSurah(metadata: SurahMetadata, tafsirId?: string): Promise<Surah> {
    // Create a unique cache key combining surah number and tafsir ID (if present)
    const cacheKey = `${CACHE_PREFIX}${metadata.number}${tafsirId ? `_${tafsirId}` : ''}`;
    
    // 1. Check Cache
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    // 2. Fetch from API
    try {
      const surah = await this.fetchFromApi(metadata, tafsirId);
      // 3. Save to Cache
      this.saveToCache(cacheKey, surah);
      return surah;
    } catch (error) {
      console.error("Failed to fetch Surah:", error);
      throw new Error("Could not load Surah content. Please check your internet connection.");
    }
  }

  private getFromCache(key: string): Surah | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.warn("Corrupt cache for key", key);
        localStorage.removeItem(key);
      }
    }
    return null;
  }

  private saveToCache(key: string, surah: Surah) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(surah));
    } catch (e) {
        console.warn("Quota exceeded, attempting cleanup...");
        // Basic cleanup strategy: remove keys starting with our prefix
        // In production, prefer IndexedDB
    }
  }

  private async fetchFromApi(metadata: SurahMetadata, tafsirId?: string): Promise<Surah> {
    // Construct the editions string
    // Always fetch: quran-uthmani (Arabic), ur.jalandhry (Urdu), en.sahih (English)
    // Optional: tafsirId (e.g., ur.maududi)
    
    let editions = 'quran-uthmani,ur.jalandhry,en.sahih';
    if (tafsirId) {
        editions += `,${tafsirId}`;
    }

    const response = await fetch(`${API_BASE}/surah/${metadata.number}/editions/${editions}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const json = await response.json();
    
    // API returns an array of editions in the order requested
    const arabicData = json.data[0];
    const urduData = json.data[1];
    const englishData = json.data[2];
    const tafsirData = tafsirId ? json.data[3] : null;

    // Merge them into our Ayah structure
    const ayahs: Ayah[] = arabicData.ayahs.map((ayah: any, index: number) => ({
      number: ayah.numberInSurah,
      textArabic: ayah.text,
      textUrdu: urduData.ayahs[index].text,
      textEnglish: englishData.ayahs[index].text,
      textTafsir: tafsirData ? tafsirData.ayahs[index].text : undefined,
      numberInSurah: ayah.numberInSurah,
      juz: ayah.juz
    }));

    return {
      ...metadata,
      ayahs
    };
  }
}

export const quranService = new QuranService();
