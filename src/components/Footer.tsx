import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/lib/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Logo & Mission */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src="/image.png" alt="ME4ALL Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-bold text-sm md:text-base">ME4ALL</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t("footer.mission")}
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs md:text-sm text-muted-foreground">
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
