import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  MapPin, 
  Utensils, 
  X, 
  Plus,
  Loader2,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/lib/translations";

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
  const { language } = useLanguage();
  const t = useTranslation(language);
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
    <section id="meal-planner" className="py-8 md:py-24 px-3 sm:px-4">
      <div className="container max-w-3xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-4 py-2 sm:py-2 bg-secondary rounded-full mb-3 md:mb-4 text-xs md:text-sm">
            <Sparkles className="w-4 h-4 md:w-4 md:h-4 text-primary" />
            <span className="font-medium text-xs sm:text-sm">{t("form.aiPlanning")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            {t("form.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
            {t("form.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* Ingredients Section */}
          <div className="bg-card rounded-lg md:rounded-3xl p-4 sm:p-5 md:p-8 shadow-card animate-fade-in-up animation-delay-100">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-3 mb-4 md:mb-4">
              <div className="w-9 sm:w-10 md:w-11 h-9 sm:h-10 md:h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Utensils className="w-5 sm:w-5 md:w-6 h-5 sm:h-5 md:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">{t("form.ingredientsTitle")}</h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground">{t("form.ingredientsHint")}</p>
              </div>
            </div>

            {/* Input field */}
            <div className="flex gap-2 mb-4 md:mb-4">
              <Input
                type="text"
                placeholder={t("form.typeIngredient")}
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 h-11 md:h-12 rounded-lg md:rounded-xl border-2 focus:border-primary text-sm sm:text-base"
              />
              <Button
                type="button"
                variant="default"
                size="icon"
                className="h-11 md:h-12 w-11 md:w-12 flex-shrink-0"
                onClick={() => addIngredient(currentIngredient)}
                disabled={!currentIngredient.trim()}
              >
                <Plus className="w-5 md:w-5 h-5 md:h-5" />
              </Button>
            </div>

            {/* Quick add chips */}
            <div className="mb-4 md:mb-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{t("form.quickAdd")}</p>
              <div className="flex flex-wrap gap-2 md:gap-2">
                {commonIngredients.map(ing => (
                  <button
                    key={ing}
                    type="button"
                    onClick={() => addIngredient(ing)}
                    disabled={ingredients.includes(ing)}
                    className="px-3 sm:px-3 md:px-3 py-1.5 text-xs sm:text-sm md:text-sm rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {ing}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected ingredients */}
            {ingredients.length > 0 && (
              <div className="pt-4 md:pt-4 border-t border-border">
                <p className="text-xs sm:text-sm font-medium mb-2">{t("form.yourIngredients")}</p>
                <div className="flex flex-wrap gap-2 md:gap-2">
                  {ingredients.map(ing => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-3 md:px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm md:text-sm font-medium"
                    >
                      {ing}
                      <button
                        type="button"
                        onClick={() => removeIngredient(ing)}
                        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5 md:w-3.5 md:h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Family Size & Region */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Family Size */}
            <div className="bg-card rounded-lg md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-card animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-3 mb-4 md:mb-4">
                <div className="w-9 sm:w-10 md:w-11 h-9 sm:h-10 md:h-11 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 sm:w-5 md:w-6 h-5 sm:h-5 md:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base md:text-base">{t("form.familySize")}</h3>
                  <p className="text-xs sm:text-sm md:text-sm text-muted-foreground">{t("form.familySizeHint")}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 md:h-12 w-11 md:w-12 text-sm md:text-base"
                  onClick={() => setFamilySize(Math.max(1, familySize - 1))}
                  disabled={familySize <= 1}
                >
                  -
                </Button>
                <span className="text-3xl md:text-4xl font-bold w-10 md:w-12 text-center">{familySize}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 md:h-12 w-11 md:w-12 text-sm md:text-base"
                  onClick={() => setFamilySize(Math.min(12, familySize + 1))}
                  disabled={familySize >= 12}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Region */}
            <div className="bg-card rounded-lg md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-card animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-3 mb-4 md:mb-4">
                <div className="w-9 sm:w-10 md:w-11 h-9 sm:h-10 md:h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 sm:w-5 md:w-6 h-5 sm:h-5 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base md:text-base">{t("form.region")}</h3>
                  <p className="text-xs sm:text-sm md:text-sm text-muted-foreground">{t("form.regionHint")}</p>
                </div>
              </div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-11 md:h-12 px-3 sm:px-3.5 md:px-4 rounded-lg md:rounded-xl border-2 border-input bg-background focus:border-primary focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="">{t("form.selectRegion")}</option>
                {regions.map(r => (
                  <option key={r} value={r}>{t(`region.${r.toLowerCase().replace(/\s+/g, "")}`) || r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center animate-fade-in-up animation-delay-400">
            <button
              type="submit"
              disabled={ingredients.length === 0 || !region || isLoading}
              className="w-full md:w-auto px-7 sm:px-8 md:px-9 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base md:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-4 md:h-4 animate-spin inline mr-2 md:mr-2" />
                  {t("form.generating")}
                </>
              ) : (
                <>
                  {t("form.generate")} →
                </>
              )}
            </button>
            <p className="text-xs sm:text-sm md:text-sm text-muted-foreground mt-3 md:mt-3">
              {t("form.free")}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MealPlannerForm;
