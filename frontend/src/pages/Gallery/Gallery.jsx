import { Camera, Heart, Music2, Palette, Star, Trophy } from "lucide-react";

import { Link } from "react-router-dom";

const galleryItems = [
  {
    id: 1,
    title: "Classroom Activities",
    image: "/images/gallery/classroom-activities.webp",
    icon: BookOpenIcon,
    colorClass: "bg-pink-100 text-pink-600",
  },
  {
    id: 2,
    title: "Learning Through Play",
    image: "/images/gallery/learning-through-play.webp",
    icon: Camera,
    colorClass: "bg-amber-100 text-amber-600",
  },
  {
    id: 3,
    title: "Interactive Sessions",
    image: "/images/gallery/interactive-sessions.webp",
    icon: UsersIcon,
    colorClass: "bg-blue-100 text-brand-blue",
  },
  {
    id: 4,
    title: "Art & Craft Activities",
    image: "/images/gallery/art-craft.webp",
    icon: Palette,
    colorClass: "bg-pink-100 text-pink-600",
  },
  {
    id: 5,
    title: "Annual Function",
    image: "/images/gallery/annual-function.webp",
    icon: Music2,
    colorClass: "bg-green-100 text-green-600",
  },
  {
    id: 6,
    title: "Outdoor Activities",
    image: "/images/gallery/outdoor-activities.webp",
    icon: Heart,
    colorClass: "bg-purple-100 text-purple-600",
  },
  {
    id: 7,
    title: "School Events",
    image: "/images/gallery/school-events.webp",
    icon: CalendarIcon,
    colorClass: "bg-amber-100 text-amber-600",
  },
  {
    id: 8,
    title: "Creative Expressions",
    image: "/images/gallery/creative-expressions.webp",
    icon: Palette,
    colorClass: "bg-green-100 text-green-600",
  },
  {
    id: 9,
    title: "Special Days",
    image: "/images/gallery/special-days.webp",
    icon: Star,
    colorClass: "bg-pink-100 text-pink-600",
  },
  {
    id: 10,
    title: "Birthday Celebrations",
    image: "/images/gallery/birthday-celebrations.webp",
    icon: Heart,
    colorClass: "bg-purple-100 text-purple-600",
  },
  {
    id: 11,
    title: "Fun Moments",
    image: "/images/gallery/fun-moments.webp",
    icon: Camera,
    colorClass: "bg-blue-100 text-brand-blue",
  },
  {
    id: 12,
    title: "Our Achievements",
    image: "/images/gallery/achievements.webp",
    icon: Trophy,
    colorClass: "bg-amber-100 text-amber-600",
  },
];

function BookOpenIcon({ size = 20, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 4h7a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H2z" />
      <path d="M22 4h-7a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h7z" />
    </svg>
  );
}

function UsersIcon({ size = 20, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon({ size = 20, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function Gallery() {
  return (
    <main className="overflow-hidden bg-white font-sans">
      {/* =====================================================
          GALLERY HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50">
        <div className="container">
          <div className="grid items-center gap-6 lg:min-h-96 lg:grid-cols-12">
            {/* Hero Content */}
            <div className="relative z-10 py-10 sm:py-14 lg:col-span-6 lg:py-16">
              {/* Heading */}
              <div className="relative mt-2 w-fit">
                <h1 className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
                  <span className=" text-brand-navy">G</span>
                  <span className=" text-pink-600">a</span>
                  <span className=" text-brand-navy">l</span>
                  <span className=" text-pink-600">l</span>
                  <span className=" text-brand-navy">e</span>
                  <span className=" text-pink-600">r</span>
                  <span className=" text-brand-navy">y</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-text-secondary sm:text-lg">
                A glimpse of our little learners, big moments and happy memories
                at Sakshi Play School.
              </p>

              {/* Breadcrumb */}
              <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                <Link
                  to="/"
                  className="text-brand-blue transition-colors duration-200 hover:text-brand-navy"
                >
                  Home
                </Link>

                <span className="text-text-secondary">/</span>

                <span className="text-brand-navy">Gallery</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative min-h-72 sm:min-h-80 lg:col-span-6 lg:min-h-96">
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <img
                  src="/images/gallery/gallery-hero.webp"
                  alt="Happy child at Sakshi Play School"
                  className="h-full w-full border-0 object-cover"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-r from-sky-50 via-sky-30 to-transparent"
                />
               
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div
          aria-hidden="true"
          className="h-1 w-full rounded-b-full bg-linear-to-r from-pink-500 via-brand-gold to-brand-blue"
        />
      </section>

      {/* =====================================================
          GALLERY GRID
      ====================================================== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="container">
          {/* Gallery Cards */}
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {galleryItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Image Overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-brand-navy/20 via-transparent to-transparent"
                    />
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center gap-3 px-4 py-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.colorClass}`}
                    >
                      <Icon size={19} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold leading-5 text-brand-navy">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-1 bg-linear-to-r from-pink-500 via-brand-gold to-brand-blue" />
                </article>
              );
            })}
          </div>

          {/* Load More */}
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-pink-600 px-7 text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover"
            >
              <Camera size={17} aria-hidden="true" />
              Load More Photos
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          HAPPY BEGINNING
      ====================================================== */}
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div className="container">
          <div className="relative justify-center overflow-hidden text-center rounded-3xl bg-pink-200 sm:py-10">
            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl lg:text-4xl">
              A Happy Beginning for a{" "}
              <span className="text-pink-600">Brighter Future</span>
            </h2>

            <p className="mx-auto text-center mt-4 max-w-3xl text-sm leading-6 text-text-secondary sm:text-base">
              At Sakshi Play School, we believe every child deserves the right
              environment to learn, grow and shine. Join us in this beautiful
              journey of early learning.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
