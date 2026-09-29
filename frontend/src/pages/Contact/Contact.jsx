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
        <img
          src="/images/contact/contact-hero.webp"
          alt="Happy children learning at Sakshi Play School"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Left White Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-white/65 to-transparent md:via-white/45"
        />

        {/* Bottom White Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white via-white/10 to-transparent md:h-20"
        />

        {/* Top White Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-white/70 to-transparent"
        />

        <div className="container">
          <div className="grid min-h-72 items-center sm:min-h-80 lg:min-h-120 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="relative z-10 max-w-xl py-12 text-start md:py-16 lg:py-20">
              <h1 className="font-serif font-black uppercase leading-tight tracking-tight text-4xl text-brand-navy sm:text-5xl md:text-6xl lg:text-7xl">
                Contact <span className="text-pink-600">Us</span>
              </h1>

              <p className="mt-4 max-w-xl font-sans text-sm font-medium leading-6 tracking-normal text-blue-950 md:text-[0.9375rem] lg:text-base">
                We'd love to hear from you
              </p>

              {/* Hero CTA */}
              <div className="mt-7 flex flex-wrap justify-start gap-3">
                <a
                  href="tel:+916475222072"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-600 py-2 px-3 font-sans text-sm font-semibold leading-5 tracking-normal text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call Us
                </a>

                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-navy bg-white py-2 px-3 font-sans text-sm font-semibold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-brand-navy hover:text-white sm:py-3 sm:px-5 md:text-[0.9375rem] lg:text-base"
                >
                  Send Message
                  <Send size={15} aria-hidden="true" />
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
          CONTACT INFO
      ====================================================== */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-card transition-transform duration-200 hover:-translate-y-1 sm:p-5"
                >
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                    >
                      <Icon size={21} strokeWidth={2.2} aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <h3 className="font-serif font-black leading-snug tracking-tight text-lg text-brand-navy sm:text-xl md:text-[1.25rem] lg:text-2xl">
                        {item.title}
                      </h3>

                      <div className="mt-3 space-y-1">
                        {item.id === 1 ? (
                          <>
                            <a
                              href="tel:+916475222072"
                              className="block font-sans text-sm leading-6 tracking-normal text-text-secondary transition-colors duration-200 hover:text-pink-600 md:text-[0.9375rem] lg:text-base"
                            >
                              06475-222072
                            </a>

                            <a
                              href="tel:+919431247423"
                              className="block font-sans text-sm leading-6 tracking-normal text-text-secondary transition-colors duration-200 hover:text-pink-600 md:text-[0.9375rem] lg:text-base"
                            >
                              9431247423
                            </a>
                          </>
                        ) : item.id === 2 ? (
                          <a
                            href="mailto:sakshiplayschool@gmail.com"
                            className="block wrap-break-word font-sans text-sm leading-6 tracking-normal text-text-secondary transition-colors duration-200 hover:text-brand-blue md:text-[0.9375rem] lg:text-base"
                          >
                            sakshiplayschool@gmail.com
                          </a>
                        ) : item.id === 3 ? (
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127"
                            target="_blank"
                            rel="noreferrer"
                            className="block font-sans text-sm leading-6 tracking-normal text-text-secondary transition-colors duration-200 hover:text-brand-blue md:text-[0.9375rem] lg:text-base"
                          >
                            {item.lines.map((line) => (
                              <span
                                key={line}
                                className="block font-sans text-sm leading-6 tracking-normal md:text-[0.9375rem] lg:text-base"
                              >
                                {line}
                              </span>
                            ))}
                          </a>
                        ) : (
                          item.lines.map((line) => (
                            <p
                              key={line}
                              className="font-sans text-sm leading-6 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base"
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
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Message Form */}
            <div
              id="contact-form"
              className="min-w-0 scroll-mt-24 rounded-3xl border border-gray-100 bg-white p-5 shadow-card sm:p-6 lg:col-span-6 lg:p-7"
            >
              <h2 className="mt-2 font-serif font-black leading-tight tracking-tight text-2xl text-brand-navy sm:text-[1.375rem] md:text-3xl lg:text-4xl">
                Send Us a <span className="text-pink-600">Message</span>
              </h2>
           
              <p className="mt-4 max-w-2xl font-sans text-sm leading-7 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base">
                Have a question, query or would like to know more about our
                programmes? Fill out the form below and we'll get back to you as
                soon as possible.
              </p>
              <form className="mt-6 min-w-0" onSubmit={handleSubmit} noValidate>
                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block font-sans text-xs font-semibold leading-5 tracking-normal text-text-primary md:text-[0.8125rem] lg:text-sm"
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
                      className={`h-11 w-full rounded-lg border bg-white px-3 font-sans text-sm leading-6 tracking-normal text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 md:text-[0.9375rem] lg:text-base ${
                        errors.name ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.name && (
                      <p className="mt-1 block font-sans text-xs leading-5 tracking-normal text-error md:text-[0.8125rem] lg:text-sm">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-sans text-xs font-semibold leading-5 tracking-normal text-text-primary md:text-[0.8125rem] lg:text-sm"
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
                      className={`h-11 w-full rounded-lg border bg-white px-3 font-sans text-sm leading-6 tracking-normal text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 md:text-[0.9375rem] lg:text-base ${
                        errors.email ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-1 block font-sans text-xs leading-5 tracking-normal text-error md:text-[0.8125rem] lg:text-sm">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block font-sans text-xs font-semibold leading-5 tracking-normal text-text-primary md:text-[0.8125rem] lg:text-sm"
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
                      className={`h-11 w-full rounded-lg border bg-white px-3 font-sans text-sm leading-6 tracking-normal text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 md:text-[0.9375rem] lg:text-base ${
                        errors.phone ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-1 block font-sans text-xs leading-5 tracking-normal text-error md:text-[0.8125rem] lg:text-sm">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block font-sans text-xs font-semibold leading-5 tracking-normal text-text-primary md:text-[0.8125rem] lg:text-sm"
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
                      className={`h-11 w-full rounded-lg border bg-white px-3 font-sans text-sm leading-6 tracking-normal text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 md:text-[0.9375rem] lg:text-base ${
                        errors.subject ? "border-error" : "border-gray-300"
                      }`}
                    />

                    {errors.subject && (
                      <p className="mt-1 block font-sans text-xs leading-5 tracking-normal text-error md:text-[0.8125rem] lg:text-sm">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-sans text-xs font-semibold leading-5 tracking-normal text-text-primary md:text-[0.8125rem] lg:text-sm"
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
                    className={`min-h-40 w-full resize-none rounded-lg border bg-white px-3 py-3 font-sans text-sm leading-6 tracking-normal text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 md:text-[0.9375rem] lg:text-base ${
                      errors.message ? "border-error" : "border-gray-300"
                    }`}
                  />

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div>
                      {errors.message && (
                        <p className="font-sans text-xs leading-5 tracking-normal text-error md:text-[0.8125rem] lg:text-sm">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <p className="font-sans text-xs leading-5 tracking-normal text-text-secondary md:text-[0.8125rem] lg:text-sm">
                      {formData.message.length}/1000
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-3 py-2 font-sans text-sm font-bold leading-5 tracking-normal text-white shadow-button transition-all duration-200 hover:bg-brand-blue hover:shadow-button-hover disabled:pointer-events-none disabled:opacity-60 sm:w-auto sm:px-5 sm:py-3 md:text-[0.9375rem] lg:text-base"
                >
                  <Send size={17} strokeWidth={2.2} aria-hidden="true" />

                  {isSubmitting ? "Opening Email..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right Content */}
            <div className="grid min-w-0 gap-6 lg:col-span-6">
              {/* Our School */}
              <div className="grid min-w-0 items-center gap-6 rounded-3xl bg-sky-50 p-5 sm:grid-cols-2 sm:p-6">
                <div>
                  <h2 className="mt-2 font-serif font-black leading-tight tracking-tight text-2xl text-brand-navy sm:text-[1.375rem] md:text-3xl lg:text-4xl">
                    Our <span className="text-pink-600">School</span>
                  </h2>

                  <p className="mt-4 max-w-xl font-sans text-sm leading-7 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base">
                    Come and visit us to experience our vibrant and caring
                    learning environment. We'd love to welcome you to Sakshi
                    Play School.
                  </p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-navy px-3 py-2 font-sans text-sm font-bold leading-5 tracking-normal text-white transition-colors duration-200 hover:bg-brand-blue sm:px-5 sm:py-3 md:text-[0.9375rem] lg:text-base"
                  >
                    Get Directions
                  </a>
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/images/contact/school.webp"
                    alt="Sakshi Play School campus"
                    className="h-52 w-full object-cover sm:h-56 lg:h-64"
                  />
                </div>
              </div>

              {/* Map */}
              <div
                id="school-map"
                className="min-w-0 scroll-mt-24 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card"
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

                <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
                  <div>
                    <h3 className="font-serif font-black leading-snug tracking-tight text-lg text-brand-navy sm:text-xl md:text-[1.25rem] lg:text-2xl">
                      Find Our School
                    </h3>

                    <p className="mt-1 max-w-xl font-sans text-xs leading-5 tracking-normal text-text-secondary md:text-[0.8125rem] lg:text-sm">
                      Simri, Bakhtiyarpur, Madhuwan, Saharsa
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Simri%20Bakhtiyarpur%2C%20Madhuwan%2C%20Saharsa%2C%20Bihar%20852127"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-blue px-3 py-2 font-sans text-sm font-bold leading-5 tracking-normal text-white transition-colors duration-200 hover:bg-brand-navy sm:px-5 sm:py-3 md:text-[0.9375rem] lg:text-base"
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
      <section className="relative overflow-hidden bg-sky-50 py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="font-sans text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue md:text-[0.8125rem] lg:text-sm">
              Need Help?
            </p>

            <h2 className="mt-2 font-serif font-black leading-tight tracking-tight text-2xl text-brand-navy sm:text-[1.375rem] md:text-3xl lg:text-4xl">
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
                    <h3 className="font-serif font-black leading-snug tracking-tight text-lg text-brand-navy sm:text-xl md:text-[1.25rem] lg:text-2xl">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs leading-5 tracking-normal text-text-secondary md:text-[0.8125rem] lg:text-sm">
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
                    className="group flex min-h-20 min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating sm:px-5"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="group flex min-h-20 min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating sm:px-5"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Contact CTA */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="rounded-3xl bg-brand-navy px-6 py-10 text-center sm:px-10 lg:px-16 lg:py-12">
            <p className="font-sans text-xs font-bold uppercase leading-5 tracking-wide text-brand-gold md:text-[0.8125rem] lg:text-sm">
              Let's Connect
            </p>

            <h2 className="mt-2 font-serif font-black leading-tight tracking-tight text-2xl text-white sm:text-[1.375rem] md:text-3xl lg:text-4xl">
              Have More <span className="text-pink-400">Questions?</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-7 tracking-normal text-white/80 md:text-[0.9375rem] lg:text-base">
              Our team is ready to help you with admissions, school visits and
              any other queries.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+916475222072"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-3 py-2 font-sans text-sm font-bold leading-5 tracking-normal text-white transition-colors duration-200 hover:bg-pink-700 sm:px-5 sm:py-3 md:text-[0.9375rem] lg:text-base"
              >
                <Phone size={16} aria-hidden="true" />
                Call Us
              </a>

              <a
                href="mailto:sakshiplayschool@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 font-sans text-sm font-bold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-brand-gold sm:px-5 sm:py-3 md:text-[0.9375rem] lg:text-base"
              >
                <Mail size={16} aria-hidden="true" />
                Email Us
              </a>

              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-3 py-2 font-sans text-sm font-bold leading-5 tracking-normal text-white transition-colors duration-200 hover:bg-white hover:text-brand-navy sm:px-5 sm:py-3 md:text-[0.9375rem] lg:text-base"
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
            <div className="flex items-center gap-2 font-sans text-sm font-semibold leading-6 tracking-normal text-brand-navy md:text-[0.9375rem] lg:text-base">
              <CheckCircle2
                size={18}
                className="text-green-600"
                aria-hidden="true"
              />
              Monday - Saturday
            </div>

            <span className="hidden text-gray-300 sm:block">|</span>

            <div className="flex items-center gap-2 font-sans text-sm leading-6 tracking-normal text-text-secondary md:text-[0.9375rem] lg:text-base">
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
