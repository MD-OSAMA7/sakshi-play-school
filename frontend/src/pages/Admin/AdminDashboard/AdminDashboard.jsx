import { useEffect, useState } from "react";

import { useClerk } from "@clerk/react";

import {
  Bell,
  CalendarDays,
  Camera,
  CheckCircle2,
  Image,
  LoaderCircle,
  Megaphone,
  Menu,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import AdminSidebar from "../AdminSidebar/AdminSidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const dashboardItems = [
  {
    key: "gallery",
    title: "Gallery Images",
    subtitle: "Published images",
    icon: Image,
    iconClass: "bg-pink-50 text-pink-600",
  },
  {
    key: "events",
    title: "Upcoming Events",
    subtitle: "Active events",
    icon: CalendarDays,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    key: "notices",
    title: "Notice Board",
    subtitle: "Active notices",
    icon: Bell,
    iconClass: "bg-blue-50 text-brand-blue",
  },
  {
    key: "utility",
    title: "Top Bar Items",
    subtitle: "Active announcements",
    icon: Megaphone,
    iconClass: "bg-green-50 text-green-600",
  },
];

function AdminDashboard() {
  const clerk = useClerk();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({
    gallery: 0,
    events: 0,
    notices: 0,
    utility: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await clerk.signOut({
        redirectUrl: "/admin/login",
      });
    } catch (logoutError) {
      console.error("Admin logout error:", logoutError);
    }
  };

  const fetchDashboardCounts = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        galleryResponse,
        eventsResponse,
        noticesResponse,
        utilityResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/api/gallery`),
        fetch(`${API_URL}/api/events`),
        fetch(`${API_URL}/api/notices`),
        fetch(`${API_URL}/api/utility`),
      ]);

      const [galleryResult, eventsResult, noticesResult, utilityResult] =
        await Promise.all([
          galleryResponse.json(),
          eventsResponse.json(),
          noticesResponse.json(),
          utilityResponse.json(),
        ]);

      if (
        !galleryResponse.ok ||
        !galleryResult.success ||
        !eventsResponse.ok ||
        !eventsResult.success ||
        !noticesResponse.ok ||
        !noticesResult.success ||
        !utilityResponse.ok ||
        !utilityResult.success
      ) {
        throw new Error("Failed to load dashboard data.");
      }

      setCounts({
        gallery: galleryResult.data.length,
        events: eventsResult.data.length,
        notices: noticesResult.data.length,
        utility: utilityResult.data.length,
      });
    } catch (fetchError) {
      console.error("Dashboard count error:", fetchError);
      setError(fetchError.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-sky-50 font-body">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="min-h-screen lg:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur lg:hidden">
          <div className="container">
            <div className="flex min-h-16 items-center justify-between gap-3 py-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white"
                aria-label="Open admin sidebar"
              >
                <Menu size={20} aria-hidden="true" />
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-sm font-extrabold leading-6 tracking-normal text-brand-navy">
                  Sakshi Admin
                </p>

                <p className="truncate font-body text-xs leading-5 tracking-normal text-text-secondary">
                  Management Dashboard
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-body text-sm font-bold leading-5 tracking-normal text-brand-navy"
              >
                Website
              </Link>
            </div>
          </div>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden border-b border-gray-100 bg-white lg:block">
          <div className="container">
            <div className="flex min-h-16 items-center justify-between gap-4 py-3">
              <div>
                <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                  Administration
                </p>

                <p className="font-body text-sm font-semibold leading-6 tracking-normal text-text-secondary">
                  School Management Dashboard
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 font-body text-sm font-bold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-sky-50"
              >
                View Website
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="container">
            {/* Welcome */}
            <div className="max-w-2xl">
              <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                Overview
              </p>

              <h1 className="mt-1 font-heading text-2xl sm:text-3xl md:text-[1.875rem] lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl leading-tight tracking-tight font-extrabold text-brand-navy">
                Admin <span className="text-pink-600">Dashboard</span>
              </h1>

              <p className="mt-2 max-w-2xl font-body text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal text-text-secondary">
                Manage your Sakshi Play School website content from one place.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 font-body text-sm font-semibold leading-5 tracking-normal text-red-700">
                <span>{error}</span>

                <button
                  type="button"
                  onClick={fetchDashboardCounts}
                  className="font-body text-sm font-bold leading-5 tracking-normal text-red-700 underline underline-offset-2"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardItems.map((item) => {
                const Icon = item.icon;
                const value = counts[item.key];

                return (
                  <article
                    key={item.key}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${item.iconClass}`}
                      >
                        <Icon size={21} aria-hidden="true" />
                      </div>

                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mt-5 font-body text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-bold text-text-secondary">
                      {item.title}
                    </p>

                    <p className="mt-1 font-body text-3xl font-extrabold leading-tight tracking-tight text-brand-navy">
                      {loading ? "--" : String(value).padStart(2, "0")}
                    </p>

                    <p className="mt-1 font-body text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal text-text-secondary">
                      {item.subtitle}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Quick Access */}
            <section className="mt-8">
              <div>
                <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                  Quick Access
                </p>

                <h2 className="mt-1 font-heading text-xl sm:text-[1.375rem] md:text-2xl lg:text-[1.75rem] xl:text-[1.875rem] 2xl:text-3xl leading-tight tracking-tight font-extrabold text-brand-navy">
                  Manage <span className="text-pink-600">Website</span>
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Link
                  to="/admin/gallery"
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                    <Camera size={21} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                    Gallery
                  </h3>

                  <p className="mt-2 max-w-xl font-body text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal text-text-secondary">
                    Upload, edit, arrange and remove school photos.
                  </p>
                </Link>

                <Link
                  to="/admin/events"
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <CalendarDays size={21} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                    Events
                  </h3>

                  <p className="mt-2 max-w-xl font-body text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal text-text-secondary">
                    Add, edit, arrange and remove upcoming events.
                  </p>
                </Link>

                <Link
                  to="/admin/notices"
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                    <Bell size={21} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                    Notices
                  </h3>

                  <p className="mt-2 max-w-xl font-body text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal text-text-secondary">
                    Manage the notice board content shown on the website.
                  </p>
                </Link>

                <Link
                  to="/admin/top-bar"
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <Megaphone size={21} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                    Top Bar
                  </h3>

                  <p className="mt-2 max-w-xl font-body text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal text-text-secondary">
                    Manage announcements and updates shown in the top bar.
                  </p>
                </Link>
              </div>
            </section>

            {/* System Status */}
            <section className="mt-8">
              <div className="rounded-2xl border border-gray-100 bg-brand-navy p-5 shadow-card sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-gold">
                      <ShieldCheck size={21} aria-hidden="true" />
                    </div>

                    <div>
                      <h2 className="font-heading text-xl sm:text-[1.375rem] md:text-2xl lg:text-[1.75rem] xl:text-[1.875rem] 2xl:text-3xl leading-tight tracking-tight font-extrabold text-white">
                        System Status
                      </h2>

                      <p className="mt-1 max-w-2xl font-body text-sm md:text-[0.9375rem] lg:text-base leading-7 tracking-normal text-white/70">
                        Gallery, events, notices and top bar are connected to
                        the admin management modules.
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 font-body text-xs md:text-[0.8125rem] lg:text-sm font-semibold leading-5 tracking-normal text-green-300">
                    <CheckCircle2 size={17} aria-hidden="true" />
                    System Active
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
