import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Newspaper,
} from "lucide-react";

import { Link } from "react-router-dom";

const upcomingEvents = [
  {
    id: 1,
    day: "02",
    month: "OCT",
    title: "Gandhi Jayanti",
    subtitle: "National Holiday",
  },
  {
    id: 2,
    day: "20",
    month: "OCT",
    title: "Dussehra",
    subtitle: "Vijay Dashami",
  },
  {
    id: 3,
    day: "08",
    month: "NOV",
    title: "Diwali",
    subtitle: "Deepavali",
  },
];

const noticeBoard = [
  {
    id: 1,
    day: "14",
    month: "SEP",
    title: "Admission 2026-27",
    description:
      "New admission session will start from the 15th of sep",
  },
  {
    id: 2,
    day: "11",
    month: "SEP",
    title: "This website is build by Earthix Team",
    description:
      "At Earthix, our mission is to empower businesses of all size...",
  },
];

function EventsNoticeSection() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* =================================================
              UPCOMING EVENTS
          ================================================== */}
          <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CalendarDays
                    size={22}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                <h2 className="text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl">
                  Upcoming{" "}
                  <span className="text-pink-600">
                    Events
                  </span>
                </h2>
              </div>
            </div>

            {/* Events */}
            <div>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 transition-colors duration-200 hover:bg-sky-50/50 sm:px-6"
                >
                  {/* Date */}
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-green-50">
                    <span className="text-base font-extrabold leading-4 text-brand-navy">
                      {event.day}
                    </span>

                    <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700">
                      {event.month}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold leading-6 text-brand-navy sm:text-lg">
                      {event.title}
                    </h3>

                    <p className="mt-0.5 text-sm leading-5 text-text-secondary sm:text-base">
                      {event.subtitle}
                    </p>
                  </div>

                  {/* Small Arrow */}
                  <ArrowRight
                    size={18}
                    strokeWidth={1.8}
                    className="hidden shrink-0 text-gray-300 sm:block"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-3 sm:px-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue transition-colors duration-200 hover:text-pink-600"
              >
                View All Events
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>

          {/* =================================================
              NOTICE BOARD
          ================================================== */}
          <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                  <Newspaper
                    size={22}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                <h2 className="text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl">
                  Notice{" "}
                  <span className="text-pink-600">
                    Board
                  </span>
                </h2>
              </div>

              <Link
                to="/contact"
                className="shrink-0 text-sm font-bold text-brand-blue transition-colors duration-200 hover:text-pink-600 sm:text-base"
              >
                View All
              </Link>
            </div>

            {/* Notices */}
            <div>
              {noticeBoard.map((notice) => (
                <Link
                  key={notice.id}
                  to="/contact"
                  className="group flex items-center gap-4 border-t border-gray-100 px-5 py-4 transition-colors duration-200 hover:bg-sky-50/50 sm:px-6"
                >
                  {/* Date */}
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50">
                    <span className="text-base font-extrabold leading-4 text-brand-navy">
                      {notice.day}
                    </span>

                    <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-blue">
                      {notice.month}
                    </span>
                  </div>

                  {/* Notice Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold leading-6 text-brand-navy sm:text-lg">
                      {notice.title}
                    </h3>

                    <p className="mt-0.5 truncate text-sm leading-5 text-text-secondary sm:text-base">
                      {notice.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={21}
                    strokeWidth={1.8}
                    className="shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand-blue"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-3 sm:px-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue transition-colors duration-200 hover:text-pink-600"
              >
                View All Notices
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default EventsNoticeSection;