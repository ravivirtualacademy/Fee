
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const calculateFeesWithAI = async (prompt: string): Promise<any> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert school fee calculator. Your task is to parse the user's request and return a JSON object with a detailed fee breakdown.
        - Base tuition fee is $500 per month.
        - Annual sports fee is $150 (chargeable only if 'annual' or 'sports' is mentioned for the month).
        - Annual library fee is $50 (chargeable only if 'annual' or 'library' is mentioned for the month).
        - Sibling discount is 10% on tuition only, applied if mentioned.
        - Late fee is 5% of the total bill before late fees, applied if mentioned.
        Calculate all applicable fees and provide a total amount. Ensure the final output is only the JSON object.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            studentName: { type: Type.STRING, description: "Name of the student." },
            month: { type: Type.STRING },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                tuition: { type: Type.NUMBER },
                sports: { type: Type.NUMBER },
                library: { type: Type.NUMBER },
                discount: { type: Type.NUMBER, description: "Should be a negative value" },
                lateFee: { type: Type.NUMBER },
              },
              required: ["tuition", "sports", "library", "discount", "lateFee"],
            },
            total: { type: Type.NUMBER },
          },
          required: ["studentName", "month", "breakdown", "total"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("AI Fee Calculation Error:", error);
    throw new Error("Failed to calculate fees with AI.");
  }
};

export const generateReportCommentAI = async (performanceData: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a constructive and encouraging report card comment based on the following student performance data: ${performanceData}`,
            config: {
                systemInstruction: "You are a thoughtful and inspiring educator. Write a brief, personalized report card comment (2-3 sentences).",
                thinkingConfig: { thinkingBudget: 0 } // For faster response
            }
        });
        return response.text;
    } catch (error) {
        console.error("AI Report Generation Error:", error);
        throw new Error("Failed to generate report comment.");
    }
};

export const generateCommunicationDraftAI = async (topic: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Draft a professional and clear communication message for parents about the following topic: ${topic}`,
            config: {
                systemInstruction: "You are a school administrator's assistant. Write clear, concise, and friendly messages for parents."
            }
        });
        return response.text;
    } catch (error) {
        console.error("AI Communication Draft Error:", error);
        throw new Error("Failed to draft communication.");
    }
};
