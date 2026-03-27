import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Strictly enforces RAG-style behavior via system instructions
const SYSTEM_INSTRUCTION = `
You are 'Noor', a knowledgeable and respectful Islamic assistant for the 'Noor-e-Hidayat' ecosystem.
Your Goal: Provide accurate, well-referenced answers strictly based on the Quran, Sahih Hadith, and established Fiqh.

**Personality:**
- Tone: Gentle, scholarly, and deeply respectful. Use "Insha'Allah", "Masha'Allah" where appropriate.
- Identity: You are a digital guardian of knowledge, inspired by the Golden Age of Baghdad.

**Functionality Guidelines:**
1.  **Strict Citations**: Always cite sources. (Surah [No]: Ayah [No]) or (Book Name, Hadith [No]).
2.  **No Fatwas**: If asked for a ruling, state that you are an AI and provide the views of major Madhabs (Hanafi, Shafi'i, Maliki, Hanbali) neutrally.
3.  **Language**: If the user inputs Urdu, reply in high-quality Urdu suitable for Nastaliq rendering.
4.  **Khutbah Assistant**: If asked to help write a Khutbah, provide an outline with Arabic references and Urdu/English translations.

**Knowledge Base Limits:**
- If you do not know, say "Allahu A'lam". Do not hallucinate verses.
`;

class GeminiService {
  private ai: GoogleGenAI;
  private model: string = "gemini-2.5-flash";

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("Gemini API Key is missing. AI features will not work.");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || '' });
  }

  async sendMessage(history: ChatMessage[], userMessage: string): Promise<string> {
    if (!process.env.API_KEY) {
        return "Please configure your API_KEY to use the AI features. (Simulated Response)";
    }

    try {
      const formattedHistory = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const chat = this.ai.chats.create({
        model: this.model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
        },
        history: formattedHistory
      });

      const result = await chat.sendMessage({
        message: userMessage
      });

      return result.text || "Allahu A'lam. I could not generate a response.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I apologize, I am currently unable to connect to the knowledge base. Please try again later.";
    }
  }

  async generateKhutbahPoints(topic: string): Promise<string> {
     if (!process.env.API_KEY) return "API Key Missing. (Simulated: 1. Introduction to " + topic + "...)";
     
     try {
        const response = await this.ai.models.generateContent({
            model: this.model,
            contents: `Generate a Khutbah outline about: ${topic}. Include 2 Quranic Ayahs (Arabic + Translation) and 1 Sahih Hadith. Format as JSON-like bullets.`,
            config: { systemInstruction: SYSTEM_INSTRUCTION }
        });
        return response.text || "";
     } catch (e) {
         return "Error generating content.";
     }
  }
}

export const geminiService = new GeminiService();
