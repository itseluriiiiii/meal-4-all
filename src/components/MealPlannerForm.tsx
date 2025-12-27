import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  Users, 
  MapPin, 
  Utensils, 
  X, 
  Plus,
  Loader2,
  Sparkles
} from "lucide-react";

interface MealPlannerFormProps {
  onSubmit: (data: MealPlanFormData) => void;
  isLoading: boolean;
}

export interface MealPlanFormData {
  ingredients: string[];
  familySize: number;
  region: string;
}

const commonIngredients = [
  "Rice", "Beans", "Eggs", "Potatoes", "Onions", 
  "Tomatoes", "Carrots", "Chicken", "Lentils", "Bread"
];

const regions = [
  "South Asia", "Southeast Asia", "East Africa", "West Africa",
  "Latin America", "Middle East", "Eastern Europe", "North America"
];

const MealPlannerForm = ({ onSubmit, isLoading }: MealPlannerFormProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [familySize, setFamilySize] = useState(4);
  const [region, setRegion] = useState("");

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length > 0 && region) {
      onSubmit({ ingredients, familySize, region });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient(currentIngredient);
    }
  };

  return (
    <section id="meal-planner" className="py-16 md:py-24 px-4">
      <div className="container max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Planning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What's in Your Kitchen?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us what you have, and we'll create nutritious, budget-friendly meals for your family.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ingredients Section */}
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-card animate-fade-in-up animation-delay-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Available Ingredients</h3>
                <p className="text-sm text-muted-foreground">Add what you have at home</p>
              </div>
            </div>

            {/* Input field */}
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Type an ingredient..."
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 h-12 rounded-xl border-2 focus:border-primary"
              />
              <Button
                type="button"
                variant="default"
                size="icon"
                className="h-12 w-12"
                onClick={() => addIngredient(currentIngredient)}
                disabled={!currentIngredient.trim()}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick add chips */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map(ing => (
                  <button
                    key={ing}
                    type="button"
                    onClick={() => addIngredient(ing)}
                    disabled={ingredients.includes(ing)}
                    className="px-3 py-1.5 text-sm rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {ing}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected ingredients */}
            {ingredients.length > 0 && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium mb-2">Your ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map(ing => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {ing}
                      <button
                        type="button"
                        onClick={() => removeIngredient(ing)}
                        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Family Size & Region */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Family Size */}
            <div className="bg-card rounded-3xl p-6 shadow-card animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Family Size</h3>
                  <p className="text-sm text-muted-foreground">How many people?</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFamilySize(Math.max(1, familySize - 1))}
                  disabled={familySize <= 1}
                >
                  -
                </Button>
                <span className="text-3xl font-bold w-12 text-center">{familySize}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFamilySize(Math.min(12, familySize + 1))}
                  disabled={familySize >= 12}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Region */}
            <div className="bg-card rounded-3xl p-6 shadow-card animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Your Region</h3>
                  <p className="text-sm text-muted-foreground">For local food habits</p>
                </div>
              </div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-input bg-background focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select region...</option>
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center animate-fade-in-up animation-delay-400">
            <Button
              type="submit"
              variant="hero"
              size="xl"
              disabled={ingredients.length === 0 || !region || isLoading}
              className="group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Your Meal Plan...
                </>
              ) : (
                <>
                  Generate Meal Plan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Free • No sign-up required • Powered by AI
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MealPlannerForm;
