import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Gemini API key is missing. Please check your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface UniversityRecommendation {
  name: string;
  program: string;
  match: number;
}

export interface RecommendationResult {
  universities: UniversityRecommendation[];
}

function isValidRecommendation(data: any): data is RecommendationResult {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray(data.universities) &&
    data.universities.every(
      (uni: any) =>
        typeof uni === 'object' &&
        typeof uni.name === 'string' &&
        typeof uni.program === 'string' &&
        typeof uni.match === 'number' &&
        uni.match >= 0 &&
        uni.match <= 100
    )
  );
}

function parseAIResponse(text: string): RecommendationResult {
  try {
    // Try to extract JSON from the response if it's wrapped in text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    const data = JSON.parse(jsonStr);

    if (!isValidRecommendation(data)) {
      throw new Error('Invalid response format from AI');
    }

    return data;
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Failed to parse AI recommendations');
  }
}

export async function getUniversityRecommendations(
  field: string,
  destination: string
): Promise<RecommendationResult> {
  if (!field || !destination) {
    throw new Error('Field and destination are required');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a university recommendation system. Based on the following criteria, provide exactly 3 university recommendations:
      - Field of Study: ${field}
      - Destination: ${destination}

      Respond ONLY with a JSON object in this exact format:
      {
        "universities": [
          {
            "name": "University Name",
            "program": "Specific Program Name",
            "match": 95
          }
        ]
      }

      Rules:
      - Provide exactly 3 universities
      - Match percentage must be between 0-100
      - Only include real universities and programs
      - Format must be valid JSON
      - No additional text before or after the JSON`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return parseAIResponse(text);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate recommendations. Please try again.');
  }
}