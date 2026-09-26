import {
  BookOpen,
  Eye,
  Heart,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Target,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const aboutHighlights = [
  {
    id: 1,
    title: "Child-Centred Approach",
    description:
      "Every child is unique, and we respect their individual needs, interests and learning pace.",
    icon: Heart,
    iconClass: "text-pink-600",
    backgroundClass: "bg-pink-50",
  },
  {
    id: 2,
    title: "Play-Based Learning",
    description:
      "Fun-filled activities help make learning interesting, engaging and effective.",
    icon: Lightbulb,
    iconClass: "text-amber-600",
    backgroundClass: "bg-amber-50",
  },
  {
    id: 3,
    title: "Caring & Trained Teachers",
    description:
      "Experienced and dedicated educators guide children with care, patience and love.",
    icon: Users,
    iconClass: "text-green-600",
    backgroundClass: "bg-green-50",
  },
  {
    id: 4,
    title: "Safe & Stimulating Environment",
    description:
      "A secure, hygienic and thoughtfully designed campus encourages happy learning.",
    icon: ShieldCheck,
    iconClass: "text-brand-blue",
    backgroundClass: "bg-blue-50",
  },
];

function About() {
  return (
    <main className="overflow-hidden bg-white font-sans">
      {/* =====================================================
          ABOUT HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50">
        <div className="container">
          <div className="grid items-center lg:min-h-96 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="relative z-10 py-12 sm:py-16 lg:py-20">
              {/* Playful Heading */}
              <div className="relative mt-2 w-fit">
                <h1 className=" text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                  About <span className="text-pink-600">Us</span>
                </h1>
                <span className=" max-w-xl font-semibold leading-6 text-base text-blue-900 sm:text-lg">
                  <p className="pl-6 -rotate-2">Nurturing little minds</p>

                  <p className="pl-9 -rotate-2">for a brighter tomorrow.</p>
                </span>

                <div className="ml-12 -rotate-3  mt-2 h-1 w-24 rounded-full  sm:w-40 bg-linear-to-r from-transparent via-yellow-400 to-transparent" />
              </div>

              {/* Tagline */}

              {/* Breadcrumb */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                <Link
                  to="/"
                  className="text-brand-blue transition-colors duration-200 hover:text-brand-navy"
                >
                  Home
                </Link>

                <span className="text-text-secondary">/</span>

                <span className="text-brand-navy">About Us</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden h-full min-h-80 lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img
                  src="/images/about/about-hero.webp"
                  alt="Happy child at Sakshi Play School"
                  className="h-full w-full object-cover"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-r from-sky-50 via-sky-50/50 to-transparent"
                />
              </div>

              {/* Decorative Badge */}
              <div
                aria-hidden="true"
                className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold shadow-card"
              >
                <Sparkles
                  size={24}
                  strokeWidth={2}
                  className="text-brand-navy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ====================================================== */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Story Content */}
            <div className="lg:col-span-5">
              <div className="max-w-xl">
                <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
                  Our <span className="text-pink-600">Story</span>
                </h2>

                <div className="mt-4 h-1 w-14 rounded-full bg-brand-gold" />

                <div className="mt-5 space-y-4 text-base leading-7 text-text-secondary">
                  <p>
                    Sakshi Play School was established with a simple yet
                    powerful vision to provide a joyful, safe and nurturing
                    environment where every child can take their first steps
                    towards a brighter future.
                  </p>

                  <p>
                    We believe that the early years of a child's life lay the
                    foundation for lifelong learning, and we are committed to
                    making these years engaging, meaningful and memorable.
                  </p>

                  <p>
                    At Sakshi Play School, we combine play with learning to help
                    children explore, imagine, create and grow with confidence.
                  </p>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-gold px-6 text-sm font-bold text-brand-navy shadow-button transition-all duration-200 hover:bg-pink-600 hover:text-white hover:shadow-button-hover"
                >
                  Know More
                </Link>
              </div>
            </div>

            {/* Story Image */}
            <div className="relative lg:col-span-7">
              <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl shadow-floating">
                <img
                  src="/images/about/about-story.webp"
                  alt="Children enjoying activities at Sakshi Play School"
                  className="h-72 w-full object-cover sm:h-80 lg:h-96"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-tr from-brand-navy/10 via-transparent to-white/10"
                />
              </div>

              {/* Decorative Circle */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-2 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold shadow-card sm:-right-4 sm:h-24 sm:w-24"
              >
                <Sparkles
                  size={30}
                  strokeWidth={2}
                  className="text-brand-navy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HIGHLIGHTS
      ====================================================== */}
      <section className="bg-sky-50 py-12 sm:py-16">
        <div className="container">
          {/* Highlight Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {aboutHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating sm:p-6"
                >
                  {/* Icon */}
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${item.backgroundClass}`}
                  >
                    <Icon
                      size={25}
                      strokeWidth={2}
                      className={item.iconClass}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-extrabold leading-6 text-brand-navy">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MANAGING DIRECTOR
      ====================================================== */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Message */}
            <div className="lg:col-span-8">
              <div className="max-w-3xl">
                <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
                  Message from the{" "}
                  <span className="text-pink-600">Managing Director</span>
                </h2>

                <div className="mt-4 h-1 w-14 rounded-full bg-brand-gold" />

                <div className="mt-5 space-y-4 text-base leading-7 text-text-secondary">
                  <p>
                    At Sakshi Play School, we believe that every child is
                    precious and deserves a nurturing environment. Our aim is to
                    provide a warm, caring and stimulating environment where
                    children can learn, play, explore and grow into confident
                    and responsible individuals.
                  </p>

                  <p>
                    We are committed to giving every child the best possible
                    start in life and creating a strong foundation for a bright
                    and happy future.
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="mt-7 rounded-2xl border-l-4 border-pink-600 bg-pink-50 px-5 py-5 text-sm font-semibold italic leading-6 text-brand-navy sm:px-6 sm:text-base">
                  “Let us nurture today's little steps to form tomorrow's big
                  achievements.”
                </blockquote>
              </div>
            </div>

            {/* Director */}
            <div className="lg:col-span-4">
              <div className="mx-auto max-w-sm text-center">
                <div className="overflow-hidden rounded-3xl bg-blue-50 shadow-floating">
                  <img
                    src="/images/about/managing-director.webp"
                    alt="Managing Director of Sakshi Play School"
                    className="h-72 w-full object-cover sm:h-80"
                  />
                </div>

                <h3 className="mt-5 text-2xl font-extrabold text-brand-blue">
                  Mr. S. K. Shambhu
                </h3>

                <p className="mt-1 text-sm font-bold text-brand-navy">
                  Managing Director
                </p>

                <p className="mt-1 text-sm text-text-secondary">
                  M.Sc. (Chemistry), LL.B.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION & MISSION
      ====================================================== */}
      <section className="bg-sky-50 py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Vision */}
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                  <Eye size={25} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
                    Our Vision
                  </h2>

                  <div className="mt-2 h-1 w-10 rounded-full bg-brand-gold" />

                  <p className="mt-4 text-sm leading-6 text-text-secondary sm:text-base">
                    To be a trusted early learning centre where children grow
                    into confident, kind and responsible individuals.
                  </p>
                </div>
              </div>
            </article>

            {/* Mission */}
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Target size={25} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
                    Our Mission
                  </h2>

                  <div className="mt-2 h-1 w-10 rounded-full bg-brand-gold" />

                  <p className="mt-4 text-sm leading-6 text-text-secondary sm:text-base">
                    To provide a joyful, inclusive and stimulating environment
                    that encourages curiosity, creativity and character building
                    in every child.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container">
          <div className="rounded-3xl bg-brand-navy px-6 py-10 text-center sm:px-10 lg:px-16 lg:py-12">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-gold">
              Discover Sakshi
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              A Place Where Children{" "}
              <span className="text-pink-400">Learn & Grow</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
              Explore our school, learn more about our facilities and get in
              touch with our team.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/facilities"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-pink-700"
              >
                Explore Facilities
              </Link>

              <Link
                to="/admission"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-bold text-brand-navy transition-colors duration-200 hover:bg-brand-gold"
              >
                Admission
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/40 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-brand-navy"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
