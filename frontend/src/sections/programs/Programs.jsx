import { CircleCheck } from "lucide-react";

import programsData from "../../data/programsData";

const whyChooseData = [
  "Focus on a particular age group",
  "Flexible academic programs",
  "Creative learning & fun activities",
  "Spacious indoor play area",
  "Big play ground area",
  "Swimming pool for kids",
  "CCTV camera & safe campus",
  "Purified RO drinking water",
  "First-aid & rest room",
  "Separate washroom for girls and boys",
  "And many more facilities...",
];

function Programs() {
  return (
    <section id="programs" className="bg-white  py-7 md:py-8 lg:py-10">
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          {/* Programs Panel */}
          <div className="overflow-hidden rounded-3xl bg-blue-50 p-5 md:p-6 lg:col-span-8 lg:p-7">
            {/* Heading */}
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
                Our <span className="text-pink-600">Programs</span>
              </h2>

              <p className="mt-1 text-sm leading-5 text-brand-navy sm:text-base sm:leading-6">
                Age appropriate learning with the right care and attention
              </p>
            </div>

            {/* Program Cards */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-4">
              {programsData.map((program) => (
                <article
                  key={program.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-card"
                >
                  {/* Program Image */}
                  <div className="bg-white">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-32 w-full object-contain sm:h-36 lg:h-40"
                    />
                  </div>

                  {/* Program Details */}
                  <div className={`px-2 py-3 text-center sm:px-3`}>
                    <h3 className="text-sm font-bold leading-5 text-brand-navy sm:text-base">
                      {program.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium leading-4 text-text-secondary sm:text-sm">
                      {program.age}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Why Choose Sakshi */}
          <div className="relative overflow-hidden rounded-3xl bg-amber-50 p-5 md:p-6 lg:col-span-4 lg:p-7">
            {/* Heading */}
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl">
              Why Choose <span className="text-pink-600">Sakshi?</span>
            </h2>

            {/* Benefits */}
            <div className="relative z-10 mt-4 space-y-2">
              {whyChooseData.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CircleCheck
                    size={19}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-green-600"
                    aria-hidden="true"
                  />

                  <p className="text-sm leading-5 text-text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Programs;
