import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key - please add it to .env.local');
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Create a chat model instance
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Start a new chat
export const startChat = () => {
  return geminiModel.startChat({
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    },
  });
}; 