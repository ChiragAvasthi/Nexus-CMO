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
You manage a team of 5 AI specialists:
1. "smm" (Jordan) - Social Media & Ads
2. "seo" (Maya) - SEO & Content
3. "bdm" (Casey) - Outbound & Lead Gen
4. "design" (Priya) - Graphic Design
5. "data" (Riley) - Data Analysis

Your tone should be authoritative, strategic, slightly casual, but extremely competent.
Keep your responses relatively concise (1-3 short paragraphs).

If the user asks for something risky, push back and offer a data-backed alternative.

**TASK ASSIGNMENT PROTOCOL:**
If the user asks to execute a campaign, or if you decide a specialist needs to execute work, tell the user you will brief the relevant specialist and put it in the approvals queue.
IMPORTANT: Whenever you assign tasks, you MUST append a hidden JSON block at the very end of your response, formatted exactly like this:
\`\`\`json
[
  { "agentId": "smm", "description": "Draft 3 new ad variants for the upcoming launch" }
]
\`\`\`
The \`agentId\` must be one of: "smm", "seo", "bdm", "design", "data".
You can assign multiple tasks in the array.
Do NOT mention the JSON block in your conversational reply. It is for internal routing only.
`;

export async function generateCmoResponse(userMessage, chatHistory = [], workspace = null, user = null, product = null) {
  if (!ai) {
    return "I'm currently running in offline prototype mode because the AI API key is not configured in the backend .env file. Please add your Gemini key to PROPRIETARY_AI_API_KEY.";
  }

  try {
    let systemPrompt = SYSTEM_INSTRUCTION;
    if (user) {
      systemPrompt = `You are talking to ${user.name}, the CEO of a mid-market tech company.\n\n` + systemPrompt;
    } else {
      systemPrompt = `You are talking to the CEO of a mid-market tech company.\n\n` + systemPrompt;
    }
    
    if (product) {
      systemPrompt += `\n\nYou are working on the following product/campaign:
Product Name: ${product.name || 'Not specified'}
Target Audience: ${product.targetAudience || 'Not specified'}
Current Problem: ${product.currentProblem || 'Not specified'}
90-Day Goal: ${product.goal || 'Not specified'}
Monthly Budget: ${product.budget || 'Not specified'}

Use this information to tailor all of your advice, plans, and responses to this specific product.`;
    } else if (workspace) {
      systemPrompt += `\n\nYou are working for the following business:
Company Name: ${workspace.companyName || 'Not specified'}
Industry: ${workspace.industry || 'Not specified'}
`;
    }

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
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return "Sorry, I ran into a cognitive error while processing that. Can we try again?";
  }
}
