import { Sun, Cloud, Moon, Lightbulb, DollarSign, Leaf, Star } from "lucide-react";

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
  score?: number; // 1-5 star rating
  recipe?: string; // Cooking instructions
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

const StarRating = ({ score }: { score?: number }) => {
  if (!score) return null;
  
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 !== 0;
  
  return (
    <div className="flex items-center gap-0.5 flex-shrink-0">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 absolute" fill="currentColor" />
            {i < fullStars && (
              <div className="absolute top-0 left-0 w-full h-full">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              </div>
            )}
            {i === fullStars && hasHalfStar && (
              <div className="absolute top-0 left-0 overflow-hidden w-2 h-4">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              </div>
            )}
          </div>
        ))}
      </div>
      <span className="text-xs font-semibold text-yellow-600 ml-1 whitespace-nowrap">{score.toFixed(1)}</span>
    </div>
  );
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
    <div className={`bg-card rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-card animate-fade-in-up ${delay} border border-border/50 hover:shadow-lg transition-shadow h-full flex flex-col`}>
      {/* Header with icon */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 md:w-12 h-10 md:h-12 rounded-xl md:rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 md:w-6 h-5 md:h-6 ${color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide capitalize">{type}</p>
          </div>
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base md:text-lg font-bold leading-tight whitespace-normal flex-1">{meal.name}</h3>
          <div className="flex-shrink-0">
            <StarRating score={meal.score} />
          </div>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{meal.description}</p>
      
      {/* Ingredients Section */}
      <div className="mb-4 pb-4 border-b border-border/50">
        <p className="text-xs md:text-sm font-semibold text-foreground mb-2.5">Ingredients:</p>
        <div className="flex flex-wrap gap-2">
          {meal.ingredients.map((ing, idx) => (
            <span 
              key={idx}
              className="px-2.5 md:px-3 py-1 md:py-1.5 bg-secondary/60 hover:bg-secondary rounded-full text-xs md:text-sm font-medium text-secondary-foreground transition-colors"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>

      {/* Recipe Section */}
      {meal.recipe && (
        <div className="mb-4 pb-4 border-b border-border/50">
          <p className="text-xs md:text-sm font-semibold text-foreground mb-2.5">How to Make:</p>
          <ol className="text-xs md:text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            {meal.recipe.split('\n').filter(step => step.trim()).map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step.trim().replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        </div>
      )}
      
      {/* Nutrition Info */}
      <div className="mb-4 pb-4 border-b border-border/50">
        <div className="flex items-start gap-2 text-xs md:text-sm">
          <Leaf className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground leading-relaxed">{meal.nutritionHighlight}</span>
        </div>
      </div>
      
      {/* Cost Footer */}
      <div className="flex items-center gap-2 text-xs md:text-sm mt-auto">
        <DollarSign className="w-4 h-4 text-accent flex-shrink-0" />
        <span className="font-semibold text-foreground">{meal.estimatedCost}</span>
      </div>
    </div>
  );
};

const MealPlanResults = ({ mealPlan, onReset }: MealPlanResultsProps) => {
  return (
    <section className="py-8 md:py-24 px-4">
      <div className="container max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-2xl">✅</span>
            <span className="text-sm font-semibold text-primary">Your Meal Plan is Ready!</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            Today's Nutritious Meals
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Carefully crafted meals using your available ingredients
          </p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-16">
          <MealCard type="breakfast" meal={mealPlan.breakfast} delay="animation-delay-100" />
          <MealCard type="lunch" meal={mealPlan.lunch} delay="animation-delay-200" />
          <MealCard type="dinner" meal={mealPlan.dinner} delay="animation-delay-300" />
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 animate-fade-in-up animation-delay-400 border border-primary/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg md:text-2xl font-bold">💡 Nutrition Tips</h3>
          </div>
          <ul className="space-y-3">
            {mealPlan.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Substitutes Section */}
        {mealPlan.substitutes.length > 0 && (
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-card mb-8 md:mb-10 animate-fade-in-up animation-delay-500 border border-border/50">
            <h3 className="text-lg md:text-2xl font-bold mb-5">🔄 Budget-Friendly Substitutes</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-5">
              Missing some nutrients? Here are affordable alternatives:
            </p>
            <div className="space-y-4">
              {mealPlan.substitutes.map((sub, idx) => (
                <div key={idx} className="p-4 md:p-5 bg-secondary/40 rounded-xl border border-secondary/50 hover:bg-secondary/60 transition-colors">
                  <p className="font-semibold text-sm md:text-base mb-3">
                    Instead of <span className="text-primary">{sub.missing}</span>, try:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {sub.alternatives.map((alt, altIdx) => (
                      <span key={altIdx} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium">
                        {alt}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground italic">{sub.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center animate-fade-in-up animation-delay-500">
          <button
            onClick={onReset}
            className="px-6 md:px-10 py-3 md:py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-all hover:shadow-lg text-sm md:text-base"
          >
            Create Another Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default MealPlanResults;
