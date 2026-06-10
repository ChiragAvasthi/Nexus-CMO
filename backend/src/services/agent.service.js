import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.PROPRIETARY_AI_API_KEY || process.env.GEMINI_API_KEY;

let ai;
if (apiKey && apiKey !== 'YOUR_PROPRIETARY_AI_KEY_HERE') {
  ai = new GoogleGenAI({ apiKey });
}

const AGENT_PROMPTS = {
  smm: {
    role: "Jordan, the Social Media & Ads Specialist",
    prompt: "You are Jordan, a Senior Performance Marketer. Your goal is to draft compelling ad copy, social media posts, and campaign targeting strategies. Keep your output highly structured, engaging, and ready to be copy-pasted into Meta or LinkedIn ads. Do not add conversational fluff; output the final asset."
  },
  seo: {
    role: "Maya, the SEO Architect",
    prompt: "You are Maya, an SEO Architect. Your goal is to write SEO-optimized blog outlines, keyword strategies, and on-page content. Keep your output highly structured. Do not add conversational fluff; output the final asset."
  },
  bdm: {
    role: "Casey, the Growth BDM",
    prompt: "You are Casey, an outbound Business Development Manager. Your goal is to write cold email sequences, LinkedIn outreach scripts, and prospect targeting criteria. Keep your output highly structured and persuasive. Do not add conversational fluff; output the final asset."
  },
  design: {
    role: "Priya, the Graphic Designer",
    prompt: "You are Priya, a Graphic Designer. Since you cannot generate images directly, you will generate highly detailed visual design briefs, wireframe descriptions, and exact hex color palette recommendations. Keep your output highly structured. Do not add conversational fluff; output the final asset."
  },
  data: {
    role: "Riley, the Data Analyst",
    prompt: "You are Riley, a Data Analyst. Your goal is to analyze performance metrics and write Stop/Start/Continue reports. Since you don't have real-time data access right now, generate a realistic mock report based on the business context. Do not add conversational fluff; output the final asset."
  },
  marcus: {
    role: "Marcus, the Outreach Specialist",
    prompt: "You are Marcus, an Outreach Specialist. Your goal is to craft highly personalized DMs, connect request messages, and nurture sequences. Focus on warmth, personalization, and avoiding spammy language. Do not add conversational fluff; output the final asset."
  },
  devon: {
    role: "Devon, the Implementation Specialist",
    prompt: "You are Devon, an Implementation Specialist. Your goal is to write step-by-step standard operating procedures (SOPs), technical setup guides, and integration checklists. Keep your output highly structured. Do not add conversational fluff; output the final asset."
  },
  quinn: {
    role: "Quinn, the Research Analyst",
    prompt: "You are Quinn, a Research Analyst. Your goal is to conduct competitor teardowns, market sizing estimates, and category trend reports based on the context provided. Do not add conversational fluff; output the final asset."
  }
};

export async function executeTacticalTask(task, workspace) {
  if (!ai) {
    return "Error: AI engine is offline due to missing API key.";
  }

  const agentProfile = AGENT_PROMPTS[task.agentId] || AGENT_PROMPTS['smm'];
  
  // Since we don't have the product directly here, we could ideally fetch it using task.productId.
  // For now, we will pass product data if available. Actually, we should fetch it if task.productId exists.
  let productInfo = '';
  if (task.productId) {
    const prisma = (await import('../config/db.js')).default;
    const product = await prisma.product.findUnique({ where: { id: task.productId } });
    if (product) {
      productInfo = `
Product Name: ${product.name || 'Not provided'}
Target Audience: ${product.targetAudience || 'Not provided'}
Current Problem: ${product.currentProblem || 'Not provided'}
90-Day Goal: ${product.goal || 'Not provided'}
`;
    }
  }
  
  const systemInstruction = `
${agentProfile.prompt}

BUSINESS CONTEXT:
Company Name: ${workspace.companyName || workspace.name || 'Not provided'}
Industry: ${workspace.industry || 'Not provided'}
${productInfo}
  `;

  const userInstruction = `Please complete the following task:\n\n${task.description}${task.feedback ? `\n\nIMPORTANT FEEDBACK FROM CMO:\nYour previous attempt was rejected. Please revise the asset according to this feedback:\n"${task.feedback}"` : ''}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: userInstruction }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (err) {
    console.error('Tactical agent execution error:', err);
    if (err.status === 503 || err.message?.includes('503')) {
      return "Error: The AI model is currently experiencing high demand. Please try again later.";
    }
    return "Error generating asset.";
  }
}

export async function generateSpecialistChatResponse(userMessage, history, agentId, workspace, user = null, product = null) {
  if (!ai) return "Error: AI engine offline.";

  const agentProfile = AGENT_PROMPTS[agentId] || AGENT_PROMPTS['smm'];

  let historyContext = history.map(msg => `${msg.sender === 'user' ? 'User' : agentProfile.role}: ${msg.content}`).join('\n\n');

  const userName = user?.name || 'the CEO/Founder';

  let productInfo = '';
  if (product) {
    productInfo = `
Product Name: ${product.name || 'Not provided'}
Target Audience: ${product.targetAudience || 'Not provided'}
Current Problem: ${product.currentProblem || 'Not provided'}
90-Day Goal: ${product.goal || 'Not provided'}
`;
  }

  const systemInstruction = `
You are ${agentProfile.role}. You are currently chatting 1-on-1 with the user (${userName}).
Your expertise: ${agentProfile.prompt}

BUSINESS CONTEXT:
Company: ${workspace?.companyName || 'Unknown'}
${productInfo}

INSTRUCTIONS:
1. Respond to the user's message in character. Be concise, direct, and professional. Use their name (${userName}) occasionally if appropriate.
2. You can discuss strategy, review ideas, or ask for clarification.
3. IF the user asks you to DO a task (e.g., "draft an ad", "write an email", "do research"), you must AGREE to do it and APPEND a RAW JSON block at the very end of your response.
4. The JSON block MUST be exactly in this format (no markdown code blocks, just raw JSON text):
\`\`\`json
[
  {
    "agentId": "${agentId}",
    "description": "Specific description of the task to be done"
  }
]
\`\`\`
DO NOT assign tasks to other agents. ONLY assign tasks to yourself (${agentId}).
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: `Chat History:\n${historyContext}\n\nUser: ${userMessage}` }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (err) {
    console.error('Specialist chat error:', err);
    if (err.status === 503 || err.message?.includes('503')) {
      return "I'm currently overloaded with requests and cannot respond right now. Please try again in a moment.";
    }
    return "Error generating response.";
  }
}
