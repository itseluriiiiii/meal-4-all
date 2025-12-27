import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/lib/translations";
import { GroceryBillAnalysis } from "@/lib/gemini";
import { Clock, Leaf, Star, ChevronDown } from "lucide-react";
import { useState } from "react";

interface GroceryBillResultsProps {
  analysis: GroceryBillAnalysis;
  onReset: () => void;
}

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

const GroceryBillResults = ({ analysis, onReset }: GroceryBillResultsProps) => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [expandedMeal, setExpandedMeal] = useState<number | null>(0);

  const toggleMeal = (idx: number) => {
    setExpandedMeal(expandedMeal === idx ? null : idx);
  };

  return (
    <section className="py-8 md:py-32 px-3 sm:px-4">
      <div className="container max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-4 md:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 md:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full mb-2 md:mb-4 text-xs md:text-sm">
            <span className="text-base md:text-2xl">✅</span>
            <span className="font-medium text-primary text-xs sm:text-sm">{t("scanner.billAnalyzed")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Meal Plan Ready
          </h2>
        </div>

        {/* Detected Items */}
        <div className="bg-card rounded-lg md:rounded-3xl p-3 sm:p-4 md:p-8 shadow-card mb-3 md:mb-6 animate-fade-in-up">
          <h3 className="text-sm sm:text-base md:text-xl font-bold mb-2 md:mb-3">{t("scanner.detectedItems")}</h3>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {analysis.detectedItems.map((item, idx) => (
              <span key={idx} className="px-2 sm:px-3 py-1 bg-secondary rounded-full text-xs md:text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Categories - Hidden on mobile */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6 mb-3 md:mb-6">
          {/* Proteins */}
          <div className="bg-card rounded-lg md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-card">
            <h4 className="font-bold text-xs sm:text-sm md:text-lg mb-2 md:mb-3 flex items-center gap-1">
              <span className="text-sm md:text-lg">🥚</span> <span className="hidden sm:inline">{t("scanner.proteins")}</span><span className="sm:hidden text-xs">Pro</span>
            </h4>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {analysis.categories.proteins.map((item, idx) => (
                <span key={idx} className="px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-card rounded-lg md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-card">
            <h4 className="font-bold text-xs sm:text-sm md:text-lg mb-2 md:mb-3 flex items-center gap-1">
              <span className="text-sm md:text-lg">🌾</span> <span className="hidden sm:inline">{t("scanner.carbs")}</span><span className="sm:hidden text-xs">Carb</span>
            </h4>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {analysis.categories.carbs.map((item, idx) => (
                <span key={idx} className="px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full text-xs md:text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Vegetables */}
          <div className="bg-card rounded-lg md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-card">
            <h4 className="font-bold text-xs sm:text-sm md:text-lg mb-2 md:mb-3 flex items-center gap-1">
              <span className="text-sm md:text-lg">🥬</span> <span className="hidden sm:inline">{t("scanner.vegetables")}</span><span className="sm:hidden text-xs">Veg</span>
            </h4>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {analysis.categories.vegetables.map((item, idx) => (
                <span key={idx} className="px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Fats */}
          <div className="bg-card rounded-lg md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-card">
            <h4 className="font-bold text-xs sm:text-sm md:text-lg mb-2 md:mb-3 flex items-center gap-1">
              <span className="text-sm md:text-lg">🫒</span> <span className="hidden sm:inline">{t("scanner.fats")}</span><span className="sm:hidden text-xs">Fat</span>
            </h4>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {analysis.categories.fats.map((item, idx) => (
                <span key={idx} className="px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs md:text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Meal Suggestions */}
        <div className="mb-3 md:mb-6">
          <h3 className="text-sm sm:text-base md:text-2xl font-bold mb-2 md:mb-3">{t("scanner.mealSuggestionsTitle")}</h3>
          <div className="space-y-2">
            {analysis.mealSuggestions.map((meal, idx) => (
              <div key={idx} className="bg-card rounded-lg md:rounded-3xl shadow-card overflow-hidden">
                {/* Header - Always Visible */}
                <button
                  onClick={() => toggleMeal(idx)}
                  className="w-full p-3 sm:p-3 md:p-5 flex flex-col gap-2 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 w-full">
                    <h4 className="text-xs sm:text-sm md:text-base font-bold line-clamp-2 text-left flex-1">{meal.name}</h4>
                    <ChevronDown 
                      className={`w-4 h-4 md:w-4 md:h-4 transition-transform flex-shrink-0 ${expandedMeal === idx ? 'rotate-180' : ''}`}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 flex-shrink-0" />
                      <span>{meal.prepTime}</span>
                    </div>
                    <div className="flex-shrink-0">
                      <StarRating score={meal.score} />
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedMeal === idx && (
                  <div className="border-t border-border px-3 sm:px-3 md:px-5 py-2 md:py-3 space-y-2 md:space-y-2.5 bg-secondary/20">
                    {/* Ingredients */}
                    <div>
                      <p className="text-xs md:text-sm font-medium mb-1">Ing:</p>
                      <div className="flex flex-wrap gap-1">
                        {meal.ingredients.map((ing, ingIdx) => (
                          <span key={ingIdx} className="px-1.5 py-0.5 bg-secondary rounded text-xs md:text-sm">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cooking Steps */}
                    <div>
                      <p className="text-xs md:text-sm font-medium mb-1">Steps:</p>
                      <ol className="text-xs md:text-sm text-muted-foreground space-y-1">
                        {meal.cookingSteps.slice(0, 2).map((step, stepIdx) => (
                          <li key={stepIdx} className="flex gap-1">
                            <span className="font-bold flex-shrink-0 min-w-fit">{stepIdx + 1}.</span>
                            <span className="break-words">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Nutrition */}
                    <div className="flex items-start gap-1 pt-1 border-t border-border">
                      <Leaf className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm text-muted-foreground break-words">{meal.nutritionalBenefits}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={onReset}
            className="px-4 sm:px-6 md:px-8 py-2.5 md:py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-colors text-xs sm:text-sm md:text-base"
          >
            {t("scanner.scanAnother")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GroceryBillResults;
