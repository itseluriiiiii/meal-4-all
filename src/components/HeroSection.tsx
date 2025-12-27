import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroImage from "@/components/HeroImage";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="min-h-screen gradient-hero flex flex-col justify-center px-4 py-12 md:py-20">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Image - Shows first on mobile */}
          <div className="order-1 lg:order-2 animate-fade-in-up">
            <HeroImage />
          </div>
          
          {/* Hero Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">
                UN SDG 2: Zero Hunger
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up animation-delay-100">
              Eat Smart,{" "}
              <span className="text-gradient">Live Better</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
              Create nutritious, affordable meals with what you have. 
              AI-powered meal planning that reduces waste and maximizes nutrition.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onGetStarted}
                className="group"
              >
                Start Healthy Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                100% Free
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent" />
                AI-Powered
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                No Food Waste
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-pulse-soft">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
