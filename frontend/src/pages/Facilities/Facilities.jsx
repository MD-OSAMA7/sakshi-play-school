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
        {/* Decorative Top Elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 top-8 h-20 w-20 rounded-full bg-brand-gold/30 blur-2xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-4 h-16 w-16 rounded-full bg-pink-200/50 blur-2xl"
        />

        <div className="container">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            {/* Hero Content */}
            <div className="relative z-10 py-10 sm:py-14 lg:col-span-6 lg:py-16">
              {/* Heading */}
              <div className="relative mt-2 w-fit">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                  <span className="">Our </span>

                  <span className=" text-pink-600">
                    Facilities
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-text-secondary sm:text-lg">
                A safe, modern and nurturing environment created for every child
                to learn, play and grow.
              </p>

              {/* Breadcrumb */}
              <div className="mt-5 flex items-center gap-2 text-xs font-medium sm:text-sm">
                <Link
                  to="/"
                  className="text-brand-blue transition-colors duration-200 hover:text-brand-navy"
                >
                  Home
                </Link>

                <span className="text-text-secondary">/</span>

                <span className="text-brand-navy">Facilities</span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative min-h-72 sm:min-h-80 lg:col-span-6 lg:min-h-96">
              {/* Main Image */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img
                  src="/images/facilities/facilities-hero.webp"
                  alt="Children enjoying facilities at Sakshi Play School"
                  className="h-full w-full object-cover"
                />

                {/* Soft left fade */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-r from-sky-50 via-sky-50/20 to-transparent"
                />
              </div>

              {/* Top Right Badge */}
              <div className="absolute right-3 top-3 z-10 w-24 rotate-3 rounded-full bg-white px-3 py-3 text-center shadow-floating sm:right-5 sm:top-5 sm:w-28">
                <p className="text-xs font-extrabold leading-4 text-brand-navy">
                  Play
                  <br />
                  Learn
                  <br />
                  Grow
                </p>

                <p className="mt-1 text-[10px] font-bold text-pink-600">
                  Together
                </p>
              </div>
            </div>
          </div>
        </div>

       
      </section>

      {/* =====================================================
          WORLD CLASS FACILITIES
      ====================================================== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="container">
          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">
           

            <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              World-Class Facilities for{" "}
              <span className="text-pink-600">Little Learners</span>
            </h2>

            

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
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
                    <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-brand-navy shadow-card">
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
                    <h3 className="text-lg font-extrabold leading-6 text-brand-navy">
                      {facility.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-text-secondary">
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
      <section className="relative overflow-hidden bg-white py-6 sm:mb-8 lg:mb-10">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-pink-600 px-6 py-10 text-center ">
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
            >
             
            </div>

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
              

              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                Our <span className="text-brand-gold">Facilities</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
                Visit Sakshi Play School and experience a safe, caring and
                joyful environment created for little learners.
              </p>

              {/* CTA Buttons */}
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-pink-600 shadow-button transition-all duration-200 hover:bg-brand-gold hover:text-brand-navy hover:shadow-button-hover"
                >
                  <Phone size={17} aria-hidden="true" />
                  Schedule a Visit
                </Link>

                <Link
                  to="/admission"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/50 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-pink-600"
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
