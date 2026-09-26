import { useState } from "react";

import { Menu, Phone, X } from "lucide-react";

import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Facilities",
    href: "/facilities",
  },
  {
    label: "Admission",
    href: "/admission",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const desktopNavClasses = ({ isActive }) => {
    return `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-brand-navy text-white"
        : "text-text-primary hover:bg-brand-navy hover:text-white"
    }`;
  };

  const mobileNavClasses = ({ isActive }) => {
    return `min-h-12 rounded-md px-4 py-3 text-base font-medium transition-colors duration-200 ${
      isActive
        ? "bg-brand-navy text-white"
        : "text-text-primary hover:bg-gray-100"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-b-neutral-200 bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <NavLink
            to="/"
            className="shrink-0 leading-none"
            aria-label="Sakshi Play School home"
            onClick={closeMenu}
          >
            <span className="flex flex-col text-center">
              <span className="text-2xl font-extrabold tracking-tight sm:text-4xl">
                <span className="text-[#15569A]">S</span>
                <span className="text-[#2E9B59]">A</span>
                <span className="text-[#E53935]">K</span>
                <span className="text-[#F39C12]">S</span>
                <span className="text-[#D7267A]">H</span>
                <span className="text-[#238B57]">I</span>
              </span>

              <span className="text-xs font-extrabold tracking-[0.18rem] text-center pl-2 text-brand-navy sm:text-sm">
                PLAY SCHOOL
              </span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.label === "Home"}
                className={desktopNavClasses}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Admission CTA */}
          <a
            href="tel:+917061107079"
            className="hidden min-h-12 items-center gap-3 rounded-full bg-brand-navy px-5 text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-brand-blue lg:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Phone size={18} strokeWidth={2.2} aria-hidden="true" />
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-white/80">
                Admission is going on
              </span>

              <span className="text-sm font-bold">7061107079</span>
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-md text-brand-navy transition-colors hover:bg-gray-100 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X size={26} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={26} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 py-4 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end={item.label === "Home"}
                  className={mobileNavClasses}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Admission CTA */}
            <a
              href="tel:+917061107079"
              onClick={closeMenu}
              className="mt-4 flex min-h-12 items-center gap-3 rounded-xl bg-brand-navy px-4 py-3 text-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Phone size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>

              <span className="flex flex-col">
                <span className="text-xs text-white/80">
                  Admission is going on
                </span>

                <span className="text-base font-bold">7061107079</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
