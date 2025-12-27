import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/lib/translations";
import HeroImage from "@/components/HeroImage";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section className="min-h-screen gradient-hero flex flex-col justify-center px-4 py-8 md:py-20">
      <div className="container max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Hero Image - Shows first on mobile */}
          <div className="order-1 lg:order-2 animate-fade-in-up w-full">
            <HeroImage />
          </div>
          
          {/* Hero Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-4 md:space-y-6 w-full">
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up animation-delay-100">
              {t("hero.eatSmart")}{" "}
              <span className="text-gradient">{t("hero.liveBetter")}</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
              {t("hero.description")}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300 pt-2 md:pt-4">
              <button 
                onClick={onGetStarted}
                className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base"
              >
                {t("hero.startJourney")}
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start pt-2 md:pt-4 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t("hero.free")}
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {t("hero.aiPowered")}
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t("hero.noWaste")}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-pulse-soft">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
