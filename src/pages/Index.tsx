import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MealPlannerForm, { MealPlanFormData } from "@/components/MealPlannerForm";
import MealPlanResults, { MealPlan } from "@/components/MealPlanResults";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { generateMealPlan } from "@/lib/gemini";

// Mock meal plan for demo (will be replaced with AI-generated content)
const mockMealPlan: MealPlan = {
  breakfast: {
    name: "Vegetable Egg Scramble",
    description: "A protein-rich start with colorful vegetables, perfect for sustained energy throughout the morning.",
    ingredients: ["Eggs", "Tomatoes", "Onions", "Rice (leftover)"],
    nutritionHighlight: "High protein, Vitamin A & C",
    estimatedCost: "~$1.50",
  },
  lunch: {
    name: "Hearty Bean Rice Bowl",
    description: "A filling and nutritious bowl combining complete proteins from beans and rice.",
    ingredients: ["Rice", "Beans", "Carrots", "Onions"],
    nutritionHighlight: "Complete protein, High fiber",
    estimatedCost: "~$2.00",
  },
  dinner: {
    name: "Chicken Potato Stew",
    description: "A warming, satisfying dinner that stretches protein across the whole family.",
    ingredients: ["Chicken", "Potatoes", "Carrots", "Tomatoes"],
    nutritionHighlight: "Lean protein, Potassium, B vitamins",
    estimatedCost: "~$3.50",
  },
  tips: [
    "Cook beans in larger batches and store for 3-4 days to save time and fuel.",
    "Vegetable scraps (carrot tops, onion skins) can make nutritious broth - don't throw them away!",
    "Eggs are one of the most affordable complete proteins - include them daily if possible.",
  ],
  substitutes: [
    {
      missing: "Leafy greens (Iron)",
      alternatives: ["Beans", "Lentils", "Pumpkin seeds"],
      reason: "These are often more affordable and shelf-stable sources of iron.",
    },
    {
      missing: "Dairy (Calcium)",
      alternatives: ["Sesame seeds", "Dried fish with bones", "Fortified bread"],
      reason: "Great calcium sources that are budget-friendly in most regions.",
    },
  ],
};

const Index = () => {
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (data: MealPlanFormData) => {
    setIsLoading(true);
    
    try {
      // Call Gemini API to generate meal plan
      const mealPlan = await generateMealPlan({
        ingredients: data.ingredients,
        familySize: data.familySize,
        region: data.region,
      });
      
      setMealPlan(mealPlan);
      setShowMealPlan(true);
      
      toast({
        title: "Meal Plan Created! 🎉",
        description: "We've crafted a nutritious plan based on your ingredients.",
      });

      // Scroll to results
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowMealPlan(false);
    setMealPlan(null);
    setTimeout(scrollToForm, 100);
  };

  return (
    <>
      <Helmet>
        <title>ME4ALL - Meal For All | Nutritious, Affordable Meal Planning</title>
        <meta name="description" content="Create nutritious, budget-friendly meals with what you have. AI-powered meal planning that reduces food waste and maximizes nutrition for everyone." />
        <meta name="keywords" content="meal planning, nutrition, affordable meals, food waste, zero hunger, SDG 2" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {!showMealPlan ? (
            <>
              <HeroSection onGetStarted={scrollToForm} />
              <div ref={formRef}>
                <MealPlannerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </div>
            </>
          ) : (
            mealPlan && <MealPlanResults mealPlan={mealPlan} onReset={handleReset} />
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
