import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  Target,
  UserCheck,
  UsersRound,
} from "lucide-react";

import { Link } from "react-router-dom";

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
    iconClass: "bg-amber-500 text-white",
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
    iconClass: "bg-blue-600 text-white",
  },
];

const requiredDocuments = [
  "Completed Application Form",
  "Child's Birth Certificate (Photocopy)",
  "Recent Passport Size Photographs (Child & Parents)",
  "Aadhar Card Copy (Child & Parents)",
  "Previous School Report Card (if applicable)",
  "Address Proof (Photocopy)",
];

const importantDates = [
  {
    title: "Admissions Open",
    date: "1st November 2025",
  },
  {
    title: "Last Date to Apply",
    date: "31st March 2026",
  },
  {
    title: "Interaction / Campus Visit",
    date: "Throughout the Admission Period",
  },
  {
    title: "Announcement of Selected Candidates",
    date: "Within 7 days of Interaction",
  },
  {
    title: "Session Starts",
    date: "April 2026",
  },
];

function Admission() {
  return (
    <main className="overflow-hidden bg-white font-sans">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50">
        {/* Decorative Shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 top-10 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-20 top-4 h-20 w-20 rounded-full bg-pink-200/40 blur-2xl"
        />

        <div className="container">
          <div className="grid items-center lg:min-h-96 lg:grid-cols-12">
            {/* Hero Content */}
            <div className="relative z-10 py-10 sm:py-14 lg:col-span-7 lg:py-16">
              {/* Main Heading */}
              <div className="relative mt-2 w-fit">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                  <span className="">Admission</span>
                  <span className=" text-pink-600">s</span>
                </h1>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
                    Open for
                  </span>

                  <span className="text-3xl font-extrabold text-pink-600 sm:text-4xl">
                    2026-27
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-text-secondary sm:text-lg">
                Give your child the best start for a brighter tomorrow.
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

                <span className="text-brand-navy">Admission</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden min-h-80 lg:col-span-5 lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img
                  src="/images/admission/admission-hero.webp"
                  alt="Child at Sakshi Play School"
                  className="h-full w-full object-cover"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-r from-sky-50 via-sky-50/20 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE SAKSHI
      ====================================================== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="container">
          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
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
                  className="group rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  {/* Icon */}
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full shadow-card ${item.iconClass}`}
                  >
                    <Icon size={23} strokeWidth={2} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-base font-extrabold leading-5 text-brand-navy">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-text-secondary sm:text-sm">
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
            {/* Process Content */}
            <div className="lg:col-span-8 ">
              <h2 className=" text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                Admission <span className="text-pink-600">Process</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                A simple and transparent process to make admission easy for you.
              </p>
              <div className="mt-2 h-1 w-14 rounded-full bg-brand-gold" />

              {/* Steps */}
              <div className="relative mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {admissionSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <article
                      key={step.id}
                      className="relative rounded-2xl bg-white p-4 text-center shadow-card"
                    >
                      {/* Number */}
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

                      <p className="mt-2 text-xs leading-5 text-text-secondary">
                        {step.description}
                      </p>

                      {/* Connector */}
                      {step.id !== admissionSteps.length && (
                        <ArrowRight
                          size={18}
                          className="absolute -right-4 top-8 z-10 hidden text-brand-blue xl:block"
                          aria-hidden="true"
                        />
                      )}
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Process Image */}
            <div className="relative lg:col-span-4">
              <div className="overflow-hidden rounded-3xl bg-white shadow-floating">
                <img
                  src="/images/admission/admission-process.webp"
                  alt="Child enjoying activities at Sakshi Play School"
                  className="h-62 w-full object-cover sm:h-70 lg:h-80"
                />
              </div>

              <div className="absolute -bottom-2 -left-2 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold shadow-card sm:-left-2 sm:h-20 sm:w-20">
                <GraduationCap
                  size={35}
                  className="text-brand-navy"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DOCUMENTS + IMPORTANT DATES
      ====================================================== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Required Documents */}
            <article className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-card sm:p-7">
              {/* Decorative Icon */}
              <div className="absolute right-4 top-4 text-brand-gold">
                <Sparkles size={25} aria-hidden="true" />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <FileText size={22} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">
                    Required <span className="text-pink-600">Documents</span>
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-text-secondary">
                Please keep the following documents ready at the time of
                admission.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {requiredDocuments.map((document) => (
                  <div key={document} className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-pink-600"
                      aria-hidden="true"
                    />

                    <p className="text-sm leading-5 text-brand-navy">
                      {document}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Important Dates */}
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold/20 text-amber-600">
                  <CalendarDays size={22} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">
                    Important <span className="text-pink-600">Dates</span>
                  </h2>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100">
                {importantDates.map((item, index) => (
                  <div
                    key={item.title}
                    className={`grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-2 sm:gap-4 ${
                      index % 2 === 0 ? "bg-sky-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <ArrowRight
                        size={14}
                        className="mt-1 shrink-0 text-brand-gold"
                        aria-hidden="true"
                      />

                      <p className="text-sm font-semibold text-brand-navy">
                        {item.title}
                      </p>
                    </div>

                    <p className="text-sm text-text-secondary sm:border-l sm:border-gray-200 sm:pl-4">
                      {item.date}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
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
                {/* Send Icon - Left Side */}
                <span className="flex h-60 w-50 items-center justify-center">
                  <Megaphone
                    size={150}
                    strokeWidth={1}
                    className="-rotate-23"
                    aria-hidden="true"
                  />
                </span>

                {/* All Text + Button - Right Side */}
                <div className="relative z-10">
                  <h2 className="text-3xl font-extrabold leading-tight text-brand-navy sm:text-3xl">
                    Admissions Open for
                  </h2>

                  <h1 className="text-3xl font-extrabold leading-tight text-pink-600 sm:text-4xl">
                    2026-27
                  </h1>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-brand-navy/80 sm:text-base">
                    Seats are limited! Enrol now and give your child a joyful
                    early learning experience.
                  </p>

                  <Link
                    to="/contact"
                    className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-pink-600 px-4 text-sm font-bold text-white duration-200 hover:bg-pink-700"
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-600">
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
                <div className="flex items-start gap-3">
                  <Phone
                    size={20}
                    className="mt-0.6 shrink-0 text-brand-blue"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-1 whitespace-nowrap">
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
