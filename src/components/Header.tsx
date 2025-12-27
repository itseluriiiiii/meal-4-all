import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/lib/translations";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl mx-auto px-3 sm:px-4 md:px-4">
        <div className="flex items-center justify-between h-13 sm:h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
            <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img src="/image.png" alt="ME4ALL Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-bold text-sm sm:text-base md:text-lg block">{t("app.title")}</span>
              <span className="hidden sm:inline text-xs md:text-sm text-muted-foreground">{t("app.subtitle")}</span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/grocery-scanner" className="text-sm font-medium hover:text-primary transition-colors">
                Scanner
              </Link>
            </nav>
            
            <div className="hidden sm:block">
              <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground flex-shrink-0">
              <span className="hidden md:inline">{t("app.tagline")}</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-1 p-3">
              <Link
                to="/"
                className="px-3 py-2.5 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/grocery-scanner"
                className="px-3 py-2.5 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Scanner
              </Link>
              <div className="px-3 py-2.5 sm:hidden">
                <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
