const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Mission */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-lg">🍽️</span>
              </div>
              <span className="font-heading font-bold">ME4A</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Making healthy eating accessible to everyone
            </p>
          </div>

          {/* SDG Badge */}
          <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-full">
            <span className="text-lg">🎯</span>
            <div className="text-sm">
              <p className="font-medium">UN SDG 2</p>
              <p className="text-muted-foreground text-xs">Zero Hunger</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ME4A. Free to use, forever.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
