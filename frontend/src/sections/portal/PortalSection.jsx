import { ArrowRight, UserRound, UsersRound } from "lucide-react";

function PortalSection() {
  return (
    <section className="bg-white py-7 md:py-8 lg:py-10">
      <div className="container">
        <div className="grid gap-4 lg:grid-cols-11 lg:gap-5">
          {/* Staff Login */}
          <article className="rounded-3xl bg-sky-50 p-5  sm:p-6 lg:col-span-4">
            <div className="flex h-full items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white sm:h-24 sm:w-24">
                <UserRound size={42} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-navy" />

                  <h2 className="text-xl font-extrabold leading-7 text-brand-navy">
                    Staff Portal
                  </h2>
                </div>

                <p className="mt-2 text-xs leading-5 text-text-secondary sm:text-sm">
                  For our dedicated teachers and staff members.
                </p>

                <button
                  type="button"
                  className="mt-3 inline-flex min-h-9 items-center justify-center gap-1 hover:gap-1.5 rounded-full bg-brand-navy px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-blue"
                >
                  Staff Login
                  <ArrowRight size={16} strokeWidth={3} aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>

          {/* Parent Login */}
          <article className="rounded-3xl bg-pink-50 p-5 shadow-card sm:p-6 lg:col-span-4">
            <div className="flex h-full items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-pink-600 text-white sm:h-24 sm:w-24">
                <UsersRound size={42} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-600" />

                  <h2 className="text-xl font-extrabold leading-tight text-pink-600">
                    Parent Portal
                  </h2>
                </div>

                <p className="mt-2 text-xs leading-5 text-text-secondary sm:text-sm">
                  Stay connected with your child's learning journey.
                </p>

                <button
                  type="button"
                  className="mt-3 inline-flex min-h-9 items-center justify-center gap-1 hover:gap-1.5 rounded-full bg-pink-600 px-5 text-sm font-semibold text-white  transition-all duration-200  hover:bg-pink-700 hover:shadow-button-hover"
                >
                  Parent Login
                  <ArrowRight size={16} strokeWidth={3} aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>

          {/* Decorative Message */}
          <div className="flex items-center justify-center py-4 text-center lg:col-span-3 lg:py-0">
            <div className="max-w-35 max-h-25 sm:max-w-48">
              <p className="-rotate-3 font-display text-xl font-bold leading-7 text-brand-blue sm:text-3xl">
                Together
                <span className="block text-brand-navy">for a Brighter</span>
                <span className="block text-pink-600">Tomorrow</span>
              </p>

              <div className="mx-auto mt-1 h-1 w-25 -rotate-3 rounded-full  sm:w-40 bg-linear-to-r from-transparent via-yellow-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortalSection;
