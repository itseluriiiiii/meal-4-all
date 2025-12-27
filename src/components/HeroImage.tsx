import { Utensils, Heart, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-salad.jpg";

const HeroImage = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative background circle */}
      <div className="absolute -inset-4 bg-secondary/40 rounded-[3rem] rotate-3" />
      
      {/* Main image container */}
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-card">
        <img
          src={heroImage}
          alt="Fresh healthy salad bowl with colorful vegetables"
          className="w-full h-auto object-cover aspect-[4/3]"
        />
        
        {/* Floating badges */}
        <div className="badge-float top-4 left-4 bg-card/90 text-foreground flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Heart className="w-3 h-3 text-primary" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Nutrition</div>
            <div className="font-semibold text-xs">Balanced</div>
          </div>
        </div>
        
        <div className="badge-float bottom-6 right-4 bg-card/90 text-foreground flex items-center gap-2 animation-delay-200">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Leaf className="w-3 h-3 text-primary" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-xs">Budget Friendly</div>
            <div className="text-[10px] text-muted-foreground">Maximize nutrition</div>
          </div>
        </div>
      </div>
      
      {/* Floating food icons */}
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center food-float animation-delay-100">
        <span className="text-lg">🥑</span>
      </div>
      <div className="absolute top-1/4 -left-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center food-float animation-delay-300">
        <span className="text-sm">🍅</span>
      </div>
      <div className="absolute bottom-1/4 -right-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center food-float animation-delay-500">
        <span className="text-sm">🥬</span>
      </div>
    </div>
  );
};

export default HeroImage;
