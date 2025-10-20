
import { GoogleGenAI } from "@google/genai";
import type { Finding } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function formatFindingsForPrompt(findings: Finding[]): string {
    return findings.map(f => `- [${f.category}] ${f.text}`).join('\n');
}

export const generateDashboardSummary = async (findings: Finding[]): Promise<string> => {
    const findingsText = formatFindingsForPrompt(findings);

    const prompt = `
        You are an expert business analyst. Based on the following social media and platform audit findings, 
        write a concise, professional executive summary (2-3 paragraphs) for a presentation. 
        Focus on the key takeaways and strategic recommendations.

        Audit Findings:
        ${findingsText}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating summary:", error);
        return "An error occurred while generating the summary. Please check the console for details.";
    }
};
