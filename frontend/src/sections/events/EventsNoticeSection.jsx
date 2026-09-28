import { useEffect, useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Newspaper,
} from "lucide-react";

import { Link } from "react-router-dom";

import { readCache, writeCache } from "../../utils/cache";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EVENTS_CACHE_KEY = "sakshi_events_cache";
const NOTICES_CACHE_KEY = "sakshi_notices_cache";

const defaultEvents = [
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

const defaultNotices = [
  {
    id: 1,
    day: "14",
    month: "SEP",
    title: "Admission 2026-27",
    description: "New admission session will start from the 15th of sep",
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

function EventsNoticeSection({ showAll = false }) {
  const [events, setEvents] = useState(() =>
    readCache(EVENTS_CACHE_KEY, defaultEvents),
  );

  const [notices, setNotices] = useState(() =>
    readCache(NOTICES_CACHE_KEY, defaultNotices),
  );

  useEffect(() => {
    const fetchEventsAndNotices = async () => {
      try {
        const [eventsResponse, noticesResponse] = await Promise.all([
          fetch(`${API_URL}/api/events`),
          fetch(`${API_URL}/api/notices`),
        ]);

        if (!eventsResponse.ok || !noticesResponse.ok) {
          throw new Error("Failed to fetch events or notices.");
        }

        const [eventsResult, noticesResult] = await Promise.all([
          eventsResponse.json(),
          noticesResponse.json(),
        ]);

        if (!eventsResult.success || !noticesResult.success) {
          throw new Error(
            eventsResult.message ||
              noticesResult.message ||
              "Failed to fetch events or notices.",
          );
        }

        const latestEvents = Array.isArray(eventsResult.data)
          ? eventsResult.data
          : [];

        const latestNotices = Array.isArray(noticesResult.data)
          ? noticesResult.data
          : [];

        setEvents(latestEvents);
        setNotices(latestNotices);

        writeCache(EVENTS_CACHE_KEY, latestEvents);
        writeCache(NOTICES_CACHE_KEY, latestNotices);
      } catch (error) {
        console.error("Events and notices fetch error:", error);
      }
    };

    fetchEventsAndNotices();
  }, []);

  const visibleEvents = showAll ? events : events.slice(0, 3);
  const visibleNotices = showAll ? notices : notices.slice(0, 2);

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* =================================================
              UPCOMING EVENTS
          ================================================== */}
          <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CalendarDays size={22} strokeWidth={2} aria-hidden="true" />
                </div>

                <h2 className="min-w-0 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                  Upcoming <span className="text-pink-600">Events</span>
                </h2>
              </div>
            </div>

            {/* Events */}
            <div>
              {visibleEvents.length > 0 ? (
                visibleEvents.map((event) => (
                  <div
                    key={event._id || event.id}
                    className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 transition-colors duration-200 hover:bg-sky-50/50 sm:px-6"
                  >
                    {/* Date */}
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-green-50">
                      <span className="font-body text-base font-extrabold leading-4 text-brand-navy">
                        {event.day}
                      </span>

                      <span className="mt-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-green-700">
                        {event.month}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-body text-lg font-bold leading-snug tracking-tight text-brand-navy">
                        {event.title}
                      </h3>

                      <p className="mt-0.5 font-body text-sm leading-6 tracking-normal text-text-secondary sm:text-base">
                        {event.subtitle}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      size={18}
                      strokeWidth={1.8}
                      className="hidden shrink-0 text-gray-300 sm:block"
                      aria-hidden="true"
                    />
                  </div>
                ))
              ) : (
                <div className="px-5 py-8 text-center sm:px-6">
                  <p className="font-body text-sm leading-7 text-text-secondary">
                    No upcoming events available.
                  </p>
                </div>
              )}
            </div>

            {/* Home Only */}
            {!showAll && (
              <div className="border-t border-gray-100 px-5 py-3 sm:px-6">
                <Link
                  to="/admission#events-notices"
                  className="inline-flex items-center gap-1 font-body text-sm font-bold leading-5 tracking-normal text-brand-blue transition-colors duration-200 hover:text-pink-600"
                >
                  View All Events
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
              </div>
            )}
          </article>

          {/* =================================================
              NOTICE BOARD
          ================================================== */}
          <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                  <Newspaper size={22} strokeWidth={2} aria-hidden="true" />
                </div>

                <h2 className="min-w-0 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                  Notice <span className="text-pink-600">Board</span>
                </h2>
              </div>
            </div>

            {/* Notices */}
            <div>
              {visibleNotices.length > 0 ? (
                visibleNotices.map((notice) => (
                  <div
                    key={notice._id || notice.id}
                    className="group flex items-center gap-4 border-t border-gray-100 px-5 py-4 transition-colors duration-200 hover:bg-sky-50/50 sm:px-6"
                  >
                    {/* Date */}
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50">
                      <span className="font-body text-base font-extrabold leading-4 text-brand-navy">
                        {notice.day}
                      </span>

                      <span className="mt-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-brand-blue">
                        {notice.month}
                      </span>
                    </div>

                    {/* Notice Details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-body text-lg font-bold leading-snug tracking-tight text-brand-navy">
                        {notice.title}
                      </h3>

                      <p
                        className={`mt-0.5 font-body text-sm leading-6 tracking-normal text-text-secondary sm:text-base ${
                          showAll ? "max-w-3xl" : "truncate"
                        }`}
                      >
                        {notice.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      size={21}
                      strokeWidth={1.8}
                      className="hidden shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand-blue sm:block"
                      aria-hidden="true"
                    />
                  </div>
                ))
              ) : (
                <div className="px-5 py-8 text-center sm:px-6">
                  <p className="font-body text-sm leading-7 text-text-secondary">
                    No notices available.
                  </p>
                </div>
              )}
            </div>

            {/* Home Only */}
            {!showAll && (
              <div className="border-t border-gray-100 px-5 py-3 sm:px-6">
                <Link
                  to="/admission#events-notices"
                  className="inline-flex items-center gap-1 font-body text-sm font-bold leading-5 tracking-normal text-brand-blue transition-colors duration-200 hover:text-pink-600"
                >
                  View All Notices
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

export default EventsNoticeSection;
