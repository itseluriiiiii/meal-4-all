import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-xl">🍽️</span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg">ME4A</span>
              <span className="hidden sm:inline text-sm text-muted-foreground ml-1">Meal For All</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Fighting hunger together</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
