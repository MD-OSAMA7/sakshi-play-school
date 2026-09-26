import featuresData from "../../data/featuresData";

function Features() {
  return (
    <section className="bg-surface-white py-7 md:py-8 lg:py-10">
      <div className="container">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6 lg:gap-5">
          {featuresData.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.id}
                className="group flex min-h-36 flex-col items-center justify-center rounded-2xl bg-white px-3 py-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating sm:min-h-40 sm:px-4"
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${feature.backgroundClass} sm:h-14 sm:w-14`}
                >
                  <Icon
                    size={26}
                    strokeWidth={2}
                    className={feature.iconClass}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="max-w-40 text-sm font-semibold leading-5 text-brand-navy sm:text-base sm:leading-6">
                  {feature.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;