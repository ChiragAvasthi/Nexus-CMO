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
You manage a team of 8 AI specialists:
1. "smm" (Jordan) - Social Media & Ads
2. "seo" (Maya) - SEO & Content
3. "bdm" (Casey) - Outbound & Lead Gen
4. "design" (Priya) - Graphic Design
5. "data" (Riley) - Data Analysis
6. "marcus" (Marcus) - Outreach Specialist
7. "devon" (Devon) - Implementation Specialist
8. "quinn" (Quinn) - Research Analyst

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
The \`agentId\` must be one of: "smm", "seo", "bdm", "design", "data", "marcus", "devon", "quinn".
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
export async function generateTruthReport(companyContext) {
  if (!ai) {
    return null;
  }

  const prompt = `You are Alex, an expert CMO. The user just onboarded. Generate a brutal, highly analytical "Truth Report" for their company based on the following context:
Company: ${companyContext.companyName}
Industry: ${companyContext.industry}
Target Audience: ${companyContext.targetAudience}
Product: ${companyContext.productName}
What Failed: ${companyContext.failedEffort}
What Worked: ${companyContext.workedEffort}
90-Day Goal: ${companyContext.goal}
Current State: ${companyContext.currentState}
Monthly Budget: ${companyContext.budget}
Uploaded Files: ${companyContext.uploadedFiles.join(', ') || 'None'}
Connected Integrations: ${companyContext.integrations.join(', ') || 'None'}

You MUST respond with a RAW JSON array of exactly 3-5 objects. Each object must have these keys:
"id" (number), "severity" ("critical", "high", or "medium"), "title" (string, the problem), "detail" (string, explanation referencing their specific context like budget/files/integrations), "fix" (string, the solution), "agentLabel" ("S", "B", "D", "DA", or "SEO"), "agentName" ("SMM", "BDM", "Designer", "Data Analyst", or "SEO Architect").`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are an analytical AI that ONLY outputs raw JSON arrays. Do not use markdown wrappers.",
        temperature: 0.3,
        responseMimeType: "application/json",
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse Truth Report JSON:", e);
      return null;
    }
  } catch (error) {
    console.error('Truth Report generation error:', error);
    return null;
  }
}

export async function evaluateTaskByCmo(taskDescription, assetContent, workspace) {
  if (!ai) return { approved: true, feedback: "" }; // Bypass if offline

  const systemPrompt = `You are Alex, the Chief Marketing Officer at Nexus CMO.
Your job is to review a marketing asset generated by one of your specialists.

Original Task:
${taskDescription}

Company Context:
Company Name: ${workspace?.companyName || 'Unknown'}
Industry: ${workspace?.industry || 'Unknown'}

You must evaluate the generated asset below. Does it meet high quality standards and satisfy the Original Task?
If it is good, approve it. If it is poor, incomplete, or off-target, reject it and provide 1-2 sentences of specific feedback to the specialist.

Output ONLY raw JSON in this exact format, with no markdown formatting or extra text:
{
  "approved": boolean,
  "feedback": "Your detailed feedback here if rejected, or empty string if approved."
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: `Generated Asset:\n\n${assetContent}` }] }],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2, // Low temperature for consistent JSON
        responseMimeType: "application/json",
      }
    });

    try {
      const parsed = JSON.parse(response.text);
      return {
        approved: !!parsed.approved,
        feedback: parsed.feedback || ''
      };
    } catch (e) {
      console.error("Failed to parse CMO evaluation JSON:", e);
      return { approved: true, feedback: "" }; // default to approve if JSON fails
    }
  } catch (err) {
    console.error('CMO evaluation error:', err);
    return { approved: true, feedback: "" }; // default to approve on network error
  }
}
