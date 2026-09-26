function UtilityBar() {
  return (
    <div className="hidden h-9 bg-brand-navy text-white md:block">
      <div className="container flex h-full items-center justify-end">
        <div className="flex items-center gap-6 text-sm">
          <span>Admissions Open</span>

          <a
            href="tel:+919876543210"
            className="font-semibold transition-opacity hover:opacity-80"
          >
            +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
}

export default UtilityBar;