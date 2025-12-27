import { useState, useRef } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/lib/translations";
import { analyzeGroceryBill, GroceryBillAnalysis } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";

interface GroceryScannerProps {
  onAnalysisComplete: (analysis: GroceryBillAnalysis) => void;
}

const GroceryBillScanner = ({ onAnalysisComplete }: GroceryScannerProps) => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dietaryPreference, setDietaryPreference] = useState<"veg" | "non-veg" | "vegan" | "egg">("veg");
  const [healthGoal, setHealthGoal] = useState<"weight-loss" | "muscle-gain" | "balanced">("balanced");
  const [allergies, setAllergies] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast({
        title: t("action.error"),
        description: t("action.uploadBill"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Extract base64 data properly
      let base64Data = image;
      if (image.includes(",")) {
        base64Data = image.split(",")[1];
      }

      if (!base64Data) {
        throw new Error("Invalid image data");
      }

      const allergiesList = allergies
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a.length > 0);

      const analysis = await analyzeGroceryBill({
        imageBase64: base64Data,
        dietaryPreference,
        healthGoal,
        allergies: allergiesList.length > 0 ? allergiesList : undefined,
      });

      onAnalysisComplete(analysis);
      toast({
        title: t("action.success"),
        description: "Grocery bill analyzed and meal suggestions generated.",
      });
    } catch (error) {
      console.error("Error analyzing bill:", error);
      toast({
        title: t("action.error"),
        description: error instanceof Error ? error.message : "Failed to analyze grocery bill.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl md:rounded-3xl p-4 md:p-8 shadow-card">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{t("scanner.pageTitle")}</h2>

      {/* Image Upload */}
      <div className="mb-6">
        {image ? (
          <div className="relative">
            <img src={image} alt="Grocery bill" className="w-full max-h-64 object-cover rounded-lg" />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-primary rounded-lg p-8 text-center hover:bg-primary/5 transition-colors"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-semibold text-sm md:text-base">{t("action.uploadBill")}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{t("action.uploadHint")}</p>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Dietary Preference */}
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">{t("scanner.dietary")}</label>
          <select
            value={dietaryPreference}
            onChange={(e) => setDietaryPreference(e.target.value as any)}
            className="w-full h-10 md:h-12 px-3 md:px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none text-xs md:text-sm"
          >
            <option value="veg">{t("dietary.veg")}</option>
            <option value="non-veg">{t("dietary.nonveg")}</option>
            <option value="vegan">{t("dietary.vegan")}</option>
            <option value="egg">{t("dietary.egg")}</option>
          </select>
        </div>

        {/* Health Goal */}
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">{t("scanner.healthGoal")}</label>
          <select
            value={healthGoal}
            onChange={(e) => setHealthGoal(e.target.value as any)}
            className="w-full h-10 md:h-12 px-3 md:px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none text-xs md:text-sm"
          >
            <option value="balanced">{t("goal.balanced")}</option>
            <option value="weight-loss">{t("goal.weightloss")}</option>
            <option value="muscle-gain">{t("goal.musclegain")}</option>
          </select>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">{t("scanner.allergies")}</label>
          <input
            type="text"
            placeholder={t("scanner.allergiesPlaceholder")}
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full h-10 md:h-12 px-3 md:px-4 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none text-xs md:text-sm"
          />
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={!image || isLoading}
        className="w-full px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
            {t("scanner.analyzing")}
          </>
        ) : (
          t("scanner.analyze")
        )}
      </button>
    </div>
  );
};

export default GroceryBillScanner;
