import { useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  UsersRound,
} from "lucide-react";

import { Link } from "react-router-dom";

const contactInfo = [
  {
    id: 1,
    title: "Call Us",
    lines: ["06475-222072", "9431247423"],
    icon: Phone,
    iconClass: "bg-pink-600 text-white",
  },
  {
    id: 2,
    title: "Email Us",
    lines: ["sakshiplayschool@gmail.com"],
    icon: Mail,
    iconClass: "bg-brand-blue text-white",
  },
  {
    id: 3,
    title: "Visit Us",
    lines: [
      "Simri, Bakhtiyarpur",
      "Near Shambhu Industries",
      "Madhuwan, Saharsa - 852127",
    ],
    icon: MapPin,
    iconClass: "bg-brand-gold text-brand-navy",
  },
  {
    id: 4,
    title: "Working Hours",
    lines: ["Monday - Saturday", "9:00 AM - 2:00 PM", "Sunday: Closed"],
    icon: Clock3,
    iconClass: "bg-green-600 text-white",
  },
];

const quickActions = [
  {
    id: 1,
    title: "Enquire",
    subtitle: "About Admissions",
    icon: UsersRound,
    iconClass: "bg-pink-600 text-white",
    href: "/admission",
    type: "link",
  },
  {
    id: 2,
    title: "Schedule",
    subtitle: "a School Visit",
    icon: CalendarDays,
    iconClass: "bg-brand-gold text-brand-navy",
    href: "tel:+916475222072",
    type: "phone",
  },
  {
    id: 3,
    title: "Get Answers",
    subtitle: "to Your Queries",
    icon: MessageCircle,
    iconClass: "bg-green-600 text-white",
    href: "#contact-form",
    type: "anchor",
  },
  {
    id: 4,
    title: "More Information",
    subtitle: "About Our Programs",
    icon: FileText,
    iconClass: "bg-amber-500 text-white",
    href: "/admission",
    type: "link",
  },
];

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const nextValue =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((currentData) => ({
      ...currentData,
      [name]: nextValue,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!name) {
      nextErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      nextErrors.name = "Name must contain at least 2 characters.";
    } else if (name.length > 60) {
      nextErrors.name = "Name must not exceed 60 characters.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(phone)) {
      nextErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (!subject) {
      nextErrors.subject = "Please enter a subject.";
    } else if (subject.length > 100) {
      nextErrors.subject = "Subject must not exceed 100 characters.";
    }

    if (!message) {
      nextErrors.message = "Please enter your message.";
    } else if (message.length < 10) {
      nextErrors.message = "Message must contain at least 10 characters.";
    } else if (message.length > 1000) {
      nextErrors.message = "Message must not exceed 1000 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const recipientEmail = "sakshiplayschool@gmail.com";

    const subject = encodeURIComponent(formData.subject.trim());

    const body = encodeURIComponent(
      [
        `Name: ${formData.name.trim()}`,
        `Email: ${formData.email.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        "",
        "Message:",
        formData.message.trim(),
      ].join("\n"),
    );

    const mailtoUrl =
      `mailto:${recipientEmail}` + `?subject=${subject}` + `&body=${body}`;

    window.location.href = mailtoUrl;

    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="overflow-hidden bg-white font-sans">
      {/* =====================================================
          CONTACT HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50">
        <div className="container">
          <div className="grid items-center lg:min-h-96 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="relative z-10 py-12 sm:py-16 lg:py-20">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-blue sm:text-base">
                Get In Touch
              </p>

              <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Contact <span className="text-pink-600">Us</span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                We'd love to hear from you and help you with any questions about
                Sakshi Play School.
              </p>

              {/* Breadcrumb */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                <Link
                  to="/"
                  className="text-brand-blue transition-colors duration-200 hover:text-brand-navy"
                >
                  Home
                </Link>

                <span className="text-text-secondary">/</span>

                <span className="text-brand-navy">Contact Us</span>
              </div>

              {/* Hero CTA */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="tel:+916475222072"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover"
                >
                  <Phone size={18} aria-hidden="true" />
                  Call Us
                </a>

                <a
                  href="#contact-form"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-navy bg-white px-6 text-sm font-bold text-brand-navy transition-colors duration-200 hover:bg-brand-navy hover:text-white"
                >
                  Send Message
                  <Send size={17} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden h-full min-h-80 lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img
                  src="/images/contact/contact-hero.webp"
                  alt="Happy child at Sakshi Play School"
                  className="h-full w-full object-cover"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-r from-sky-50 via-sky-50/60 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFO
      ====================================================== */}
      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                    >
                      <Icon size={21} strokeWidth={2.2} aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <h2 className="text-base font-extrabold text-brand-navy sm:text-lg">
                        {item.title}
                      </h2>

                      <div className="mt-2 space-y-1">
                        {item.id === 1 ? (
                          <>
                            <a
                              href="tel:+916475222072"
                              className="block text-sm leading-5 text-text-secondary transition-colors duration-200 hover:text-pink-600"
                            >
                              06475-222072
                            </a>

                            <a
                              href="tel:+919431247423"
                              className="block text-sm leading-5 text-text-secondary transition-colors duration-200 hover:text-pink-600"
                            >
                              9431247423
                            </a>
                          </>
                        ) : item.id === 2 ? (
                          <a
                            href="mailto:sakshiplayschool@gmail.com"
                            className="block wrap-break text-sm leading-5 text-text-secondary transition-colors duration-200 hover:text-brand-blue"
                          >
                            sakshiplayschool@gmail.com
                          </a>
                        ) : item.id === 3 ? (
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127"
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm leading-5 text-text-secondary transition-colors duration-200 hover:text-brand-blue"
                          >
                            {item.lines.map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                          </a>
                        ) : (
                          item.lines.map((line) => (
                            <p
                              key={line}
                              className="text-sm leading-5 text-text-secondary"
                            >
                              {line}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MESSAGE + MAP
      ====================================================== */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Message Form */}
            <div
              id="contact-form"
              className="scroll-mt-24 rounded-3xl border border-gray-100 bg-white p-5 shadow-card sm:p-6 lg:col-span-6 lg:p-7"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-brand-blue sm:text-base">
                Have a Question?
              </p>

              <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy">
                Send Us a <span className="text-pink-600">Message</span>
              </h2>

              <div className="mt-4 h-1 w-14 rounded-full bg-brand-gold" />

              <p className="mt-4 text-sm leading-6 text-text-secondary sm:text-base">
                Have a question, query or would like to know more about our
                programmes? Fill out the form below and we'll get back to you as
                soon as possible.
              </p>

              <form className="mt-6" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-semibold text-text-primary"
                    >
                      Your Name
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      autoComplete="name"
                      maxLength={60}
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                        errors.name ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-error">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-semibold text-text-primary"
                    >
                      Email Address
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      autoComplete="email"
                      maxLength={120}
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                        errors.email ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-error">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-semibold text-text-primary"
                    >
                      Phone Number
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10 digit phone number"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                        errors.phone ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-xs text-error">{errors.phone}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-sm font-semibold text-text-primary"
                    >
                      Subject
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      maxLength={100}
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                        errors.subject ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.subject && (
                      <p className="mt-1 text-xs text-error">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-text-primary"
                  >
                    Your Message
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    maxLength={1000}
                    placeholder="Your Message"
                    className={`w-full resize-none rounded-lg border bg-white px-3 py-3 text-sm text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                      errors.message ? "border-error" : "border-gray-300"
                    }`}
                  />

                  <div className="mt-1 flex items-center justify-between gap-3">
                    <div>
                      {errors.message && (
                        <p className="text-xs text-error">{errors.message}</p>
                      )}
                    </div>

                    <p className="text-xs text-text-secondary">
                      {formData.message.length}/1000
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-6 text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-brand-blue hover:shadow-button-hover disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                >
                  <Send size={17} strokeWidth={2.2} aria-hidden="true" />

                  {isSubmitting ? "Opening Email..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right Content */}
            <div className="grid gap-6 lg:col-span-6">
              

              {/* Our School */}
              <div className="grid items-center gap-5 rounded-3xl bg-sky-50 p-5 sm:grid-cols-2 sm:p-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">
                    Visit Us
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-brand-navy sm:text-3xl">
                    Our <span className="text-pink-600">School</span>
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    Come and visit us to experience our vibrant and caring
                    learning environment. We'd love to welcome you to Sakshi
                    Play School.
                  </p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-navy px-5 text-xs font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
                  >
                    Get Directions
                  </a>
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/images/contact/school.webp"
                    alt="Sakshi Play School campus"
                    className="h-48 w-full object-cover sm:h-44"
                  />
                </div>
              </div>

              {/* Map */}
              <div
                id="school-map"
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card"
              >
                <div className="aspect-video w-full">
                  <iframe
                    title="Sakshi Play School location"
                    src="https://www.google.com/maps?q=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <p className="text-sm font-bold text-brand-navy">
                      Find Our School
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      Simri, Bakhtiyarpur, Madhuwan, Saharsa
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue px-4 text-xs font-bold text-white transition-colors duration-200 hover:bg-brand-navy"
                  >
                    Open Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50 py-10 sm:py-12">
        <div className="container">
          <div className="mx-auto mb-7 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">
              Need Help?
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              We're Here to <span className="text-pink-600">Help</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((item) => {
              const Icon = item.icon;

              const content = (
                <>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                  >
                    <Icon size={21} strokeWidth={2.2} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-extrabold leading-5 text-brand-navy sm:text-base">
                      {item.title}
                    </h2>

                    <p className="text-xs leading-5 text-text-secondary">
                      {item.subtitle}
                    </p>
                  </div>
                </>
              );

              if (item.type === "link") {
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="group flex min-h-20 items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="group flex min-h-20 items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Contact CTA */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container">
          <div className="rounded-3xl bg-brand-navy px-6 py-10 text-center sm:px-10 lg:px-16 lg:py-12">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-gold">
              Let's Connect
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Have More <span className="text-pink-400">Questions?</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
              Our team is ready to help you with admissions, school visits and
              any other queries.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+916475222072"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-pink-700"
              >
                <Phone size={18} aria-hidden="true" />
                Call Us
              </a>

              <a
                href="mailto:sakshiplayschool@gmail.com"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-brand-navy transition-colors duration-200 hover:bg-brand-gold"
              >
                <Mail size={18} aria-hidden="true" />
                Email Us
              </a>

              <Link
                to="/admission"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-brand-navy"
              >
                Admission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Small information strip */}
      <section className="border-t border-gray-100 bg-white py-5">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
              <CheckCircle2
                size={18}
                className="text-green-600"
                aria-hidden="true"
              />
              Monday - Saturday
            </div>

            <span className="hidden text-gray-300 sm:block">|</span>

            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Clock3 size={18} aria-hidden="true" />
              9:00 AM - 2:00 PM
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
