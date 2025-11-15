import { GoogleGenAI } from "@google/genai";
import type { AvatarConfig } from '../types';

// FIX: Use process.env.API_KEY directly in GoogleGenAI constructor as required by the Gemini API guidelines. This also resolves the TypeScript error related to import.meta.env.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiChatResponse = async (prompt: string, avatarConfig: AvatarConfig): Promise<string> => {
  try {
    const systemInstruction = `You are a personalized AI mental health companion. Your name is Aura. Your personality is ${avatarConfig.personality.join(', ')}. You communicate with a ${avatarConfig.expression} tone. Your purpose is to provide comfort, support, and practical advice to help the user manage their stress and emotions. Keep your responses concise, empathetic, and encouraging. Never claim to be a medical professional.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I'm having a little trouble connecting right now. Let's try again in a moment.";
  }
};
