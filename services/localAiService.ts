import { ChatMessage } from '../types';
import { MOCK_HADITHS } from '../constants';

type KnowledgeEntry = {
  id: string;
  triggers: string[];
  response: string;
  references: string[];
};

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'riba',
    triggers: ['riba', 'interest', 'usury', 'loan', 'bank'],
    response:
      'Riba is clearly prohibited in the Quran. The believer is reminded that Allah gives sustenance, not debt, and that wealth should be generated through trade and generosity. Upholding fair contracts and returning what is owed without addition keeps the community free of oppression.',
    references: ['Al-Baqarah 2:275', 'Al-Imran 3:130'],
  },
  {
    id: 'charity',
    triggers: ['zakat', 'charity', 'sadaqah', 'giving', 'donation'],
    response:
      'Spending in Allah’s way is rewarded generously, even the littlest gesture. Giving sadaqah dissolves sins, protects the giver from calamity, and keeps the heart humble. Begin with the most vulnerable members of your community and keep your intention sincere.',
    references: ['Al-Baqarah 2:261', 'At-Tawbah 9:60'],
  },
  {
    id: 'patience',
    triggers: ['sabr', 'patience', 'trial', 'hardship', 'difficulties'],
    response:
      'Allah tests His servants with trials so that the patient and thankfu can rise in rank. Remember the promise that every hardship is followed by ease and that perseverance draws one closer to Paradise.',
    references: ['Al-Baqarah 2:155', 'Al-Asr 103:1-3'],
  },
  {
    id: 'truth',
    triggers: ['truth', 'honesty', 'integrity', 'promise', 'trust'],
    response:
      'Truthfulness is the character of the Prophets and a light upon the heart. The believer who upholds trust and speaks truth adorns the community with clarity and justice.',
    references: ['Sahih Muslim, Book 1, Hadith 22 (He who cheats is not of us)'],
  },
];

const DEFAULT_RESPONSE =
  'Noor is currently operating from the local knowledge pack. Try asking about core topics such as riba, charity, patience, or truth. The answers will always reference the Quran and Sahih Hadith stored in the bundle.';

class LocalAiService {
  private knowledgeBase = KNOWLEDGE_BASE;

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private findEntry(message: string) {
    const clean = message.toLowerCase();
    return this.knowledgeBase.find((entry) =>
      entry.triggers.some((keyword) => clean.includes(keyword))
    );
  }

  async sendMessage(_history: ChatMessage[], userMessage: string): Promise<string> {
    await this.delay(180);
    const match = this.findEntry(userMessage);
    if (match) {
      const references = match.references.join(' • ');
      return `${match.response}\n\nReferences: ${references}`;
    }
    return DEFAULT_RESPONSE;
  }

  async generateKhutbahPoints(topic: string): Promise<string> {
    await this.delay(250);
    const randomHadith =
      MOCK_HADITHS[Math.floor(Math.random() * MOCK_HADITHS.length)];

    return [
      `1. Theme & Dua: Open with praise of Allah and link the topic (“${topic}”) to reliance on Him (Surah Al-Fatiha 1:1-5).`,
      `2. Connecting Texts: Highlight a clear verse such as Surah Al-Ikhlas 112 as proof of Tawhid and contrast it with the practical issue at hand.`,
      `3. Hadith Insight: Reference ${randomHadith.chapterName} – "${randomHadith.textEnglish}" (${randomHadith.narrator}).`,
      `4. Action Step: Provide a community habit (e.g., establish a fridge for honest giving or host a night of remembrance).`,
      `5. Closing Dua: Ask Allah for sincerity and success in implementing the reminder.`,
    ].join('\n\n');
  }
}

export const localAiService = new LocalAiService();
