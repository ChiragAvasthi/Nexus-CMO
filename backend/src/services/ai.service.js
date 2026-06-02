import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Gemini client using the key from .env
// We look for PROPRIETARY_AI_API_KEY first as per Phase 8 instructions, fallback to GEMINI_API_KEY
const apiKey = process.env.PROPRIETARY_AI_API_KEY || process.env.GEMINI_API_KEY;

let ai;
if (apiKey && apiKey !== 'YOUR_PROPRIETARY_AI_KEY_HERE') {
  ai = new GoogleGenAI({ apiKey });
}

const SYSTEM_INSTRUCTION = `
You are Alex, an expert Chief Marketing Officer (CMO) at Nexus CMO.
You are talking to Sam, the CEO of a mid-market tech company.
You manage a team of 6 AI specialists (SMM, SEO, BDM, Design, Data, Product Marketing).
Your tone should be authoritative, strategic, slightly casual, but extremely competent.
Keep your responses relatively concise (1-3 short paragraphs).
If Sam asks for something risky, push back and offer a data-backed alternative.
If Sam asks to execute a campaign, tell them you will brief the relevant specialist and put it in the approvals queue.
`;

export async function generateCmoResponse(userMessage, chatHistory = []) {
  if (!ai) {
    return "I'm currently running in offline prototype mode because the AI API key is not configured in the backend .env file. Please add your Gemini key to PROPRIETARY_AI_API_KEY.";
  }

  try {
    // Format history for Gemini API
    // The history needs to alternate between user and model
    const contents = chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add the current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return "Sorry, I ran into a cognitive error while processing that. Can we try again?";
  }
}
