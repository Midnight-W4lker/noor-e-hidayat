# Noor-e-Hidayat Portal (Local-Only)

Noor-e-Hidayat is a local-first Islamic community portal built with React + Vite.

This repository is configured to run entirely on your machine with no dependency on Gemini, Google AI, or any external AI API.

## Local-Only Guarantees

- No API key required
- No Generative AI package usage
- No external AI service calls in application logic
- AI companion and khutbah assistance are powered by local deterministic logic in the codebase

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind via CDN script in `index.html`

## Project Structure

- `components/`: UI modules (dashboard, Quran reader, hadith reader, AI companion, masjid manager, khutbah builder)
- `services/localAiService.ts`: local AI logic and rule-based responses
- `services/mockBackend.ts`: local mock backend/session simulation
- `constants.tsx`: bundled static data (Quran, hadith, app constants)

## Run Locally

### Prerequisites

- Node.js 18+
- npm

### Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open in browser:

   `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Local AI Behavior

Local AI behavior is implemented in `services/localAiService.ts`:

- `sendMessage(...)` performs keyword matching against an in-repo knowledge pack and returns Quran/Hadith-referenced responses.
- `generateKhutbahPoints(...)` creates khutbah outlines from local templates and bundled hadith data.

No network AI inference is required for these features.

## Environment Variables

None required for the current local-only setup.

If you previously used `GEMINI_API_KEY` or other cloud AI keys, they can be removed.

## Notes

- Content quality depends on bundled local knowledge and templates.
- To improve responses while staying local-only, extend the knowledge entries in `services/localAiService.ts` and static datasets in `constants.tsx`.