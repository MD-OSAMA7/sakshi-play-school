import {
  BookOpen,
  Camera,
  CheckCircle2,
  Droplets,
  HeartPulse,
  Library,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Utensils,
  UsersRound,
} from "lucide-react";

import { Link } from "react-router-dom";

const facilitiesData = [
  {
    id: 1,
    title: "Spacious Classrooms",
    description:
      "Well-ventilated, bright and child-friendly classrooms designed to make everyday learning enjoyable.",
    image: "/images/facilities/classrooms.webp",
    icon: BookOpen,
    iconClass: "bg-pink-600 text-white",
  },
  {
    id: 2,
    title: "Safe Play Area",
    description:
      "A fun and secure play space where children can enjoy outdoor activities and age-appropriate play.",
    image: "/images/facilities/play-area.webp",
    icon: UsersRound,
    iconClass: "bg-amber-500 text-white",
  },
  {
    id: 3,
    title: "Learning Materials",
    description:
      "Engaging books, toys, activity resources and educational materials that encourage curiosity.",
    image: "/images/facilities/learning-materials.webp",
    icon: BookOpen,
    iconClass: "bg-green-600 text-white",
  },
  {
    id: 4,
    title: "Library Corner",
    description:
      "A dedicated reading space where children can discover stories, pictures and new ideas.",
    image: "/images/facilities/library.webp",
    icon: Library,
    iconClass: "bg-pink-600 text-white",
  },
  {
    id: 5,
    title: "Smart Learning Tools",
    description:
      "Interactive learning tools and digital resources that support modern activity-based education.",
    image: "/images/facilities/smart-learning.webp",
    icon: MonitorSmartphone,
    iconClass: "bg-blue-600 text-white",
  },
  {
    id: 6,
    title: "Hygienic Washrooms",
    description:
      "Clean and hygienic washroom facilities maintained with children's comfort and safety in mind.",
    image: "/images/facilities/washrooms.webp",
    icon: Droplets,
    iconClass: "bg-amber-500 text-white",
  },
  {
    id: 7,
    title: "Health & Safety",
    description:
      "Basic healthcare and safety arrangements to support children whenever care or attention is needed.",
    image: "/images/facilities/health-safety.webp",
    icon: HeartPulse,
    iconClass: "bg-green-600 text-white",
  },
  {
    id: 8,
    title: "Nutritious Snacks",
    description:
      "Healthy snack options that help support children's energy and wellbeing during the school day.",
    image: "/images/facilities/snacks.webp",
    icon: Utensils,
    iconClass: "bg-pink-600 text-white",
  },
  {
    id: 9,
    title: "CCTV Surveillance",
    description:
      "Monitored areas help maintain a secure and safety-focused environment for children and staff.",
    image: "/images/facilities/cctv.webp",
    icon: Camera,
    iconClass: "bg-blue-600 text-white",
  },
];

const safetyPoints = [
  "Safe and child-friendly environment",
  "Clean and hygienic surroundings",
  "Dedicated spaces for learning and play",
  "Age-appropriate facilities for children",
  "Caring environment for young learners",
  "Comfortable spaces for daily activities",
];

function Facilities() {
  return (
    <main className="overflow-hidden bg-white font-sans">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50">
        <img
          src="/images/facilities/facilities-hero.webp"
          alt="Happy children learning at Sakshi Play School"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Left White Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none max-w-260 absolute inset-0 bg-linear-to-r from-white via-white/99 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white via-white/10 to-transparent md:h-20"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-linear-to-b from-white/70 to-transparent"
        />

        <div className="container">
          <div className="grid min-h-72 items-center sm:min-h-80 lg:min-h-120 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="relative z-10 max-w-xl py-12 text-start md:py-16 lg:py-20">
              
              <h1 className="font-serif font-black uppercase leading-tight tracking-tight text-4xl text-brand-navy sm:text-5xl md:text-6xl lg:text-7xl">
                <span>Our </span>

                <span className="text-pink-600 block">Facilities</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-75 sm:max-w-90 font-sans text-sm leading-7 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base">
                A safe, modern and nurturing environment created for every child
                to learn, play and grow.
              </p>

              {/* Hero CTA */}
              <div className="mt-7 flex flex-wrap justify-start gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-600 py-2 px-3 font-sans text-sm font-semibold leading-5 tracking-normal text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  <Phone size={16} aria-hidden="true" />
                  Schedule a Visit
                </Link>

                <Link
                  to="/admission"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-navy bg-white py-2 px-3 font-sans text-sm font-semibold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-brand-navy hover:text-white sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  Start Admission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom Accent */}
      <div
        aria-hidden="true"
        className="h-1 w-full rounded-b-full bg-linear-to-r from-pink-500 via-brand-gold to-brand-blue"
      />

      {/* =====================================================
          WORLD CLASS FACILITIES
      ====================================================== */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mt-2 font-serif font-black leading-tight tracking-tight text-2xl text-brand-navy sm:text-[1.375rem] md:text-3xl lg:text-4xl">
              World-Class Facilities for{" "}
              <span className="text-pink-600">Little Learners</span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl font-sans text-sm leading-7 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base">
              At Sakshi Play School, we provide a safe, modern and
              child-friendly environment with thoughtfully planned facilities
              that support learning, creativity, comfort and joyful everyday
              experiences.
            </p>
          </div>

          {/* =================================================
              FACILITY CARDS
          ================================================== */}
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {facilitiesData.map((facility) => {
              const Icon = facility.icon;

              return (
                <article
                  key={facility.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden sm:h-48">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-brand-navy/30 via-transparent to-transparent"
                    />

                    {/* Card Number */}
                    <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 font-sans text-xs font-bold leading-5 tracking-normal text-brand-navy shadow-card md:text-[0.8125rem] lg:text-sm">
                      {String(facility.id).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div
                      className={`absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-full shadow-card ${facility.iconClass}`}
                    >
                      <Icon size={21} strokeWidth={2} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif font-black leading-snug tracking-tight text-lg text-brand-navy sm:text-xl md:text-[1.25rem] lg:text-2xl">
                      {facility.title}
                    </h3>

                    <p className="mt-2 max-w-xl font-sans text-sm leading-7 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base">
                      {facility.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-pink-200 px-5 py-10 text-center sm:px-8 sm:py-12 lg:px-16">
            {/* Decorative Circle */}
            <div
              aria-hidden="true"
              className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/10"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-12 -right-10 h-36 w-36 rounded-full bg-brand-gold/20"
            />

            {/* Left Decorative Element */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-3 hidden sm:block"
            ></div>

            {/* Right Decorative Element */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-3 hidden sm:block"
            >
              <div className="flex items-end gap-1">
                <div className="h-14 w-7 rounded-t-full bg-white/30" />
                <div className="h-20 w-10 rounded-t-full bg-brand-gold/60" />
                <div className="h-12 w-6 rounded-t-full bg-white/30" />
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="mt-2 font-serif font-black leading-tight tracking-tight text-2xl text-brand-navy sm:text-[1.375rem] md:text-3xl lg:text-4xl">
                Our <span className="text-pink-600">Facilities</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-7 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base">
                Visit Sakshi Play School and experience a safe, caring and
                joyful environment created for little learners.
              </p>

              {/* CTA Buttons */}
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-600 py-2 px-3 font-sans text-sm font-bold leading-5 tracking-normal text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  <Phone size={17} aria-hidden="true" />
                  Schedule a Visit
                </Link>

                <Link
                  to="/admission"
                  className="inline-flex items-center justify-center rounded-lg border border-text-secondary py-2 px-3 font-sans text-sm font-bold leading-5 tracking-normal text-text-secondary transition-colors duration-200 hover:bg-white hover:text-pink-600 sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  Start Admission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Facilities;
