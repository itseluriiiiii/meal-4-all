import { GoogleGenerativeAI } from "@google/generative-ai";
import { MealPlan } from "@/components/MealPlanResults";

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface MealPlanRequest {
  ingredients: string[];
  familySize: number;
  region: string;
}

export interface GroceryBillAnalysis {
  detectedItems: string[];
  categories: {
    proteins: string[];
    carbs: string[];
    vegetables: string[];
    fats: string[];
    other: string[];
  };
  mealSuggestions: MealSuggestion[];
}

export interface MealSuggestion {
  name: string;
  ingredients: string[];
  cookingSteps: string[];
  nutritionalBenefits: string;
  prepTime: string;
  score?: number; // 1-5 star rating
}

export interface GroceryBillRequest {
  imageBase64: string;
  dietaryPreference?: "veg" | "non-veg" | "vegan" | "egg";
  healthGoal?: "weight-loss" | "muscle-gain" | "balanced";
  allergies?: string[];
}

export async function generateMealPlan(request: MealPlanRequest): Promise<MealPlan> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a nutritionist and meal planning expert. Generate a detailed meal plan based on:
- Available ingredients: ${request.ingredients.join(", ")}
- Family size: ${request.familySize} people
- Region: ${request.region}

Create meals that use primarily the available ingredients. Consider local food habits for the region.

Return ONLY valid JSON (no markdown, no extra text):
{
  "breakfast": {
    "name": "meal name",
    "description": "brief description",
    "ingredients": ["ingredient1", "ingredient2"],
    "nutritionHighlight": "key benefits",
    "estimatedCost": "~₹X-Y",
    "score": 4.5,
    "recipe": "Step 1: ... Step 2: ..."
  },
  "lunch": {
    "name": "meal name",
    "description": "brief description",
    "ingredients": ["ingredient1", "ingredient2"],
    "nutritionHighlight": "key benefits",
    "estimatedCost": "~₹X-Y",
    "score": 4.2,
    "recipe": "Step 1: ... Step 2: ..."
  },
  "dinner": {
    "name": "meal name",
    "description": "brief description",
    "ingredients": ["ingredient1", "ingredient2"],
    "nutritionHighlight": "key benefits",
    "estimatedCost": "~₹X-Y",
    "score": 4.8,
    "recipe": "Step 1: ... Step 2: ..."
  },
  "tips": ["tip1", "tip2", "tip3"],
  "substitutes": [{"missing": "nutrient", "alternatives": ["alt1", "alt2"], "reason": "why"}]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Response text:", text);
      throw new Error("No valid JSON found in response");
    }

    const mealPlan = JSON.parse(jsonMatch[0]) as MealPlan;
    return mealPlan;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw new Error("Failed to generate meal plan. Please try again.");
  }
}

export async function analyzeGroceryBill(request: GroceryBillRequest): Promise<GroceryBillAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are an expert at analyzing grocery bills.

Analyze this grocery bill image and extract all food items visible. Then create 3-5 simple meal suggestions using ONLY the extracted items.

IMPORTANT: Return ONLY valid JSON, no markdown or extra text.

{
  "detectedItems": ["item1", "item2", "item3"],
  "categories": {
    "proteins": ["item1"],
    "carbs": ["item1"],
    "vegetables": ["item1"],
    "fats": ["item1"],
    "other": ["item1"]
  },
  "mealSuggestions": [
    {
      "name": "Meal Name",
      "ingredients": ["ingredient1", "ingredient2"],
      "cookingSteps": ["Step 1", "Step 2"],
      "nutritionalBenefits": "Benefits",
      "prepTime": "15 mins",
      "score": 4.5
    }
  ]
}`;

  try {
    // Ensure we have valid base64 data
    if (!request.imageBase64) {
      throw new Error("No image data provided");
    }

    const result = await model.generateContent([
      {
        inlineData: {
          data: request.imageBase64,
          mimeType: "image/jpeg",
        },
      },
      {
        text: prompt,
      },
    ]);

    const response = await result.response;
    const text = response.text();

    console.log("API Response:", text);

    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error(`No valid JSON found in response: ${text.substring(0, 200)}`);
    }

    const jsonStr = jsonMatch[0];
    const analysis = JSON.parse(jsonStr) as GroceryBillAnalysis;
    
    // Validate the response has required fields
    if (!analysis.detectedItems || !analysis.categories || !analysis.mealSuggestions) {
      throw new Error("Invalid response structure from API");
    }

    return analysis;
  } catch (error) {
    console.error("Error analyzing grocery bill:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to analyze grocery bill: ${error.message}`);
    }
    throw new Error("Failed to analyze grocery bill. Please try again.");
  }
}
