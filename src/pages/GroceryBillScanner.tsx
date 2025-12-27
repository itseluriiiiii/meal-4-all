import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GroceryBillScanner from "@/components/GroceryBillScanner";
import GroceryBillResults from "@/components/GroceryBillResults";
import { GroceryBillAnalysis } from "@/lib/gemini";

const GroceryBillScannerPage = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [analysis, setAnalysis] = useState<GroceryBillAnalysis | null>(null);

  const handleReset = () => {
    setAnalysis(null);
  };

  return (
    <>
      <Helmet>
        <title>{t("page.scanner.title")}</title>
        <meta name="description" content={t("page.scanner.description")} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16 md:pt-20">
          <section className="py-8 md:py-16 px-4">
            <div className="container max-w-4xl mx-auto">
              {/* Page Header */}
              <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
                  {t("scanner.pageTitle")}
                </h1>
                <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
                  {t("scanner.pageSubtitle")}
                </p>
              </div>

              {/* Main Content */}
              {!analysis ? (
                <GroceryBillScanner onAnalysisComplete={setAnalysis} />
              ) : (
                <GroceryBillResults analysis={analysis} onReset={handleReset} />
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GroceryBillScannerPage;
