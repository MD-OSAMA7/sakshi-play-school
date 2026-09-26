import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

function AdmissionBanner() {
  return (
    <section
      id="admission"
      className="bg-white  py-7 md:py-8 lg:py-10"
    >
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-pink-600 px-5 py-4 sm:flex-row sm:px-7 md:gap-6">
          {/* Message */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-3xl">
              Admissions Open for the Academic Session
            </h2>
          </div>

          {/* Enquire Button */}
          <NavLink
            to="/contact"
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1 hover:gap-1.5 rounded-full bg-white px-6 text-xs font-bold text-pink-600 shadow-button transition-all duration-200 hover:scale-[1.02] hover:shadow-button-hover sm:text-base"
          >
            Enquire Now

            <ArrowRight
              size={16}
              strokeWidth={3}
              aria-hidden="true"
            />
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default AdmissionBanner;