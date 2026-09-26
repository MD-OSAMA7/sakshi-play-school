import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const quickLinks = [
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
    label: "Contact Us",
    href: "/contact",
  },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white/50">
      <div className="container relative">
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-0 lg:py-7">
          {/* School Logo */}
          <div className="flex items-center justify-center sm:col-span-2 lg:col-span-3 lg:justify-start lg:border-r lg:border-white/30 lg:pr-6">
            <NavLink
              to="/"
              aria-label="Sakshi Play School home"
              className="block"
            >
              <img
                src="/images/logo.png"
                alt="Sakshi Play School"
                className="h-20 w-auto object-contain sm:h-24 lg:h-28"
              />
            </NavLink>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-2 lg:col-span-3 lg:border-r lg:border-white/30 lg:px-6">
            <h2 className="text-base text-white font-bold sm:text-lg">
              Quick Links
            </h2>

            <nav
              className="grid grid-cols-2"
              aria-label="Footer quick links"
            >
              {quickLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className="flex min-h-8 items-center gap-0.5 text-sm font-medium text-white/50 transition-colors duration-200 hover:text-white/80"
                >
                  <ChevronRight
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                  />

                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact Us */}
          <div className="sm:col-span-2 lg:col-span-4 lg:border-r lg:border-white/30 lg:px-6">
            <h2 className="text-base font-bold text-white sm:text-lg">
              Contact Us
            </h2>

            <div className="mt-1.5 flex flex-col gap-3">
              {/* Location */}
              <div className="flex items-start gap-1.5 hover:text-white/70">
                <MapPin
                  size={25}
                  strokeWidth={2.2}
                  className="mt-1 shrink-0"
                  aria-hidden="true"
                />

                <address className="not-italic ">
                  <p className="text-sm font-medium leading-5 sm:text-base">
                    Simri, Bakhtiyarpur
                  </p>

                  <p className="text-sm font-medium leading-5 sm:text-base">
                    Near Shambhu Industries
                  </p>

                  <p className="text-sm font-medium leading-5 sm:text-base">
                    Madhuwan, Saharsa - 852127
                  </p>
                </address>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 hover:text-white/80">
                <Phone
                  size={21}
                  strokeWidth={2.2}
                  className="shrink-0"
                  aria-hidden="true"
                />

                <div>
                  <a
                    href="tel:+917061107079"
                    className="block text-base font-bold transition-opacity duration-200 hover:opacity-80 sm:text-lg"
                  >
                    7061107079
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="sm:col-span-2 lg:col-span-2 lg:px-5">
            <h2 className="text-base font-bold sm:text-lg text-white">
              Follow Us
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border text-white/70 rounded-full hover:bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:text-white transition-transform duration-200 hover:scale-105 sm:h-10 sm:w-10"
              >
                <FaInstagram size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border text-white/70 hover:text-white transition-transform duration-200 hover:bg-blue-600 hover:scale-105 sm:h-10 sm:w-10"
              >
                <FaFacebookF size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>

              <a
                href="mailto:info@sakshiplayschool.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-blue-100 hover:text-brand-navy  border text-white/70 transition-transform duration-200 hover:scale-105 sm:h-10 sm:w-10"
              >
                <Mail size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
