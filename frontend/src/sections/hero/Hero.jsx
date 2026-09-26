import { ArrowRight, Sun } from "lucide-react";

import Button from "../../components/ui/Button";

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-surface-white">
      {/* Background Image */}
      <img
        src="/images/hero/hero.webp"
        alt="Happy children learning at Sakshi Play School"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Left White Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-white/70 to-transparent md:via-white/85"
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

      {/* Hero Content */}
      <div className="container relative z-10">
        <div className="flex min-h-96 items-center py-10 sm:min-h-104 sm:py-12 md:min-h-112 md:py-14 lg:min-h-120 lg:py-16">
          <div className="relative w-full max-w-xl md:w-1/2 lg:w-5/12 ">
            {/* Decorative Sun */}
            <Sun
              size={60}
              strokeWidth={3}
              className="absolute right-4 top-0 text-brand-gold sm:right-8 md:right-2 lg:right-0"
              aria-hidden="true"
            />

            {/* Main Heading */}
            <h1 className=" max-w-full pt-4 text-3xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-4xl md:pt-2 md:text-5xl lg:text-6xl">
              <span className="block whitespace-nowrap ">
                <span className="inline-block -rotate-2 mr-1.5">A </span>

                <span className="inline-block">Brighter</span>
              </span>

              <span className="block whitespace-nowrap text-pink-600 ">
                <span className="inline-block -rotate-2 mr-1.5">Tomorrow</span>

                <span className="inline-block rotate-0.5 -translate-y-1">Begins</span>
              </span>

              <span className="block whitespace-nowrap text-green-600 pl-16  md:pl-28 lg:pl-35 -rotate-3">
                Here!
              </span>
            </h1>

            {/* Play / Learn / Grow / Shine */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-extrabold sm:mt-5 sm:text-2xl">
              <span className="text-pink-600">Play</span>

              <span className="text-orange-500">|</span>

              <span className="text-brand-blue">Learn</span>

              <span className="text-orange-500">|</span>

              <span className="text-green-600">Grow</span>

              <span className="text-orange-500">|</span>

              <span className="text-orange-500">Shine</span>
            </div>

            {/* Description */}
            <p className="mt-3 max-w-lg text-sm leading-5 text-text-primary sm:mt-4 sm:text-base sm:leading-6">
              Nurturing young minds with love, care and quality education in a
              happy environment.
            </p>

            {/* Admission Button */}
            <div className="mt-5 sm:mt-6">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full bg-pink-600 px-6 text-white hover:bg-pink-700"
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
            <p className="mt-4 text-xs font-medium text-brand-navy sm:text-sm">
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
