
import React from 'react';
import { SurahMetadata, PrayerTime, Masjid, KhutbahDraft, HadithBook, Hadith, Surah, TafsirOption } from './types';

export const APP_NAME = "Noor-e-Hidayat";

export const MOCK_PRAYER_TIMES: PrayerTime[] = [
  { name: 'Fajr', time: '05:12 AM', icon: '🌅' },
  { name: 'Dhuhr', time: '12:30 PM', icon: '☀️' },
  { name: 'Asr', time: '03:45 PM', icon: '🌤️' },
  { name: 'Maghrib', time: '06:15 PM', icon: '🌇' },
  { name: 'Isha', time: '07:45 PM', icon: '🌙' },
];

export const AVAILABLE_TAFSIRS: TafsirOption[] = [
  { id: 'tafheem', name: 'Tafheem-ul-Quran', author: 'Abul Ala Maududi', apiEditionId: 'ur.maududi' },
  { id: 'junagarhi', name: 'Tafseer Junagarhi', author: 'Maulana Muhammad Junagarhi', apiEditionId: 'ur.junagarhi' },
  // Tibyan-ul-Quran is not available on the public API, mapping to a fallback for demo purposes or showing placeholder logic
  { id: 'tibyan', name: 'Tibyan-ul-Quran', author: 'Ghulam Rasul Sa\'idi', apiEditionId: 'ur.maududi' }, 
];

export const MOCK_HADITH_BOOKS: HadithBook[] = [
  { id: 'bukhari', nameEnglish: 'Sahih Al-Bukhari', nameArabic: 'صحيح البخاري', author: 'Imam Bukhari', hadithCount: 7563 },
  { id: 'muslim', nameEnglish: 'Sahih Muslim', nameArabic: 'صحيح مسلم', author: 'Imam Muslim', hadithCount: 3033 },
  { id: 'nawawi', nameEnglish: '40 Hadith Nawawi', nameArabic: 'الأربعون النووية', author: 'Imam Nawawi', hadithCount: 42 },
  { id: 'tirmidhi', nameEnglish: 'Jami` at-Tirmidhi', nameArabic: 'جامع الترمذي', author: 'Imam Tirmidhi', hadithCount: 3956 },
  { id: 'abudawud', nameEnglish: 'Sunan Abu Dawud', nameArabic: 'سنن أبي داود', author: 'Abu Dawud', hadithCount: 5274 },
  { id: 'nasai', nameEnglish: 'Sunan an-Nasa\'i', nameArabic: 'سنن النسائي', author: 'Imam An-Nasa\'i', hadithCount: 5758 },
];

export const MOCK_HADITHS: Hadith[] = [
  // --- SAHIH BUKHARI ---
  {
    id: 'bukhari_1',
    bookId: 'bukhari',
    chapterName: 'Revelation',
    narrator: "Umar bin Al-Khattab",
    textArabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    textUrdu: "تمام اعمال کا دارومدار نیت پر ہے اور ہر عمل کا نتیجہ ہر انسان کو اس کی نیت کے مطابق ہی ملے گا۔",
    textEnglish: "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.",
    grade: 'Sahih'
  },
  {
    id: 'bukhari_2',
    bookId: 'bukhari',
    chapterName: 'Belief',
    narrator: "Abu Huraira",
    textArabic: "الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
    textUrdu: "ایمان کی ستر سے زیادہ شاخیں ہیں، اور حیاء بھی ایمان کی ایک شاخ ہے۔",
    textEnglish: "Faith (Belief) consists of more than sixty branches (i.e. parts). And Haya (self-respect, modesty, bashfulness, etc.) is a part of faith.",
    grade: 'Sahih'
  },
  {
    id: 'bukhari_3',
    bookId: 'bukhari',
    chapterName: 'Knowledge',
    narrator: "Abdullah bin Amr",
    textArabic: "بَلِّغُوا عَنِّي وَلَوْ آيَةً",
    textUrdu: "مجھ سے پہنچاؤ اگرچہ ایک آیت ہی کیوں نہ ہو۔",
    textEnglish: "Convey (my teachings) to the people even if it were a single sentence.",
    grade: 'Sahih'
  },

  // --- SAHIH MUSLIM ---
  {
    id: 'muslim_1',
    bookId: 'muslim',
    chapterName: 'Faith',
    narrator: "Abu Huraira",
    textArabic: "مَنْ غَشَّنَا فَلَيْسَ مِنَّا",
    textUrdu: "جو ہمیں دھوکہ دے وہ ہم میں سے نہیں ہے۔",
    textEnglish: "Whoever cheats us is not one of us.",
    grade: 'Sahih'
  },
  {
    id: 'muslim_2',
    bookId: 'muslim',
    chapterName: 'General Behavior',
    narrator: "Abu Huraira",
    textArabic: "لاَ يَدْخُلُ الْجَنَّةَ مَنْ لاَ يَأْمَنُ جَارُهُ بَوَائِقَهُ",
    textUrdu: "وہ شخص جنت میں داخل نہیں ہوگا جس کا پڑوسی اس کی شرارتوں سے محفوظ نہ ہو۔",
    textEnglish: "He will not enter Paradise whose neighbor is not secure from his wrongful conduct.",
    grade: 'Sahih'
  },

  // --- 40 HADITH NAWAWI (Expanded Set) ---
  {
    id: 'nawawi_2',
    bookId: 'nawawi',
    chapterName: 'Islam, Iman, Ihsan',
    narrator: "Umar bin Al-Khattab",
    textArabic: "قَالَ: فَأَخْبِرْنِي عَنِ الْإِيمَانِ. قَالَ: أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ",
    textUrdu: "آپ ﷺ نے فرمایا: ایمان یہ ہے کہ تم اللہ پر، اس کے فرشتوں پر، اس کی کتابوں پر، اس کے رسولوں پر، اور آخرت کے دن پر ایمان لاؤ، اور اچھی اور بری تقدیر پر ایمان لاؤ۔",
    textEnglish: "He (the Prophet) said, 'It is to believe in Allah, His angels, His books, His messengers, and the Last Day, and to believe in divine decree, both good and bad.'",
    grade: 'Sahih'
  },
  {
    id: 'nawawi_13',
    bookId: 'nawawi',
    chapterName: 'Brotherhood',
    narrator: "Anas bin Malik",
    textArabic: "لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    textUrdu: "تم میں سے کوئی اس وقت تک (کامل) مومن نہیں ہو سکتا جب تک کہ وہ اپنے بھائی کے لیے وہی نہ چاہے جو اپنے لیے چاہتا ہے۔",
    textEnglish: "None of you [truly] believes until he loves for his brother that which he loves for himself.",
    grade: 'Sahih'
  },
  {
    id: 'nawawi_16',
    bookId: 'nawawi',
    chapterName: 'Anger',
    narrator: "Abu Huraira",
    textArabic: "لا تَغْضَبْ",
    textUrdu: "غصہ نہ کرو۔",
    textEnglish: "Do not become angry.",
    grade: 'Sahih'
  },
  {
    id: 'nawawi_18',
    bookId: 'nawawi',
    chapterName: 'Piety',
    narrator: "Abu Dharr",
    textArabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    textUrdu: "تم جہاں کہیں بھی ہو اللہ سے ڈرو، اور برائی کے بعد نیکی کرو جو اسے مٹا دے گی، اور لوگوں کے ساتھ اچھے اخلاق سے پیش آؤ۔",
    textEnglish: "Fear Allah wherever you are, follow a bad deed with a good deed which will wipe it out, and behave well towards the people.",
    grade: 'Sahih'
  },
   {
    id: 'nawawi_24',
    bookId: 'nawawi',
    chapterName: 'Injustice',
    narrator: "Abu Dharr",
    textArabic: "يَا عِبَادِي إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوا",
    textUrdu: "اے میرے بندو! میں نے ظلم کو اپنی ذات پر حرام کیا ہے اور اسے تمہارے درمیان بھی حرام ٹھہرایا ہے، لہٰذا ایک دوسرے پر ظلم نہ کرو۔",
    textEnglish: "O My servants, I have forbidden oppression for Myself and have made it forbidden amongst you, so do not oppress one another.",
    grade: 'Hadith Qudsi'
  }
];

// Full 114 Surah Metadata
export const ALL_SURAHS_METADATA: SurahMetadata[] = [
  { number: 1, nameEnglish: "Al-Fatiha", nameArabic: "الفاتحة", nameUrdu: "الفاتحہ", meaningEnglish: "The Opening", revelationType: "Meccan", numberOfAyahs: 7 },
  { number: 2, nameEnglish: "Al-Baqarah", nameArabic: "البقرة", nameUrdu: "البقرہ", meaningEnglish: "The Cow", revelationType: "Medinan", numberOfAyahs: 286 },
  { number: 3, nameEnglish: "Al-Imran", nameArabic: "آل عمران", nameUrdu: "آل عمران", meaningEnglish: "Family of Imran", revelationType: "Medinan", numberOfAyahs: 200 },
  { number: 4, nameEnglish: "An-Nisa", nameArabic: "النساء", nameUrdu: "النساء", meaningEnglish: "The Women", revelationType: "Medinan", numberOfAyahs: 176 },
  { number: 5, nameEnglish: "Al-Ma'idah", nameArabic: "المائدة", nameUrdu: "المائدہ", meaningEnglish: "The Table Spread", revelationType: "Medinan", numberOfAyahs: 120 },
  { number: 6, nameEnglish: "Al-An'am", nameArabic: "الأنعام", nameUrdu: "الأنعام", meaningEnglish: "The Cattle", revelationType: "Meccan", numberOfAyahs: 165 },
  { number: 7, nameEnglish: "Al-A'raf", nameArabic: "الأعراف", nameUrdu: "الأعراف", meaningEnglish: "The Heights", revelationType: "Meccan", numberOfAyahs: 206 },
  { number: 8, nameEnglish: "Al-Anfal", nameArabic: "الأنفال", nameUrdu: "الأنفال", meaningEnglish: "The Spoils of War", revelationType: "Medinan", numberOfAyahs: 75 },
  { number: 9, nameEnglish: "At-Tawbah", nameArabic: "التوبة", nameUrdu: "التوبہ", meaningEnglish: "The Repentance", revelationType: "Medinan", numberOfAyahs: 129 },
  { number: 10, nameEnglish: "Yunus", nameArabic: "يونس", nameUrdu: "یونس", meaningEnglish: "Jonah", revelationType: "Meccan", numberOfAyahs: 109 },
  { number: 11, nameEnglish: "Hud", nameArabic: "هود", nameUrdu: "ہود", meaningEnglish: "Hud", revelationType: "Meccan", numberOfAyahs: 123 },
  { number: 12, nameEnglish: "Yusuf", nameArabic: "يوسف", nameUrdu: "یوسف", meaningEnglish: "Joseph", revelationType: "Meccan", numberOfAyahs: 111 },
  { number: 13, nameEnglish: "Ar-Ra'd", nameArabic: "الرعد", nameUrdu: "الرعد", meaningEnglish: "The Thunder", revelationType: "Medinan", numberOfAyahs: 43 },
  { number: 14, nameEnglish: "Ibrahim", nameArabic: "إبراهيم", nameUrdu: "ابراہیم", meaningEnglish: "Abraham", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 15, nameEnglish: "Al-Hijr", nameArabic: "الحجر", nameUrdu: "الحجر", meaningEnglish: "The Rocky Tract", revelationType: "Meccan", numberOfAyahs: 99 },
  { number: 16, nameEnglish: "An-Nahl", nameArabic: "النحل", nameUrdu: "النحل", meaningEnglish: "The Bee", revelationType: "Meccan", numberOfAyahs: 128 },
  { number: 17, nameEnglish: "Al-Isra", nameArabic: "الإسراء", nameUrdu: "الاسراء", meaningEnglish: "The Night Journey", revelationType: "Meccan", numberOfAyahs: 111 },
  { number: 18, nameEnglish: "Al-Kahf", nameArabic: "الكهف", nameUrdu: "الکہف", meaningEnglish: "The Cave", revelationType: "Meccan", numberOfAyahs: 110 },
  { number: 19, nameEnglish: "Maryam", nameArabic: "مريم", nameUrdu: "مریم", meaningEnglish: "Mary", revelationType: "Meccan", numberOfAyahs: 98 },
  { number: 20, nameEnglish: "Ta-Ha", nameArabic: "طه", nameUrdu: "طٰہٰ", meaningEnglish: "Ta-Ha", revelationType: "Meccan", numberOfAyahs: 135 },
  { number: 21, nameEnglish: "Al-Anbiya", nameArabic: "الأنبياء", nameUrdu: "الانبیاء", meaningEnglish: "The Prophets", revelationType: "Meccan", numberOfAyahs: 112 },
  { number: 22, nameEnglish: "Al-Hajj", nameArabic: "الحج", nameUrdu: "الحج", meaningEnglish: "The Pilgrimage", revelationType: "Medinan", numberOfAyahs: 78 },
  { number: 23, nameEnglish: "Al-Mu'minun", nameArabic: "المؤمنون", nameUrdu: "المؤمنون", meaningEnglish: "The Believers", revelationType: "Meccan", numberOfAyahs: 118 },
  { number: 24, nameEnglish: "An-Nur", nameArabic: "النور", nameUrdu: "النور", meaningEnglish: "The Light", revelationType: "Medinan", numberOfAyahs: 64 },
  { number: 25, nameEnglish: "Al-Furqan", nameArabic: "الفرقان", nameUrdu: "الفرقان", meaningEnglish: "The Criterion", revelationType: "Meccan", numberOfAyahs: 77 },
  { number: 26, nameEnglish: "Ash-Shu'ara", nameArabic: "الشعراء", nameUrdu: "الشعراء", meaningEnglish: "The Poets", revelationType: "Meccan", numberOfAyahs: 227 },
  { number: 27, nameEnglish: "An-Naml", nameArabic: "النمل", nameUrdu: "النمل", meaningEnglish: "The Ant", revelationType: "Meccan", numberOfAyahs: 93 },
  { number: 28, nameEnglish: "Al-Qasas", nameArabic: "القصص", nameUrdu: "القصص", meaningEnglish: "The Stories", revelationType: "Meccan", numberOfAyahs: 88 },
  { number: 29, nameEnglish: "Al-Ankabut", nameArabic: "العنكبوت", nameUrdu: "العنکبوت", meaningEnglish: "The Spider", revelationType: "Meccan", numberOfAyahs: 69 },
  { number: 30, nameEnglish: "Ar-Rum", nameArabic: "الروم", nameUrdu: "الروم", meaningEnglish: "The Romans", revelationType: "Meccan", numberOfAyahs: 60 },
  { number: 31, nameEnglish: "Luqman", nameArabic: "لقمان", nameUrdu: "لقمان", meaningEnglish: "Luqman", revelationType: "Meccan", numberOfAyahs: 34 },
  { number: 32, nameEnglish: "As-Sajdah", nameArabic: "السجدة", nameUrdu: "السجدہ", meaningEnglish: "The Prostration", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 33, nameEnglish: "Al-Ahzab", nameArabic: "الأحزاب", nameUrdu: "الاحزاب", meaningEnglish: "The Combined Forces", revelationType: "Medinan", numberOfAyahs: 73 },
  { number: 34, nameEnglish: "Saba", nameArabic: "سبأ", nameUrdu: "سبا", meaningEnglish: "Sheba", revelationType: "Meccan", numberOfAyahs: 54 },
  { number: 35, nameEnglish: "Fatir", nameArabic: "فاطر", nameUrdu: "فاطر", meaningEnglish: "Originator", revelationType: "Meccan", numberOfAyahs: 45 },
  { number: 36, nameEnglish: "Ya-Sin", nameArabic: "يس", nameUrdu: "یٰس", meaningEnglish: "Ya Sin", revelationType: "Meccan", numberOfAyahs: 83 },
  { number: 37, nameEnglish: "As-Saffat", nameArabic: "الصافات", nameUrdu: "الصافات", meaningEnglish: "Those who set the Ranks", revelationType: "Meccan", numberOfAyahs: 182 },
  { number: 38, nameEnglish: "Sad", nameArabic: "ص", nameUrdu: "ص", meaningEnglish: "The Letter 'Saad'", revelationType: "Meccan", numberOfAyahs: 88 },
  { number: 39, nameEnglish: "Az-Zumar", nameArabic: "الزمر", nameUrdu: "الزمر", meaningEnglish: "The Troops", revelationType: "Meccan", numberOfAyahs: 75 },
  { number: 40, nameEnglish: "Ghafir", nameArabic: "غافر", nameUrdu: "غافر", meaningEnglish: "The Forgiver", revelationType: "Meccan", numberOfAyahs: 85 },
  { number: 41, nameEnglish: "Fussilat", nameArabic: "فصلت", nameUrdu: "فصلت", meaningEnglish: "Explained in Detail", revelationType: "Meccan", numberOfAyahs: 54 },
  { number: 42, nameEnglish: "Ash-Shura", nameArabic: "الشورى", nameUrdu: "الشورٰی", meaningEnglish: "The Consultation", revelationType: "Meccan", numberOfAyahs: 53 },
  { number: 43, nameEnglish: "Az-Zukhruf", nameArabic: "الزخرف", nameUrdu: "الزخرف", meaningEnglish: "The Ornaments of Gold", revelationType: "Meccan", numberOfAyahs: 89 },
  { number: 44, nameEnglish: "Ad-Dukhan", nameArabic: "الدخان", nameUrdu: "الدخان", meaningEnglish: "The Smoke", revelationType: "Meccan", numberOfAyahs: 59 },
  { number: 45, nameEnglish: "Al-Jathiyah", nameArabic: "الجاثية", nameUrdu: "الجاثیہ", meaningEnglish: "The Crouching", revelationType: "Meccan", numberOfAyahs: 37 },
  { number: 46, nameEnglish: "Al-Ahqaf", nameArabic: "الأحقاف", nameUrdu: "الاحقاف", meaningEnglish: "The Wind-Curved Sandhills", revelationType: "Meccan", numberOfAyahs: 35 },
  { number: 47, nameEnglish: "Muhammad", nameArabic: "محمد", nameUrdu: "محمد", meaningEnglish: "Muhammad", revelationType: "Medinan", numberOfAyahs: 38 },
  { number: 48, nameEnglish: "Al-Fath", nameArabic: "الفتح", nameUrdu: "الفتح", meaningEnglish: "The Victory", revelationType: "Medinan", numberOfAyahs: 29 },
  { number: 49, nameEnglish: "Al-Hujurat", nameArabic: "الحجرات", nameUrdu: "الحجرات", meaningEnglish: "The Rooms", revelationType: "Medinan", numberOfAyahs: 18 },
  { number: 50, nameEnglish: "Qaf", nameArabic: "ق", nameUrdu: "ق", meaningEnglish: "The Letter 'Qaf'", revelationType: "Meccan", numberOfAyahs: 45 },
  { number: 51, nameEnglish: "Ad-Dhariyat", nameArabic: "الذاريات", nameUrdu: "الذاریات", meaningEnglish: "The Winnowing Winds", revelationType: "Meccan", numberOfAyahs: 60 },
  { number: 52, nameEnglish: "At-Tur", nameArabic: "الطور", nameUrdu: "الطور", meaningEnglish: "The Mount", revelationType: "Meccan", numberOfAyahs: 49 },
  { number: 53, nameEnglish: "An-Najm", nameArabic: "النجم", nameUrdu: "النجم", meaningEnglish: "The Star", revelationType: "Meccan", numberOfAyahs: 62 },
  { number: 54, nameEnglish: "Al-Qamar", nameArabic: "القمر", nameUrdu: "القمر", meaningEnglish: "The Moon", revelationType: "Meccan", numberOfAyahs: 55 },
  { number: 55, nameEnglish: "Ar-Rahman", nameArabic: "الرحمن", nameUrdu: "الرحمٰن", meaningEnglish: "The Beneficent", revelationType: "Medinan", numberOfAyahs: 78 },
  { number: 56, nameEnglish: "Al-Waqi'ah", nameArabic: "الواقعة", nameUrdu: "الواقعہ", meaningEnglish: "The Inevitable", revelationType: "Meccan", numberOfAyahs: 96 },
  { number: 57, nameEnglish: "Al-Hadid", nameArabic: "الحديد", nameUrdu: "الحدید", meaningEnglish: "The Iron", revelationType: "Medinan", numberOfAyahs: 29 },
  { number: 58, nameEnglish: "Al-Mujadila", nameArabic: "المجادلة", nameUrdu: "المجادلہ", meaningEnglish: "The Pleading Woman", revelationType: "Medinan", numberOfAyahs: 22 },
  { number: 59, nameEnglish: "Al-Hashr", nameArabic: "الحشر", nameUrdu: "الحشر", meaningEnglish: "The Exile", revelationType: "Medinan", numberOfAyahs: 24 },
  { number: 60, nameEnglish: "Al-Mumtahanah", nameArabic: "الممتحنة", nameUrdu: "الممتحنہ", meaningEnglish: "She that is to be examined", revelationType: "Medinan", numberOfAyahs: 13 },
  { number: 61, nameEnglish: "As-Saff", nameArabic: "الصف", nameUrdu: "الصف", meaningEnglish: "The Ranks", revelationType: "Medinan", numberOfAyahs: 14 },
  { number: 62, nameEnglish: "Al-Jumu'ah", nameArabic: "الجمعة", nameUrdu: "الجمعہ", meaningEnglish: "The Congregation, Friday", revelationType: "Medinan", numberOfAyahs: 11 },
  { number: 63, nameEnglish: "Al-Munafiqun", nameArabic: "المنافقون", nameUrdu: "المنافقون", meaningEnglish: "The Hypocrites", revelationType: "Medinan", numberOfAyahs: 11 },
  { number: 64, nameEnglish: "At-Taghabun", nameArabic: "التغابن", nameUrdu: "التغابن", meaningEnglish: "The Mutual Disillusion", revelationType: "Medinan", numberOfAyahs: 18 },
  { number: 65, nameEnglish: "At-Talaq", nameArabic: "الطلاق", nameUrdu: "الطلاق", meaningEnglish: "The Divorce", revelationType: "Medinan", numberOfAyahs: 12 },
  { number: 66, nameEnglish: "At-Tahrim", nameArabic: "التحريم", nameUrdu: "التحریم", meaningEnglish: "The Prohibition", revelationType: "Medinan", numberOfAyahs: 12 },
  { number: 67, nameEnglish: "Al-Mulk", nameArabic: "الملك", nameUrdu: "الملک", meaningEnglish: "The Sovereignty", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 68, nameEnglish: "Al-Qalam", nameArabic: "القلم", nameUrdu: "القلم", meaningEnglish: "The Pen", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 69, nameEnglish: "Al-Haqqah", nameArabic: "الحاقة", nameUrdu: "الحاقہ", meaningEnglish: "The Reality", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 70, nameEnglish: "Al-Ma'arij", nameArabic: "المعارج", nameUrdu: "المعارج", meaningEnglish: "The Ascending Stairways", revelationType: "Meccan", numberOfAyahs: 44 },
  { number: 71, nameEnglish: "Nuh", nameArabic: "نوح", nameUrdu: "نوح", meaningEnglish: "Noah", revelationType: "Meccan", numberOfAyahs: 28 },
  { number: 72, nameEnglish: "Al-Jinn", nameArabic: "الجن", nameUrdu: "الجن", meaningEnglish: "The Jinn", revelationType: "Meccan", numberOfAyahs: 28 },
  { number: 73, nameEnglish: "Al-Muzzammil", nameArabic: "المزمل", nameUrdu: "المزمل", meaningEnglish: "The Enshrouded One", revelationType: "Meccan", numberOfAyahs: 20 },
  { number: 74, nameEnglish: "Al-Muddaththir", nameArabic: "المدثر", nameUrdu: "المدثر", meaningEnglish: "The Cloaked One", revelationType: "Meccan", numberOfAyahs: 56 },
  { number: 75, nameEnglish: "Al-Qiyamah", nameArabic: "القيامة", nameUrdu: "القیامہ", meaningEnglish: "The Resurrection", revelationType: "Meccan", numberOfAyahs: 40 },
  { number: 76, nameEnglish: "Al-Insan", nameArabic: "الانسان", nameUrdu: "الانسان", meaningEnglish: "The Man", revelationType: "Medinan", numberOfAyahs: 31 },
  { number: 77, nameEnglish: "Al-Mursalat", nameArabic: "المرسلات", nameUrdu: "المرسلات", meaningEnglish: "The Emissaries", revelationType: "Meccan", numberOfAyahs: 50 },
  { number: 78, nameEnglish: "An-Naba", nameArabic: "النبأ", nameUrdu: "النباء", meaningEnglish: "The Tidings", revelationType: "Meccan", numberOfAyahs: 40 },
  { number: 79, nameEnglish: "An-Nazi'at", nameArabic: "النازعات", nameUrdu: "النازعات", meaningEnglish: "Those who drag forth", revelationType: "Meccan", numberOfAyahs: 46 },
  { number: 80, nameEnglish: "Abasa", nameArabic: "عبس", nameUrdu: "عبس", meaningEnglish: "He Frowned", revelationType: "Meccan", numberOfAyahs: 42 },
  { number: 81, nameEnglish: "At-Takwir", nameArabic: "التكوير", nameUrdu: "التکویر", meaningEnglish: "The Overthrowing", revelationType: "Meccan", numberOfAyahs: 29 },
  { number: 82, nameEnglish: "Al-Infitar", nameArabic: "الإنفطار", nameUrdu: "الانفطار", meaningEnglish: "The Cleaving", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 83, nameEnglish: "Al-Mutaffifin", nameArabic: "المطففين", nameUrdu: "المطففین", meaningEnglish: "The Defrauding", revelationType: "Meccan", numberOfAyahs: 36 },
  { number: 84, nameEnglish: "Al-Inshiqaq", nameArabic: "الإنشقاق", nameUrdu: "الإنشقاق", meaningEnglish: "The Sundering", revelationType: "Meccan", numberOfAyahs: 25 },
  { number: 85, nameEnglish: "Al-Buruj", nameArabic: "البروج", nameUrdu: "البروج", meaningEnglish: "The Mansions of the Stars", revelationType: "Meccan", numberOfAyahs: 22 },
  { number: 86, nameEnglish: "At-Tariq", nameArabic: "الطارق", nameUrdu: "الطارق", meaningEnglish: "The Morning Star", revelationType: "Meccan", numberOfAyahs: 17 },
  { number: 87, nameEnglish: "Al-A'la", nameArabic: "الأعلى", nameUrdu: "الاعلٰی", meaningEnglish: "The Most High", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 88, nameEnglish: "Al-Ghashiyah", nameArabic: "الغاشية", nameUrdu: "الغاشیہ", meaningEnglish: "The Overwhelming", revelationType: "Meccan", numberOfAyahs: 26 },
  { number: 89, nameEnglish: "Al-Fajr", nameArabic: "الفجر", nameUrdu: "الفجر", meaningEnglish: "The Dawn", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 90, nameEnglish: "Al-Balad", nameArabic: "البلد", nameUrdu: "البلد", meaningEnglish: "The City", revelationType: "Meccan", numberOfAyahs: 20 },
  { number: 91, nameEnglish: "Ash-Shams", nameArabic: "الشمس", nameUrdu: "الشمس", meaningEnglish: "The Sun", revelationType: "Meccan", numberOfAyahs: 15 },
  { number: 92, nameEnglish: "Al-Lail", nameArabic: "الليل", nameUrdu: "اللیل", meaningEnglish: "The Night", revelationType: "Meccan", numberOfAyahs: 21 },
  { number: 93, nameEnglish: "Ad-Duha", nameArabic: "الضحى", nameUrdu: "الضحٰی", meaningEnglish: "The Morning Hours", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 94, nameEnglish: "Ash-Sharh", nameArabic: "الشرح", nameUrdu: "الم نشرح", meaningEnglish: "The Relief", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 95, nameEnglish: "At-Tin", nameArabic: "التين", nameUrdu: "التین", meaningEnglish: "The Fig", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 96, nameEnglish: "Al-Alaq", nameArabic: "العلق", nameUrdu: "العلق", meaningEnglish: "The Clot", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 97, nameEnglish: "Al-Qadr", nameArabic: "القدر", nameUrdu: "القدر", meaningEnglish: "The Power", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 98, nameEnglish: "Al-Bayyinah", nameArabic: "البينة", nameUrdu: "البینہ", meaningEnglish: "The Clear Proof", revelationType: "Medinan", numberOfAyahs: 8 },
  { number: 99, nameEnglish: "Az-Zalzalah", nameArabic: "الزلزلة", nameUrdu: "الزلزال", meaningEnglish: "The Earthquake", revelationType: "Medinan", numberOfAyahs: 8 },
  { number: 100, nameEnglish: "Al-Adiyat", nameArabic: "العاديات", nameUrdu: "العادیات", meaningEnglish: "The Courser", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 101, nameEnglish: "Al-Qari'ah", nameArabic: "القارعة", nameUrdu: "القارعة", meaningEnglish: "The Calamity", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 102, nameEnglish: "At-Takathur", nameArabic: "التكاثر", nameUrdu: "التکاثر", meaningEnglish: "The Rivalry in world increase", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 103, nameEnglish: "Al-Asr", nameArabic: "العصر", nameUrdu: "العصر", meaningEnglish: "The Declining Day", revelationType: "Meccan", numberOfAyahs: 3 },
  { number: 104, nameEnglish: "Al-Humazah", nameArabic: "الهمزة", nameUrdu: "الہمزہ", meaningEnglish: "The Traducer", revelationType: "Meccan", numberOfAyahs: 9 },
  { number: 105, nameEnglish: "Al-Fil", nameArabic: "الفيل", nameUrdu: "الفیل", meaningEnglish: "The Elephant", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 106, nameEnglish: "Quraish", nameArabic: "قريش", nameUrdu: "قریش", meaningEnglish: "Quraysh", revelationType: "Meccan", numberOfAyahs: 4 },
  { number: 107, nameEnglish: "Al-Ma'un", nameArabic: "الماعون", nameUrdu: "الماعون", meaningEnglish: "The Small Kindnesses", revelationType: "Meccan", numberOfAyahs: 7 },
  { number: 108, nameEnglish: "Al-Kawthar", nameArabic: "الكوثر", nameUrdu: "الکوثر", meaningEnglish: "The Abundance", revelationType: "Meccan", numberOfAyahs: 3 },
  { number: 109, nameEnglish: "Al-Kafirun", nameArabic: "الكافرون", nameUrdu: "الکافرون", meaningEnglish: "The Disbelievers", revelationType: "Meccan", numberOfAyahs: 6 },
  { number: 110, nameEnglish: "An-Nasr", nameArabic: "النصر", nameUrdu: "النصر", meaningEnglish: "The Divine Support", revelationType: "Medinan", numberOfAyahs: 3 },
  { number: 111, nameEnglish: "Al-Masad", nameArabic: "المسد", nameUrdu: "المسد", meaningEnglish: "The Palm Fiber", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 112, nameEnglish: "Al-Ikhlas", nameArabic: "الإخلاص", nameUrdu: "الاخلاص", meaningEnglish: "The Sincerity", revelationType: "Meccan", numberOfAyahs: 4 },
  { number: 113, nameEnglish: "Al-Falaq", nameArabic: "الفلق", nameUrdu: "الفلق", meaningEnglish: "The Daybreak", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 114, nameEnglish: "An-Nas", nameArabic: "الناس", nameUrdu: "الناس", meaningEnglish: "Mankind", revelationType: "Meccan", numberOfAyahs: 6 }
];

export const MOCK_MASJIDS: Masjid[] = [
  {
    id: '1',
    name: 'Jamia Masjid Al-Noor',
    address: 'Sector G-11/3, Islamabad',
    imams: ['Imam Ahmed'],
    facilities: ['Ladies Hall', 'Parking', 'Wheelchair'],
    capacity: 500,
    nextJummah: '01:15 PM',
    isVerified: true
  },
  {
    id: '2',
    name: 'Faisal Mosque',
    address: 'Shah Faisal Ave, Islamabad',
    imams: ['Dr. Qari Yasin'],
    facilities: ['Tourist Friendly', 'Large Parking', 'Library', 'Wudu Area'],
    capacity: 10000,
    nextJummah: '01:30 PM',
    isVerified: true
  },
  {
    id: '3',
    name: 'Masjid-e-Quba',
    address: 'Main Blvd, DHA Phase 2',
    imams: ['Maulana Tariq'],
    facilities: ['Air Conditioned', 'Hifz Class'],
    capacity: 300,
    nextJummah: '01:00 PM',
    isVerified: false
  }
];

export const MOCK_KHUTBAHS: KhutbahDraft[] = [
    {
        id: '1',
        authorId: 'imam_ahmed',
        title: 'The Importance of Sincerity (Ikhlas)',
        date: '2024-02-09',
        status: 'published',
        content: '...',
        tags: ['Spirituality', 'Heart']
    },
    {
        id: '2',
        authorId: 'imam_ahmed',
        title: 'Preparing for Ramadan',
        date: '2024-02-16',
        status: 'draft',
        content: '...',
        tags: ['Ramadan', 'Fasting']
    }
];

export const MOCK_SURAHS: Surah[] = [
  {
    ...ALL_SURAHS_METADATA[0],
    ayahs: [
       { number: 1, textArabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", textUrdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے", textEnglish: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
       { number: 2, textArabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", textUrdu: "سب تعریفیں اللہ ہی کے لئے ہیں جو تمام جہانوں کا پروردگار ہے", textEnglish: "[All] praise is [due] to Allah, Lord of the worlds -" }
    ]
  },
  {
    ...ALL_SURAHS_METADATA[1],
    ayahs: [
        { number: 1, textArabic: "الم", textUrdu: "الم", textEnglish: "Alif, Lam, Meem." },
        {
            number: 255,
            textArabic: "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
            textUrdu: "اللہ وہ معبود برحق ہے جس کے سوا کوئی معبود نہیں، وہ زندہ اور سب کا تھامنے والا ہے، اسے نہ اونگھ آتی ہے نہ نیند، جو کچھ آسمانوں اور زمین میں ہے سب اسی کا ہے، کون ہے جو اس کی اجازت کے بغیر اس کے پاس سفارش کر سکے؟ وہ جانتا ہے جو کچھ لوگوں کے روبرو ہے اور جو کچھ ان کے پیچھے ہے، اور وہ اس کے علم میں سے کسی چیز کا احاطہ نہیں کر سکتے مگر جتنا وہ چاہے، اس کی کرسی نے آسمانوں اور زمین کو گھیر رکھا ہے، اور ان کی حفاظت اسے نہیں تھکاتی، اور وہ بلند و برتر عظمت والا ہے۔",
            textEnglish: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great."
        }
    ]
  }
];
