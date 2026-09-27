import { useEffect, useRef } from "react";

import { ArrowRight, Megaphone } from "lucide-react";

const utilityItems = [
  {
    id: 1,
    label: "ANNOUNCEMENT",
    message: "Admission Open - Session 2026-27",
  },
  {
    id: 2,
    label: "NOTICE",
    message: "Welcome to Sakshi Play School",
  },
  {
    id: 3,
    label: "INFORMATION",
    message: "Explore our school programs and facilities",
  },
  {
    id: 4,
    label: "UPDATE",
    message: "Give your child the best start for a brighter tomorrow",
  },
  {
    id: 5,
    label: "UPDATE",
    message: "Give your child the best start for a brighter tomorrow",
  },
  {
    id: 6,
    label: "UPDATE",
    message: "Give your child the best start for a brighter tomorrow",
  },
];

function UtilityBar() {
  const trackRef = useRef(null);
  const firstGroupRef = useRef(null);

  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    let animationFrame;
    let lastTime = performance.now();

    const speed = 45;

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;

      lastTime = currentTime;

      if (!pausedRef.current && trackRef.current && firstGroupRef.current) {
        const groupWidth = firstGroupRef.current.getBoundingClientRect().width;

        offsetRef.current += (speed * deltaTime) / 1000;

        if (offsetRef.current >= groupWidth) {
          offsetRef.current -= groupWidth;
        }

        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
  };

  return (
    <div
      className="h-9 overflow-hidden bg-brand-navy text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full overflow-hidden">
        <div ref={trackRef} className="flex h-full w-max items-center">
          {/* First Group */}
          <div
            ref={firstGroupRef}
            className="flex h-full shrink-0 items-center"
          >
            {utilityItems.map((item) => (
              <div
                key={`first-${item.id}`}
                className="flex h-full shrink-0 items-center"
              >
                {/* Announcement Item */}
                <div className="flex items-center gap-2 whitespace-nowrap px-5">
                  {/* Megaphone */}
                  <Megaphone
                    size={19}
                    strokeWidth={2}
                    className="shrink-0 text-pink-500"
                    aria-hidden="true"
                  />

                  {/* Label */}
                  <span className="text-sm font-extrabold leading-6 tracking-normal text-pink-400 md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem]">
                    {item.label}
                  </span>

                  {/* Message */}
                  <span className="text-xs font-semibold leading-5 tracking-normal text-white md:text-[0.8125rem] lg:text-sm">
                    {item.message}
                  </span>

                  {/* Arrow */}
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    className="ml-1 shrink-0 text-white"
                    aria-hidden="true"
                  />
                </div>

                {/* Separator */}
                <div
                  className="h-5 w-px shrink-0 bg-white/40"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Second Identical Group */}
          <div className="flex h-full shrink-0 items-center">
            {utilityItems.map((item) => (
              <div
                key={`second-${item.id}`}
                className="flex h-full shrink-0 items-center"
              >
                {/* Announcement Item */}
                <div className="flex items-center gap-2 whitespace-nowrap px-5">
                  {/* Megaphone */}
                  <Megaphone
                    size={19}
                    strokeWidth={2}
                    className="shrink-0 text-pink-500"
                    aria-hidden="true"
                  />

                  {/* Label */}
                  <span className="text-sm font-extrabold leading-6 tracking-normal text-pink-400 md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem]">
                    {item.label}
                  </span>

                  {/* Message */}
                  <span className="text-xs font-semibold leading-5 tracking-normal text-white md:text-[0.8125rem] lg:text-sm">
                    {item.message}
                  </span>

                  {/* Arrow */}
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    className="ml-1 shrink-0 text-white"
                    aria-hidden="true"
                  />
                </div>

                {/* Separator */}
                <div
                  className="h-5 w-px shrink-0 bg-white/40"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UtilityBar;
