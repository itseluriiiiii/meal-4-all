import { Sun, Cloud, Moon, Lightbulb, DollarSign, Leaf } from "lucide-react";

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  tips: string[];
  substitutes: Substitute[];
}

export interface Meal {
  name: string;
  description: string;
  ingredients: string[];
  nutritionHighlight: string;
  estimatedCost: string;
}

export interface Substitute {
  missing: string;
  alternatives: string[];
  reason: string;
}

interface MealPlanResultsProps {
  mealPlan: MealPlan;
  onReset: () => void;
}

const mealIcons = {
  breakfast: { icon: Sun, color: "text-accent", bg: "bg-accent/10" },
  lunch: { icon: Cloud, color: "text-primary", bg: "bg-primary/10" },
  dinner: { icon: Moon, color: "text-primary", bg: "bg-primary/10" },
};

const MealCard = ({ 
  type, 
  meal, 
  delay 
}: { 
  type: "breakfast" | "lunch" | "dinner"; 
  meal: Meal; 
  delay: string;
}) => {
  const { icon: Icon, color, bg } = mealIcons[type];
  
  return (
    <div className={`bg-card rounded-3xl p-6 shadow-card animate-fade-in-up ${delay}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground capitalize">{type}</p>
          <h3 className="text-xl font-bold">{meal.name}</h3>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">{meal.description}</p>
      
      {/* Ingredients */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Ingredients:</p>
        <div className="flex flex-wrap gap-2">
          {meal.ingredients.map((ing, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-secondary rounded-full text-sm"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
      
      {/* Nutrition & Cost */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <Leaf className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">{meal.nutritionHighlight}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">{meal.estimatedCost}</span>
        </div>
      </div>
    </div>
  );
};

const MealPlanResults = ({ mealPlan, onReset }: MealPlanResultsProps) => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-2xl">🎉</span>
            <span className="text-sm font-medium text-primary">Your Plan is Ready!</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Today's Meal Plan
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Nutritious meals crafted from your available ingredients
          </p>
        </div>

        {/* Meals Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <MealCard type="breakfast" meal={mealPlan.breakfast} delay="animation-delay-100" />
          <MealCard type="lunch" meal={mealPlan.lunch} delay="animation-delay-200" />
          <MealCard type="dinner" meal={mealPlan.dinner} delay="animation-delay-300" />
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-6 md:p-8 mb-8 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold">Nutrition Tips</h3>
          </div>
          <ul className="space-y-3">
            {mealPlan.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Substitutes Section */}
        {mealPlan.substitutes.length > 0 && (
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-card mb-8 animate-fade-in-up animation-delay-500">
            <h3 className="text-xl font-bold mb-4">💡 Low-Cost Substitutes</h3>
            <p className="text-muted-foreground mb-4">
              Missing some nutrients? Here are affordable alternatives:
            </p>
            <div className="space-y-4">
              {mealPlan.substitutes.map((sub, idx) => (
                <div key={idx} className="p-4 bg-secondary/50 rounded-2xl">
                  <p className="font-medium mb-2">
                    Instead of <span className="text-primary">{sub.missing}</span>, try:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {sub.alternatives.map((alt, altIdx) => (
                      <span key={altIdx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {alt}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{sub.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center animate-fade-in-up animation-delay-500">
          <button
            onClick={onReset}
            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-colors"
          >
            Create Another Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default MealPlanResults;
