import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  UsersRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import EventsNoticeSection from "../../sections/events/EventsNoticeSection";

const whyChooseData = [
  {
    id: 1,
    title: "Child-Centred Approach",
    description:
      "Every child is unique and we nurture their individual potential.",
    icon: Heart,
    iconClass: "bg-pink-600 text-white",
  },
  {
    id: 2,
    title: "Play-Based Learning",
    description: "Fun activities that make learning joyful and effective.",
    icon: Sparkles,
    iconClass: "bg-amber-500 text-white",
  },
  {
    id: 3,
    title: "Caring & Experienced Teachers",
    description: "A loving and supportive team for your child's growth.",
    icon: UsersRound,
    iconClass: "bg-green-600 text-white",
  },
  {
    id: 4,
    title: "Safe & Secure Environment",
    description: "A clean, hygienic and family-friendly campus.",
    icon: ShieldCheck,
    iconClass: "bg-blue-600 text-white",
  },
  {
    id: 5,
    title: "Holistic Development",
    description: "Focus on social, emotional, physical and cognitive growth.",
    icon: Star,
    iconClass: "bg-pink-500 text-white",
  },
];

const admissionSteps = [
  {
    id: 1,
    number: "01",
    title: "Fill the Form",
    description: "Submit the admission form online or at the school office.",
    icon: ClipboardList,
    iconClass: "bg-pink-600 text-white",
  },
  {
    id: 2,
    number: "02",
    title: "Interaction / Visit",
    description: "Meet our team and take a campus tour.",
    icon: UsersRound,
    iconClass: "bg-brand-gold text-brand-navy",
  },
  {
    id: 3,
    number: "03",
    title: "Submission of Documents",
    description: "Submit the required documents for admission.",
    icon: FileText,
    iconClass: "bg-green-600 text-white",
  },
  {
    id: 4,
    number: "04",
    title: "Confirmation",
    description: "Receive confirmation and complete the formalities.",
    icon: CheckCircle2,
    iconClass: "bg-brand-blue text-white",
  },
];

function Admission() {
  return (
    <main className="overflow-hidden bg-white font-sans">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50">
        <img
          src="/images/admission/admission-hero.webp"
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
                <span className="inline-block">Admission</span>

                <span className="inline-block text-pink-600">s</span>
              </h1>

              <h2 className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-serif font-black leading-tight tracking-tight text-2xl text-brand-navy sm:text-[1.375rem] md:text-3xl lg:text-4xl">
                <span>Open for</span>
                <span className="text-pink-600">2026-27</span>
              </h2>

              {/* Subtitle */}
              <p className="mt-4 max-w-xl font-sans leading-7 tracking-normal text-sm text-text-secondary md:text-[0.9375rem] lg:text-base">
                Give your child the best start for a brighter tomorrow.
              </p>
              <div className="mt-6 flex flex-wrap justify-start gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-600 py-2 px-3 font-sans leading-5 tracking-normal text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  Get in Touch
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>

                <a
                  href="tel:+916475222072"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-navy bg-white py-2 px-3 font-sans leading-5 tracking-normal text-sm font-bold text-brand-navy transition-colors duration-200 hover:bg-brand-navy hover:text-white sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  <Phone size={17} aria-hidden="true" />
                  Call Us
                </a>
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
          WHY CHOOSE SAKSHI
      ====================================================== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Why Choose <span className="text-pink-600">Sakshi</span>{" "}
              <span className="text-brand-gold">Play</span>{" "}
              <span className="text-green-600">School</span> ?
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-text-secondary sm:text-base">
              A safe, modern and nurturing environment where children learn
              through play, discover their abilities and grow with confidence.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseData.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${item.iconClass}`}
                  >
                    <Icon size={23} strokeWidth={2} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-base font-extrabold leading-5 text-brand-navy">
                    {item.title}
                  </h3>

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
          ADMISSION PROCESS
      ====================================================== */}
      <section className="bg-sky-50 py-10 sm:py-14 lg:py-16">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Process */}
            <div className="lg:col-span-8">
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                Admission <span className="text-pink-600">Process</span>
              </h2>

              <div className="mt-1 h-1 w-14 rounded-full bg-brand-gold" />

              <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                A simple and transparent process to make admission easy for you.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {admissionSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <article
                      key={step.id}
                      className="relative rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-card"
                    >
                      {/* Step Number */}
                      <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold text-[10px] font-extrabold text-brand-navy">
                        {step.number}
                      </span>

                      {/* Icon */}
                      <div
                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${step.iconClass}`}
                      >
                        <Icon size={22} strokeWidth={2} aria-hidden="true" />
                      </div>

                      <h3 className="mt-4 text-base font-extrabold leading-5 text-brand-navy">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-5 text-text-secondary">
                        {step.description}
                      </p>

                      {/* Desktop Connector */}
                      {step.id !== admissionSteps.length && (
                        <ArrowRight
                          size={16}
                          className="absolute -right-4 top-8 z-10 hidden text-brand-blue xl:block"
                          aria-hidden="true"
                        />
                      )}
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Image */}
            <div className="relative lg:col-span-4">
              <div className="overflow-hidden rounded-3xl bg-white shadow-floating">
                <img
                  src="/images/admission/admission-process.webp"
                  alt="Child enjoying activities at Sakshi Play School"
                  loading="lazy"
                  decoding="async"
                  className="h-72 w-full object-cover sm:h-80 lg:h-96"
                />
              </div>

              <div className="absolute -bottom-4 -left-2 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold shadow-card sm:-left-4 sm:h-24 sm:w-24">
                <GraduationCap
                  size={34}
                  className="text-brand-navy"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVENTS + NOTICE
      ====================================================== */}
      <section id="events-notices" className="scroll-mt-6">
        <EventsNoticeSection showAll />
      </section>

      {/* =====================================================
          APPLY + HELP
      ====================================================== */}
      <section className="bg-sky-50 py-10 sm:py-14">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Apply Card */}
            <article className="relative overflow-hidden rounded-3xl bg-yellow-100 px-6 py-8 sm:px-8 sm:py-10">
              <div className="flex items-center gap-6">
                {/* Megaphone */}
                <span className="hidden sm:flex h-60 w-50 shrink-0 items-center justify-center">
                  <Megaphone
                    size={150}
                    strokeWidth={1}
                    className="-rotate-23 text-pink-600"
                    aria-hidden="true"
                  />
                </span>

                {/* All Text + Button */}
                <div className="relative z-10">
                  <h2 className="text-3xl font-extrabold leading-tight text-brand-navy sm:text-3xl">
                    Admissions Open for{" "}
                    <span className="sm:hidden text-pink-600">2026-27</span>
                  </h2>

                  <h1 className="hidden sm:inline-block text-3xl font-extrabold leading-tight text-pink-600 sm:text-4xl">
                    2026-27
                  </h1>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-brand-navy/80 sm:text-base">
                    Seats are limited! Enrol now and give your child a joyful
                    early learning experience.
                  </p>

                  <Link
                    to="/contact"
                    className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-pink-600 px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-pink-700"
                  >
                    Apply for Admission
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Help Card */}
            <article className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <HeartHandshake size={24} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="mt-1 text-2xl font-extrabold text-brand-navy sm:text-3xl">
                    We're Here to <span className="text-pink-600">Help</span>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Feel free to contact us for any admission-related queries.
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="mt-6 space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone
                    size={20}
                    className="mt-0.5 shrink-0 text-brand-blue"
                    aria-hidden="true"
                  />

                  <div className="flex flex-wrap items-center gap-1">
                    <a
                      href="tel:+916475222072"
                      className="text-sm font-bold text-brand-navy transition-colors duration-200 hover:text-pink-600"
                    >
                      06475-222072
                    </a>

                    <span className="text-sm font-medium text-text-secondary">
                      /
                    </span>

                    <a
                      href="tel:+919431247423"
                      className="text-sm font-bold text-brand-navy transition-colors duration-200 hover:text-pink-600"
                    >
                      9431247423
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail
                    size={20}
                    className="shrink-0 text-brand-blue"
                    aria-hidden="true"
                  />

                  <a
                    href="mailto:sakshiplayschool@gmail.com"
                    className="break-all text-sm font-bold text-brand-navy transition-colors duration-200 hover:text-brand-blue"
                  >
                    sakshiplayschool@gmail.com
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="mt-0.5 shrink-0 text-pink-600"
                    aria-hidden="true"
                  />

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm leading-6 text-text-secondary transition-colors duration-200 hover:text-brand-blue"
                  >
                    Simri, Bakhtiyarpur,
                    <br />
                    Near Shambhu Industries,
                    <br />
                    Madhuwan, Saharsa - 852127
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          HAPPY BEGINNING
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-14">
        <div className="container">
          <div className="overflow-hidden rounded-3xl bg-sky-50 px-6 py-10 text-center sm:px-10 lg:px-16 lg:py-12">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl lg:text-4xl">
              A Happy Beginning for a{" "}
              <span className="text-pink-600">Brighter Future</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
              At Sakshi Play School, we believe every child deserves the right
              environment to learn, grow and shine. Join us in this beautiful
              journey of early learning.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover"
              >
                Get in Touch
                <ArrowRight size={17} aria-hidden="true" />
              </Link>

              <a
                href="tel:+916475222072"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-navy bg-white px-6 text-sm font-bold text-brand-navy transition-colors duration-200 hover:bg-brand-navy hover:text-white"
              >
                <Phone size={17} aria-hidden="true" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Admission;
