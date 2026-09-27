import { ArrowRight, Heart, Link } from "lucide-react";

import { NavLink } from "react-router-dom";

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-surface-white md:py-8 lg:py-10"
    >
      <div className="container">
        <div className="grid items-center gap-4 md:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* About Image */}
          <div className="lg:col-span-4">
            <div className="relative mx-auto max-w-md">
              <div className="relative overflow-hidden rounded-4xl border-4 border-white ">
                <img
                  src="/images/about/about.webp"
                  alt="Child enjoying creative learning at Sakshi Play School"
                  loading="lazy"
                  decoding="async"
                  className="h-100% w-100% object-cover sm:h-96 md:h-104 lg:h-60"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-5">
            <div className="max-w-xl">
              <h2 className="mt-1 font-sans text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
                Sakshi
                <span className="text-pink-600"> Play School</span>
              </h2>

              <p className="mt-3 text-sm leading-7 base:text-lg text-text-secondary md:text-[0.9rem]">
                At Sakshi Play School, we believe that every child is special
                and has unlimited potential. We provide a safe, caring and
                joyful environment where children learn through play,
                exploration and creative activities. Our aim is to build a
                strong foundation for a brighter future.
              </p>

              <NavLink
                to="/about"
                className="mt-2 inline-flex min-h-10 items-center justify-center gap-1 hover:gap-1.5 rounded-full bg-brand-navy px-3 font-semibold text-white transition-all duration-200 hover:bg-brand-blue"
              >
                <span className="hidden sm:inline">Know More About Us</span>

                {/* Mobile */}
                <span className="sm:hidden">About Us</span>
                <ArrowRight size={16} strokeWidth={3} aria-hidden="true" />
              </NavLink>
            </div>
          </div>

          {/* Decorative Message */}
          <div className="lg:col-span-3">
            <div className="mx-auto flex max-w-xs items-center justify-center">
              <div className="relative min-h-30 w-60 sm:min-h-64 sm:w-full max-w-xs overflow-hidden rounded-3xl text-center">
                <img
                  src="/images/about/about-2.png"
                  alt="Child enjoying creative learning at Sakshi Play School"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 top-3 flex items-center justify-center">
                  <p className="font-sans text-2xl font-extrabold -rotate-10 leading-tight text-brand-navy sm:text-3xl">
                    A Happy
                    <span className="block">Place for</span>
                    <span className="block">Little Learners</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
