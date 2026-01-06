import { GoogleGenAI, Type } from "@google/genai";
import { BirthdayMessage } from "../types";

export const generateBirthdayWish = async (
  date: string
): Promise<BirthdayMessage> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const prompt = `Write a beautiful, poetic, and heartwarming birthday letter for someone born on ${date}. 
  The tone should be magical, deeply emotional, and inspiring. 
  Include specific traits often associated with this date (January 7th - Capricorn). 
  Make it feel like a once-in-a-lifetime message. Use elegant language.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            closing: { type: Type.STRING },
          },
          required: ["title", "content", "closing"],
        },
      },
    });

    return JSON.parse(response.text || "{}") as BirthdayMessage;
  } catch (error) {
    console.error("Error generating wish:", error);
    return {
      title: "Happy Birthday, Radiant Soul",
      content:
        "May your day be filled with the magic you bring into the world every single day. You are a beacon of light, and today the universe celebrates you.",
      closing: "With all the love in the universe,",
    };
  }
};

// /n/n
