import { Ayah, Surah, SurahMetadata } from '../types';
import { ALL_SURAHS_METADATA } from '../constants';

const METADATA_MAP = new Map<number, SurahMetadata>(
  ALL_SURAHS_METADATA.map((metadata) => [metadata.number, metadata])
);

const buildOfflineSurah = (number: number, ayahs: Ayah[]): Surah => {
  const metadata = METADATA_MAP.get(number);
  if (!metadata) {
    throw new Error(`Metadata missing for Surah ${number}`);
  }
  return { ...metadata, ayahs };
};

const OFFLINE_SURAH_BUNDLE: Record<number, Surah> = {
  1: buildOfflineSurah(1, [
    {
      number: 1,
      numberInSurah: 1,
      juz: 1,
      textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      textUrdu: 'تمام تعریفیں اللہ ہی کے لیے ہیں، جو سارے جہانوں کا رب ہے۔',
      textEnglish: 'All praise is due to Allah, Lord of the worlds.',
      textTafsir: 'Praise acknowledges the Creator before seeking guidance.',
    },
    {
      number: 2,
      numberInSurah: 2,
      juz: 1,
      textArabic: 'الرَّحْمَـٰنِ الرَّحِيمِ',
      textUrdu: 'نہایت رحم کرنے والا، بڑا مہربان۔',
      textEnglish: 'The Entirely Merciful, the Especially Merciful.',
      textTafsir: 'Mercy is the lens through which all divine action is viewed.',
    },
    {
      number: 3,
      numberInSurah: 3,
      juz: 1,
      textArabic: 'مَالِكِ يَوْمِ الدِّينِ',
      textUrdu: 'روزِ جزا کا مالک۔',
      textEnglish: 'Sovereign of the Day of Recompense.',
      textTafsir: 'Reminds the believer that every deed is accountable.',
    },
    {
      number: 4,
      numberInSurah: 4,
      juz: 1,
      textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      textUrdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔',
      textEnglish: 'It is You we worship, and You we ask for help.',
      textTafsir: 'A declaration of exclusive devotion and dependence.',
    },
    {
      number: 5,
      numberInSurah: 5,
      juz: 1,
      textArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      textUrdu: 'ہمیں سیدھا راستہ دکھا۔',
      textEnglish: 'Guide us to the straight path.',
      textTafsir: 'Guidance is the request that carries the rest of the prayer.',
    },
    {
      number: 6,
      numberInSurah: 6,
      juz: 1,
      textArabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
      textUrdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا،',
      textEnglish: 'The path of those upon whom You have bestowed favor,',
      textTafsir: 'Points toward following those beloved by Allah.',
    },
    {
      number: 7,
      numberInSurah: 7,
      juz: 1,
      textArabic: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      textUrdu: 'نہ ان لوگوں کا جو غضب میں مبتلا ہوئے اور نہ گمراہوں کا۔',
      textEnglish: 'Not of those who have evoked [Your] anger or of those who are astray.',
      textTafsir: 'Avoid the extremes of arrogance and deviation.',
    },
  ]),
  112: buildOfflineSurah(112, [
    {
      number: 1,
      numberInSurah: 1,
      juz: 30,
      textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      textUrdu: 'کہہ دو، وہ اللہ ایک ہے،',
      textEnglish: 'Say, He is Allah, [who is] One,',
      textTafsir: 'Affirms absolute monotheism.',
    },
    {
      number: 2,
      numberInSurah: 2,
      juz: 30,
      textArabic: 'اللَّهُ الصَّمَدُ',
      textUrdu: 'اللہ پکا ٹھکانہ ہے',
      textEnglish: 'Allah, the Eternal Refuge.',
      textTafsir: 'Allah is self-sufficient, needing nothing.',
    },
    {
      number: 3,
      numberInSurah: 3,
      juz: 30,
      textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      textUrdu: 'نہ اس کا کوئی اولاد ہے، نہ وہ کسی کا اولاد ہے',
      textEnglish: 'He neither begets nor is born,',
      textTafsir: 'Rejects notions of lineage or dependence.',
    },
    {
      number: 4,
      numberInSurah: 4,
      juz: 30,
      textArabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      textUrdu: 'اور نہ کوئی اس کا ہمسر ہے',
      textEnglish: 'Nor is there to Him any equivalent.',
      textTafsir: 'There is no parallel to Allah in essence or attribute.',
    },
  ]),
};

export const OFFLINE_SURAH_NUMBERS = Object.keys(OFFLINE_SURAH_BUNDLE).map(Number);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class QuranService {
  private bundle = OFFLINE_SURAH_BUNDLE;

  async getSurah(metadata: SurahMetadata): Promise<Surah> {
    await wait(160);
    const surah = this.bundle[metadata.number];
    if (!surah) {
      throw new Error(
        `${metadata.nameEnglish} is not part of the offline bundle yet. Choose one of ${OFFLINE_SURAH_NUMBERS.join(
          ', '
        )} or add the Surah manually.`
      );
    }
    return {
      ...surah,
      ayahs: surah.ayahs.map((ayah) => ({ ...ayah })),
    };
  }

  getAvailableSurahs(): number[] {
    return OFFLINE_SURAH_NUMBERS;
  }
}

export const quranService = new QuranService();
