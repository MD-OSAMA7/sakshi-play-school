import { ArrowRight, Sun } from "lucide-react";

import Button from "../../components/ui/Button";

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-surface-white py-12 md:py-16 lg:py-20"
    >
      {/* Background Image */}
      <img
        src="/images/hero/hero.webp"
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

      {/* Hero Content */}
      <div className="container">
        <div className="flex min-h-96 items-center sm:min-h-104 md:min-h-112 lg:min-h-120">
          <div className="relative w-120 max-w-full ">
            {/* Decorative Sun */}
            <Sun
              size={60}
              strokeWidth={3}
              className="absolute right-4 top-0 text-brand-gold sm:right-8 md:right-2 lg:right-0"
              aria-hidden="true"
            />

            {/* Main Heading */}
            <h1 className="max-w-100 font-serif font-black uppercase leading-none tracking-tight text-3xl text-brand-navy sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="pl-1 block">A Brighter</span>

              <span className="block whitespace-nowrap text-pink-600">
                Tomorrow
              </span>

              <span className="block whitespace-nowrap text-green-600">
               Begins Here!
              </span>
            </h1>

            {/* Play / Learn / Grow / Shine */}
            <div className="sm:mt-5 mt-1 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 font-sans text-[0.6rem] font-extrabold leading-6 tracking-widest sm:text-[1.6rem]">
              <span className="text-pink-600">Play</span>

              <span className="text-orange-500">|</span>

              <span className="text-brand-blue">Learn</span>

              <span className="text-orange-500">|</span>

              <span className="text-green-600">Grow</span>

              <span className="text-orange-500">|</span>

              <span className="text-orange-500">Shine</span>
            </div>

            {/* Description */}
            <p className="mt-4 max-w-xl font-sans text-sm leading-7 tracking-normal text-text-primary md:text-[0.9375rem] lg:text-base">
              Nurturing young minds with love, care and quality education in a
              happy environment.
            </p>

            {/* Admission Button */}
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full bg-pink-600 px-3 py-2 font-sans text-sm leading-5 tracking-normal text-white hover:bg-pink-700 sm:px-5 sm:py-3 md:text-[0.9375rem] lg:text-base"
                onClick={() => {
                  document.getElementById("admission")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Admission Open
                <ArrowRight size={19} strokeWidth={2.4} aria-hidden="true" />
              </Button>
            </div>

            {/* Classes */}
            <p className="mt-5 font-sans text-xs font-medium leading-5 tracking-normal text-brand-navy md:text-[0.8125rem] lg:text-sm">
              Play Group
              <span className="mx-1.5 text-text-secondary">|</span>
              Nursery
              <span className="mx-1.5 text-text-secondary">|</span>
              Junior KG
              <span className="mx-1.5 text-text-secondary">|</span>
              Senior KG
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
