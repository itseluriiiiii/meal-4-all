export interface LocalizationRequest {
  userLocation?: {
    country?: string;
    state?: string;
    city?: string;
  };
  userLanguagePreference?: string;
  recipe: {
    meal_name: string;
    meal_type: "breakfast" | "lunch" | "dinner" | "snack";
    ingredients: string[];
    step_by_step_instructions: string[];
    nutritional_highlights: string;
    cost_estimate_in_inr: string;
    star_ratings: {
      nutrition: number;
      ease: number;
      budget: number;
      taste: number;
    };
  };
}

export interface LocalizedRecipe {
  detected_location: string;
  selected_language: string;
  confidence_level: "high" | "medium" | "low";
  localized_recipe: {
    meal_name: string;
    meal_type: string;
    ingredients: string[];
    step_by_step_instructions: string[];
    nutritional_highlights: string;
    cost_estimate_in_inr: string;
    star_ratings: {
      nutrition: number;
      ease: number;
      budget: number;
      taste: number;
    };
  };
}

// Language detection based on location
const locationLanguageMap: Record<string, { language: string; code: string; confidence: "high" | "medium" }> = {
  // India - States
  "maharashtra": { language: "Marathi", code: "mr", confidence: "high" },
  "karnataka": { language: "Kannada", code: "kn", confidence: "high" },
  "tamil_nadu": { language: "Tamil", code: "ta", confidence: "high" },
  "telangana": { language: "Telugu", code: "te", confidence: "high" },
  "andhra_pradesh": { language: "Telugu", code: "te", confidence: "high" },
  "west_bengal": { language: "Bengali", code: "bn", confidence: "high" },
  "punjab": { language: "Punjabi", code: "pa", confidence: "high" },
  "delhi": { language: "Hindi", code: "hi", confidence: "high" },
  "uttar_pradesh": { language: "Hindi", code: "hi", confidence: "high" },
  "madhya_pradesh": { language: "Hindi", code: "hi", confidence: "high" },
  "rajasthan": { language: "Hindi", code: "hi", confidence: "high" },
  "bihar": { language: "Hindi", code: "hi", confidence: "high" },
  "jharkhand": { language: "Hindi", code: "hi", confidence: "high" },
  "chhattisgarh": { language: "Hindi", code: "hi", confidence: "high" },
  "uttarakhand": { language: "Hindi", code: "hi", confidence: "high" },
  "haryana": { language: "Hindi", code: "hi", confidence: "high" },
  "himachal_pradesh": { language: "Hindi", code: "hi", confidence: "high" },
  "jammu_kashmir": { language: "Urdu", code: "ur", confidence: "high" },
  "kerala": { language: "Malayalam", code: "ml", confidence: "high" },
  "goa": { language: "Konkani", code: "kok", confidence: "high" },
  "gujarat": { language: "Gujarati", code: "gu", confidence: "high" },
  "india": { language: "Hindi", code: "hi", confidence: "medium" },
};

export function detectLanguage(request: LocalizationRequest): { language: string; code: string; confidence: "high" | "medium" | "low" } {
  // Priority 1: Explicit user preference
  if (request.userLanguagePreference) {
    return {
      language: request.userLanguagePreference,
      code: request.userLanguagePreference.toLowerCase().substring(0, 2),
      confidence: "high",
    };
  }

  // Priority 2: Location-based detection
  if (request.userLocation) {
    const state = request.userLocation.state?.toLowerCase().replace(/\s+/g, "_");
    const country = request.userLocation.country?.toLowerCase();

    if (state && locationLanguageMap[state]) {
      return { ...locationLanguageMap[state] };
    }

    if (country === "india") {
      return { language: "Hindi", code: "hi", confidence: "medium" };
    }
  }

  // Default to English
  return { language: "English", code: "en", confidence: "low" };
}

export function getLocationString(location?: { country?: string; state?: string; city?: string }): string {
  if (!location) return "Unknown";
  const parts = [location.city, location.state, location.country].filter(Boolean);
  return parts.join(", ") || "Unknown";
}

// Ingredient translation map for common Indian ingredients
const ingredientTranslations: Record<string, Record<string, string>> = {
  hi: {
    "rice": "चावल",
    "eggs": "अंडे",
    "onion": "प्याज",
    "tomato": "टमाटर",
    "coriander leaves": "धनिया पत्ते",
    "cumin": "जीरा",
    "turmeric": "हल्दी",
    "chili powder": "मिर्च पाउडर",
    "salt": "नमक",
    "oil": "तेल",
    "ghee": "घी",
    "butter": "मक्खन",
    "milk": "दूध",
    "yogurt": "दही",
    "lentils": "दाल",
    "beans": "बीन्स",
    "chicken": "चिकन",
    "potato": "आलू",
    "carrot": "गाजर",
    "garlic": "लहसुन",
    "ginger": "अदरक",
    "green chili": "हरी मिर्च",
    "cilantro": "हरा धनिया",
    "mint": "पुदीना",
    "flour": "मैदा",
    "whole wheat flour": "आटा",
    "baking powder": "बेकिंग पाउडर",
    "sugar": "चीनी",
    "honey": "शहद",
  },
  ta: {
    "rice": "அரிசி",
    "eggs": "முட்டை",
    "onion": "வெங்காயம்",
    "tomato": "தக்காளி",
    "coriander leaves": "கொத்தமல்லி",
    "salt": "உப்பு",
    "oil": "எண்ணெய்",
    "milk": "பால்",
    "yogurt": "தயிர்",
    "lentils": "பருப்பு",
    "chicken": "கோழி",
    "potato": "உருளைக்கிழங்கு",
    "garlic": "பூண்டு",
    "ginger": "இஞ்சி",
  },
  te: {
    "rice": "బియ్యం",
    "eggs": "గుడ్లు",
    "onion": "ఉల్లిపాయ",
    "tomato": "టమాటా",
    "salt": "ఉప్పు",
    "oil": "నూనె",
    "milk": "పాలు",
    "lentils": "పప్పు",
    "chicken": "కోడి",
    "potato": "ఆలూ",
  },
  mr: {
    "rice": "तांदूळ",
    "eggs": "अंडी",
    "onion": "कांदा",
    "tomato": "टोमॅटो",
    "salt": "मीठ",
    "oil": "तेल",
    "milk": "दूध",
    "lentils": "दाळ",
    "chicken": "चिकन",
    "potato": "बटाटा",
  },
  ml: {
    "rice": "അരി",
    "eggs": "മുട്ട",
    "onion": "ഉള്ളി",
    "tomato": "തക്കാളി",
    "salt": "ഉപ്പ്",
    "oil": "എണ്ണ",
    "milk": "പാൽ",
    "lentils": "പയർ",
    "chicken": "കോഴി",
  },
};

export function translateIngredient(ingredient: string, languageCode: string): string {
  if (languageCode === "en") return ingredient;

  const translations = ingredientTranslations[languageCode];
  if (!translations) return ingredient;

  const lowerIngredient = ingredient.toLowerCase();
  
  // Try exact match first
  if (translations[lowerIngredient]) {
    return translations[lowerIngredient];
  }

  // Try partial match for compound ingredients
  for (const [key, value] of Object.entries(translations)) {
    if (lowerIngredient.includes(key)) {
      return ingredient.replace(new RegExp(key, "gi"), value);
    }
  }

  return ingredient;
}

export async function localizeRecipe(request: LocalizationRequest): Promise<LocalizedRecipe> {
  const languageInfo = detectLanguage(request);
  const locationString = getLocationString(request.userLocation);

  // For now, we'll handle English and basic translations
  // Full translation would require Gemini API call for complex text
  const localized: LocalizedRecipe = {
    detected_location: locationString,
    selected_language: languageInfo.language,
    confidence_level: languageInfo.confidence,
    localized_recipe: {
      meal_name: request.recipe.meal_name,
      meal_type: request.recipe.meal_type,
      ingredients: request.recipe.ingredients.map((ing) =>
        translateIngredient(ing, languageInfo.code)
      ),
      step_by_step_instructions: request.recipe.step_by_step_instructions,
      nutritional_highlights: request.recipe.nutritional_highlights,
      cost_estimate_in_inr: request.recipe.cost_estimate_in_inr,
      star_ratings: request.recipe.star_ratings,
    },
  };

  return localized;
}
