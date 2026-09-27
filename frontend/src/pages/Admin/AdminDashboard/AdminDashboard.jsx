import { useEffect, useState } from "react";

import {
  Bell,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  Edit3,
  Image,
  LogOut,
  Megaphone,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

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

const EVENTS_STORAGE_KEY = "sakshi_events";
const NOTICES_STORAGE_KEY = "sakshi_notices";
const UTILITY_STORAGE_KEY = "sakshi_utility_items";

const defaultUtilityItems = [
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
];

const emptyEvent = {
  id: null,
  day: "",
  month: "",
  title: "",
  subtitle: "",
};

const emptyNotice = {
  id: null,
  day: "",
  month: "",
  title: "",
  description: "",
};

const emptyUtilityItem = {
  id: null,
  label: "",
  message: "",
};

const quickActions = [
  {
    id: 1,
    title: "Manage Gallery",
    description: "Upload or remove school photos.",
    icon: Camera,
    href: "/admin/gallery",
    iconClass: "bg-pink-600 text-white",
  },
  {
    id: 2,
    title: "Manage Events",
    description: "Add or update upcoming events.",
    icon: CalendarDays,
    href: "#events-notices",
    iconClass: "bg-amber-500 text-white",
  },
  {
    id: 3,
    title: "Manage Notices",
    description: "Create and update notices.",
    icon: Megaphone,
    href: "#events-notices",
    iconClass: "bg-blue-600 text-white",
  },
  {
    id: 4,
    title: "Manage Top Bar",
    description: "Edit website announcements and updates.",
    icon: Megaphone,
    href: "#top-bar",
    iconClass: "bg-green-600 text-white",
  },
];

function AdminDashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [utilityItems, setUtilityItems] = useState([]);

  const [activeManager, setActiveManager] = useState("events");

  const [utilityForm, setUtilityForm] = useState(emptyUtilityItem);

  const [editingUtilityId, setEditingUtilityId] = useState(null);

  const [eventForm, setEventForm] = useState(emptyEvent);

  const [noticeForm, setNoticeForm] = useState(emptyNotice);

  const [editingEventId, setEditingEventId] = useState(null);

  const [editingNoticeId, setEditingNoticeId] = useState(null);

  const [savedMessage, setSavedMessage] = useState("");

  /* =========================================================
     LOAD DATA
  ========================================================== */

  useEffect(() => {
    const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);

    const storedNotices = localStorage.getItem(NOTICES_STORAGE_KEY);
    const storedUtilityItems = localStorage.getItem(UTILITY_STORAGE_KEY);

    setEvents(storedEvents ? JSON.parse(storedEvents) : defaultEvents);

    setNotices(storedNotices ? JSON.parse(storedNotices) : defaultNotices);

    setUtilityItems(
      storedUtilityItems ? JSON.parse(storedUtilityItems) : defaultUtilityItems,
    );
  }, []);

  /* =========================================================
     COMMON FUNCTIONS
  ========================================================== */

  const showSavedMessage = () => {
    setSavedMessage("Changes saved successfully.");

    window.setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  const saveEvents = (nextEvents) => {
    setEvents(nextEvents);

    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(nextEvents));

    showSavedMessage();
  };

  const saveNotices = (nextNotices) => {
    setNotices(nextNotices);

    localStorage.setItem(NOTICES_STORAGE_KEY, JSON.stringify(nextNotices));

    showSavedMessage();
  };

  const saveUtilityItems = (nextItems) => {
    setUtilityItems(nextItems);

    localStorage.setItem(UTILITY_STORAGE_KEY, JSON.stringify(nextItems));

    showSavedMessage();
  };

  /* =========================================================
     EVENT MANAGEMENT
  ========================================================== */

  const handleEventChange = (event) => {
    const { name, value } = event.target;

    setEventForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();

    if (
      !eventForm.day.trim() ||
      !eventForm.month.trim() ||
      !eventForm.title.trim() ||
      !eventForm.subtitle.trim()
    ) {
      return;
    }

    if (editingEventId) {
      const nextEvents = events.map((item) =>
        item.id === editingEventId
          ? {
              ...eventForm,
              id: editingEventId,
              month: eventForm.month.toUpperCase(),
            }
          : item,
      );

      saveEvents(nextEvents);
    } else {
      const nextId =
        events.length > 0 ? Math.max(...events.map((item) => item.id)) + 1 : 1;

      saveEvents([
        ...events,
        {
          ...eventForm,
          id: nextId,
          month: eventForm.month.toUpperCase(),
        },
      ]);
    }

    resetEventForm();
  };

  const editEvent = (item) => {
    setEventForm(item);
    setEditingEventId(item.id);
    setActiveManager("events");
  };

  const deleteEvent = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!shouldDelete) {
      return;
    }

    const nextEvents = events.filter((item) => item.id !== id);

    saveEvents(nextEvents);

    if (editingEventId === id) {
      resetEventForm();
    }
  };

  const resetEventForm = () => {
    setEventForm(emptyEvent);
    setEditingEventId(null);
  };

  /* =========================================================
     NOTICE MANAGEMENT
  ========================================================== */

  const handleNoticeChange = (event) => {
    const { name, value } = event.target;

    setNoticeForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleNoticeSubmit = (event) => {
    event.preventDefault();

    if (
      !noticeForm.day.trim() ||
      !noticeForm.month.trim() ||
      !noticeForm.title.trim() ||
      !noticeForm.description.trim()
    ) {
      return;
    }

    if (editingNoticeId) {
      const nextNotices = notices.map((item) =>
        item.id === editingNoticeId
          ? {
              ...noticeForm,
              id: editingNoticeId,
              month: noticeForm.month.toUpperCase(),
            }
          : item,
      );

      saveNotices(nextNotices);
    } else {
      const nextId =
        notices.length > 0
          ? Math.max(...notices.map((item) => item.id)) + 1
          : 1;

      saveNotices([
        ...notices,
        {
          ...noticeForm,
          id: nextId,
          month: noticeForm.month.toUpperCase(),
        },
      ]);
    }

    resetNoticeForm();
  };

  const editNotice = (item) => {
    setNoticeForm(item);
    setEditingNoticeId(item.id);
    setActiveManager("notices");
  };

  const deleteNotice = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this notice?",
    );

    if (!shouldDelete) {
      return;
    }

    const nextNotices = notices.filter((item) => item.id !== id);

    saveNotices(nextNotices);

    if (editingNoticeId === id) {
      resetNoticeForm();
    }
  };

  const resetNoticeForm = () => {
    setNoticeForm(emptyNotice);
    setEditingNoticeId(null);
  };

  /* =========================================================
     TOP BAR MANAGEMENT
  ========================================================== */

  const handleUtilityChange = (event) => {
    const { name, value } = event.target;

    setUtilityForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleUtilitySubmit = (event) => {
    event.preventDefault();

    if (!utilityForm.label.trim() || !utilityForm.message.trim()) {
      return;
    }

    if (editingUtilityId) {
      const nextItems = utilityItems.map((item) =>
        item.id === editingUtilityId
          ? {
              ...utilityForm,
              id: editingUtilityId,
              label: utilityForm.label.toUpperCase(),
            }
          : item,
      );

      saveUtilityItems(nextItems);
    } else {
      const nextId =
        utilityItems.length > 0
          ? Math.max(...utilityItems.map((item) => item.id)) + 1
          : 1;

      saveUtilityItems([
        ...utilityItems,
        {
          ...utilityForm,
          id: nextId,
          label: utilityForm.label.toUpperCase(),
        },
      ]);
    }

    resetUtilityForm();
  };

  const editUtilityItem = (item) => {
    setUtilityForm(item);
    setEditingUtilityId(item.id);
  };

  const deleteUtilityItem = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this top bar item?",
    );

    if (!shouldDelete) {
      return;
    }

    const nextItems = utilityItems.filter((item) => item.id !== id);

    saveUtilityItems(nextItems);

    if (editingUtilityId === id) {
      resetUtilityForm();
    }
  };

  const resetUtilityForm = () => {
    setUtilityForm(emptyUtilityItem);
    setEditingUtilityId(null);
  };

  /* =========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-sky-50 font-body">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container">
          <div className="flex min-h-16 items-center justify-between gap-4 py-3">
            {/* Brand */}
            <Link
              to="/admin/dashboard"
              className="flex min-w-0 items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white">
                <ShieldCheck size={21} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-brand-navy md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-6 tracking-normal font-body">
                  Sakshi Admin
                </p>

                <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                  School Management Panel
                </p>
              </div>
            </Link>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="hidden min-h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-semibold text-brand-navy transition-colors duration-200 hover:bg-sky-50 sm:inline-flex"
              >
                View Website
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-white transition-colors duration-200 hover:bg-pink-700"
              >
                <LogOut size={17} aria-hidden="true" />

                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          DASHBOARD
      ====================================================== */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="container">
          {/* Welcome */}
          <div className="mb-6 sm:mb-7">
            <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold uppercase tracking-wide text-brand-blue">
              Administration
            </p>

            <h1 className="mt-1 font-heading text-2xl sm:text-3xl md:text-[1.875rem] lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl leading-tight tracking-tight font-extrabold text-brand-navy">
              Admin <span className="text-pink-600">Dashboard</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal font-body text-text-secondary">
              Manage your Sakshi Play School website content from one place.
            </p>
          </div>

          {/* Saved Message */}
          {savedMessage && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-green-700">
              <Check size={18} aria-hidden="true" />

              {savedMessage}
            </div>
          )}

          {/* =================================================
              STATS
          ================================================== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Gallery */}
            <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <Image size={21} aria-hidden="true" />
                </div>

                <CheckCircle2
                  size={18}
                  className="text-green-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold text-text-secondary">
                Gallery Images
              </p>

              <p className="mt-1 text-3xl font-extrabold leading-tight tracking-tight font-body text-brand-navy">
                24
              </p>

              <p className="mt-1 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                Published images
              </p>
            </article>

            {/* Events */}
            <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <CalendarDays size={21} aria-hidden="true" />
                </div>

                <CheckCircle2
                  size={18}
                  className="text-green-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold text-text-secondary">
                Upcoming Events
              </p>

              <p className="mt-1 text-3xl font-extrabold leading-tight tracking-tight font-body text-brand-navy">
                {String(events.length).padStart(2, "0")}
              </p>

              <p className="mt-1 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                Active events
              </p>
            </article>

            {/* Notices */}
            <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                  <Bell size={21} aria-hidden="true" />
                </div>

                <CheckCircle2
                  size={18}
                  className="text-green-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold text-text-secondary">
                Notice Board
              </p>

              <p className="mt-1 text-3xl font-extrabold leading-tight tracking-tight font-body text-brand-navy">
                {String(notices.length).padStart(2, "0")}
              </p>

              <p className="mt-1 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                Active notices
              </p>
            </article>

            {/* Admin */}
            <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <ShieldCheck size={21} aria-hidden="true" />
                </div>

                <CheckCircle2
                  size={18}
                  className="text-green-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold text-text-secondary">
                Admin Status
              </p>

              <p className="mt-1 text-3xl font-extrabold leading-tight tracking-tight font-body text-brand-navy">
                Active
              </p>

              <p className="mt-1 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                Panel is operational
              </p>
            </article>
          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================== */}
          <div className="mt-6 sm:mt-8">
            <div>
              <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold uppercase tracking-wide text-brand-blue">
                Quick Access
              </p>

              <h2 className="mt-1 font-heading text-xl sm:text-[1.375rem] md:text-2xl lg:text-[1.75rem] xl:text-[1.875rem] 2xl:text-3xl leading-tight tracking-tight font-extrabold text-brand-navy">
                Manage <span className="text-pink-600">Website</span>
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickActions.map((action) => {
                const Icon = action.icon;

                if (action.href.startsWith("#")) {
                  return (
                    <a
                      key={action.id}
                      href={action.href}
                      className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${action.iconClass}`}
                        >
                          <Icon size={22} aria-hidden="true" />
                        </div>

                        <Plus
                          size={19}
                          className="text-gray-300 transition-transform duration-200 group-hover:rotate-90 group-hover:text-brand-blue"
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="mt-5 font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                        {action.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal font-body text-text-secondary">
                        {action.description}
                      </p>
                    </a>
                  );
                }

                return (
                  <Link
                    key={action.id}
                    to={action.href}
                    className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${action.iconClass}`}
                      >
                        <Icon size={22} aria-hidden="true" />
                      </div>

                      <Plus
                        size={19}
                        className="text-gray-300 transition-transform duration-200 group-hover:rotate-90 group-hover:text-brand-blue"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="mt-5 font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                      {action.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal font-body text-text-secondary">
                      {action.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* =================================================
              EVENTS + NOTICE MANAGEMENT
          ================================================== */}
          <section id="events-notices" className="mt-6 scroll-mt-6 sm:mt-8">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-card">
              {/* Management Header */}
              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold uppercase tracking-wide text-brand-blue">
                  Content Management
                </p>

                <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-heading text-xl sm:text-[1.375rem] md:text-2xl lg:text-[1.75rem] xl:text-[1.875rem] 2xl:text-3xl leading-tight tracking-tight font-extrabold text-brand-navy">
                      Events & <span className="text-pink-600">Notices</span>
                    </h2>

                    <p className="mt-1 max-w-2xl text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal font-body text-text-secondary">
                      Changes made here will update the Events & Notice section
                      on the website.
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="grid w-full grid-cols-2 rounded-xl bg-sky-50 p-1 sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveManager("events");
                        resetNoticeForm();
                      }}
                      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 sm:px-4 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold transition-colors duration-200 ${
                        activeManager === "events"
                          ? "bg-brand-navy text-white"
                          : "text-brand-navy hover:bg-white"
                      }`}
                    >
                      <CalendarDays size={17} aria-hidden="true" />
                      Events
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveManager("notices");
                        resetEventForm();
                      }}
                      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 sm:px-4 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold transition-colors duration-200 ${
                        activeManager === "notices"
                          ? "bg-brand-navy text-white"
                          : "text-brand-navy hover:bg-white"
                      }`}
                    >
                      <Bell size={17} aria-hidden="true" />
                      Notices
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================================
                  EVENT MANAGEMENT
              ================================================== */}
              {activeManager === "events" && (
                <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-12">
                  {/* Add / Edit Form */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-sky-50 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                          <CalendarDays size={20} aria-hidden="true" />
                        </div>

                        <div>
                          <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold uppercase tracking-wide text-brand-blue">
                            Event Manager
                          </p>

                          <h3 className="font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                            {editingEventId ? "Edit Event" : "Add Event"}
                          </h3>
                        </div>
                      </div>

                      <form
                        onSubmit={handleEventSubmit}
                        className="mt-5 space-y-4"
                      >
                        {/* Day / Month */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="dashboard-event-day"
                              className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                            >
                              Day
                            </label>

                            <input
                              id="dashboard-event-day"
                              name="day"
                              type="text"
                              value={eventForm.day}
                              onChange={handleEventChange}
                              placeholder="02"
                              maxLength={2}
                              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="dashboard-event-month"
                              className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                            >
                              Month
                            </label>

                            <input
                              id="dashboard-event-month"
                              name="month"
                              type="text"
                              value={eventForm.month}
                              onChange={handleEventChange}
                              placeholder="OCT"
                              maxLength={3}
                              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body uppercase outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <div>
                          <label
                            htmlFor="dashboard-event-title"
                            className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                          >
                            Event Title
                          </label>

                          <input
                            id="dashboard-event-title"
                            name="title"
                            type="text"
                            value={eventForm.title}
                            onChange={handleEventChange}
                            placeholder="Gandhi Jayanti"
                            maxLength={100}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                          />
                        </div>

                        {/* Subtitle */}
                        <div>
                          <label
                            htmlFor="dashboard-event-subtitle"
                            className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                          >
                            Subtitle
                          </label>

                          <input
                            id="dashboard-event-subtitle"
                            name="subtitle"
                            type="text"
                            value={eventForm.subtitle}
                            onChange={handleEventChange}
                            placeholder="National Holiday"
                            maxLength={120}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                          />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3 pt-1">
                          <button
                            type="submit"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
                          >
                            {editingEventId ? (
                              <Save size={17} aria-hidden="true" />
                            ) : (
                              <Plus size={17} aria-hidden="true" />
                            )}

                            {editingEventId ? "Update Event" : "Add Event"}
                          </button>

                          {editingEventId && (
                            <button
                              type="button"
                              onClick={resetEventForm}
                              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-brand-navy transition-colors duration-200 hover:bg-gray-50"
                            >
                              <X size={17} aria-hidden="true" />
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Existing Events */}
                  <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                          <h3 className="font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                            Existing Events
                          </h3>

                          <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                            {events.length} active event
                            {events.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>

                      <div>
                        {events.length === 0 ? (
                          <div className="px-5 py-10 text-center text-sm md:text-[0.9375rem] lg:text-base leading-7 tracking-normal font-body text-text-secondary">
                            No events available.
                          </div>
                        ) : (
                          events.map((event) => (
                            <div
                              key={event.id}
                              className="flex flex-col gap-4 border-b border-gray-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="flex min-w-0 items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-green-50">
                                  <span className="text-base font-extrabold leading-4 text-brand-navy">
                                    {event.day}
                                  </span>

                                  <span className="text-[10px] font-bold text-green-700">
                                    {event.month}
                                  </span>
                                </div>

                                <div className="min-w-0">
                                  <h4 className="truncate text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-bold text-brand-navy">
                                    {event.title}
                                  </h4>

                                  <p className="mt-1 max-w-2xl text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal font-body text-text-secondary">
                                    {event.subtitle}
                                  </p>
                                </div>
                              </div>

                              <div className="flex shrink-0 gap-2">
                                <button
                                  type="button"
                                  onClick={() => editEvent(event)}
                                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-brand-blue transition-colors duration-200 hover:bg-blue-100"
                                >
                                  <Edit3 size={16} aria-hidden="true" />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteEvent(event.id)}
                                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-red-600 transition-colors duration-200 hover:bg-red-100"
                                >
                                  <Trash2 size={16} aria-hidden="true" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  NOTICE MANAGEMENT
              ================================================== */}
              {activeManager === "notices" && (
                <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-12">
                  {/* Add / Edit Form */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-blue-50 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-blue">
                          <Bell size={20} aria-hidden="true" />
                        </div>

                        <div>
                          <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-bold uppercase tracking-wide text-brand-blue">
                            Notice Manager
                          </p>

                          <h3 className="font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                            {editingNoticeId ? "Edit Notice" : "Add Notice"}
                          </h3>
                        </div>
                      </div>

                      <form
                        onSubmit={handleNoticeSubmit}
                        className="mt-5 space-y-4"
                      >
                        {/* Day / Month */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="dashboard-notice-day"
                              className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                            >
                              Day
                            </label>

                            <input
                              id="dashboard-notice-day"
                              name="day"
                              type="text"
                              value={noticeForm.day}
                              onChange={handleNoticeChange}
                              placeholder="14"
                              maxLength={2}
                              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="dashboard-notice-month"
                              className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                            >
                              Month
                            </label>

                            <input
                              id="dashboard-notice-month"
                              name="month"
                              type="text"
                              value={noticeForm.month}
                              onChange={handleNoticeChange}
                              placeholder="SEP"
                              maxLength={3}
                              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body uppercase outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <div>
                          <label
                            htmlFor="dashboard-notice-title"
                            className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                          >
                            Notice Title
                          </label>

                          <input
                            id="dashboard-notice-title"
                            name="title"
                            type="text"
                            value={noticeForm.title}
                            onChange={handleNoticeChange}
                            placeholder="Admission 2026-27"
                            maxLength={120}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label
                            htmlFor="dashboard-notice-description"
                            className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                          >
                            Description
                          </label>

                          <textarea
                            id="dashboard-notice-description"
                            name="description"
                            value={noticeForm.description}
                            onChange={handleNoticeChange}
                            rows="4"
                            maxLength={250}
                            placeholder="Enter notice description..."
                            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm md:text-[0.9375rem] lg:text-base leading-7 tracking-normal font-body outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                          />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3 pt-1">
                          <button
                            type="submit"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
                          >
                            {editingNoticeId ? (
                              <Save size={17} aria-hidden="true" />
                            ) : (
                              <Plus size={17} aria-hidden="true" />
                            )}

                            {editingNoticeId ? "Update Notice" : "Add Notice"}
                          </button>

                          {editingNoticeId && (
                            <button
                              type="button"
                              onClick={resetNoticeForm}
                              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-brand-navy transition-colors duration-200 hover:bg-gray-50"
                            >
                              <X size={17} aria-hidden="true" />
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Existing Notices */}
                  <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                          <h3 className="font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                            Existing Notices
                          </h3>

                          <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                            {notices.length} active notice
                            {notices.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>

                      <div>
                        {notices.length === 0 ? (
                          <div className="px-5 py-10 text-center text-sm md:text-[0.9375rem] lg:text-base leading-7 tracking-normal font-body text-text-secondary">
                            No notices available.
                          </div>
                        ) : (
                          notices.map((notice) => (
                            <div
                              key={notice.id}
                              className="flex flex-col gap-4 border-b border-gray-100 p-5 last:border-b-0 sm:flex-row sm:items-start sm:justify-between"
                            >
                              <div className="flex min-w-0 gap-4">
                                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50">
                                  <span className="text-base font-extrabold leading-4 text-brand-navy">
                                    {notice.day}
                                  </span>

                                  <span className="text-[10px] font-bold text-brand-blue">
                                    {notice.month}
                                  </span>
                                </div>

                                <div className="min-w-0">
                                  <h4 className="text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-bold text-brand-navy">
                                    {notice.title}
                                  </h4>

                                  <p className="mt-1 max-w-3xl text-sm md:text-[0.9375rem] lg:text-base leading-7 tracking-normal font-body text-text-secondary">
                                    {notice.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex shrink-0 gap-2 sm:pt-1">
                                <button
                                  type="button"
                                  onClick={() => editNotice(notice)}
                                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-brand-blue transition-colors duration-200 hover:bg-blue-100"
                                >
                                  <Edit3 size={16} aria-hidden="true" />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteNotice(notice.id)}
                                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-red-600 transition-colors duration-200 hover:bg-red-100"
                                >
                                  <Trash2 size={16} aria-hidden="true" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              TOP BAR MANAGEMENT
          ================================================== */}
          <section id="top-bar" className="mt-6 scroll-mt-6 sm:mt-8">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-card">
              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 font-body font-bold uppercase tracking-wide text-brand-blue">
                  Website Announcement
                </p>

                <h2 className="mt-1 font-heading text-xl sm:text-[1.375rem] md:text-2xl lg:text-[1.75rem] xl:text-[1.875rem] 2xl:text-3xl leading-tight tracking-tight font-extrabold text-brand-navy">
                  Top Bar <span className="text-pink-600">Management</span>
                </h2>

                <p className="mt-1 max-w-2xl text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal font-body text-text-secondary">
                  Manage announcements, notices and information shown in the
                  website top bar.
                </p>
              </div>

             
              <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-12">
                {/* Add / Edit Form */}
                <div className="lg:col-span-5 min-w-0">
                  <div className="rounded-2xl bg-green-50 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-600">
                        <Megaphone size={20} aria-hidden="true" />
                      </div>

                      <div>
                        <p className=" text-xs md:text-[0.8125rem] lg:text-sm leading-5 font-body font-bold uppercase tracking-wide text-brand-blue">
                          Top Bar Editor
                        </p>

                        <h3 className="font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                          {editingUtilityId
                            ? "Edit Announcement"
                            : "Add Announcement"}
                        </h3>
                      </div>
                    </div>

                    <form
                      onSubmit={handleUtilitySubmit}
                      className="mt-5 space-y-4"
                    >
                      <div>
                        <label
                          htmlFor="utility-label"
                          className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                        >
                          Label
                        </label>

                        <input
                          id="utility-label"
                          name="label"
                          type="text"
                          value={utilityForm.label}
                          onChange={handleUtilityChange}
                          placeholder="ANNOUNCEMENT"
                          maxLength={30}
                          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body uppercase outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="utility-message"
                          className="mb-1.5 block text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-brand-navy"
                        >
                          Message
                        </label>

                        <input
                          id="utility-message"
                          name="message"
                          type="text"
                          value={utilityForm.message}
                          onChange={handleUtilityChange}
                          placeholder="Admission Open - Session 2026-27"
                          maxLength={150}
                          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                        />
                      </div>

                      {/* Preview */}
                      <div className="rounded-xl bg-brand-navy px-4 py-3">
                        <p className="text-xs leading-5 tracking-normal font-body font-bold uppercase text-white/60">
                          Preview
                        </p>

                        <div className="mt-1 flex items-center gap-2 overflow-hidden whitespace-nowrap">
                          <Megaphone
                            size={16}
                            className="shrink-0 text-pink-400"
                            aria-hidden="true"
                          />

                          <span className="shrink-0 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-extrabold text-pink-400">
                            {utilityForm.label || "ANNOUNCEMENT"}
                          </span>

                          <span className="truncate text-sm md:text-[0.9375rem] lg:text-base leading-6 tracking-normal font-body font-semibold text-white">
                            {utilityForm.message ||
                              "Your announcement will appear here"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-1">
                        <button
                          type="submit"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
                        >
                          {editingUtilityId ? (
                            <Save size={17} aria-hidden="true" />
                          ) : (
                            <Plus size={17} aria-hidden="true" />
                          )}

                          {editingUtilityId ? "Update" : "Add"}
                        </button>

                        {editingUtilityId && (
                          <button
                            type="button"
                            onClick={resetUtilityForm}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-brand-navy transition-colors duration-200 hover:bg-gray-50"
                          >
                            <X size={17} aria-hidden="true" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                {/* Existing Items */}
                <div className="lg:col-span-7 min-w-0">
                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <div className="border-b border-gray-100 px-5 py-4">
                      <h3 className="font-body text-lg sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem] xl:text-2xl leading-snug tracking-tight font-extrabold text-brand-navy">
                        Existing Top Bar Items
                      </h3>

                      <p className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body text-text-secondary">
                        {utilityItems.length} announcement
                        {utilityItems.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    <div>
                      {utilityItems.length === 0 ? (
                        <div className="px-5 py-10 text-center">
                          <Megaphone
                            size={28}
                            className="mx-auto text-gray-300"
                            aria-hidden="true"
                          />

                          <p className="mt-3 text-sm md:text-[0.9375rem] lg:text-base leading-7 tracking-normal font-body text-text-secondary">
                            No top bar announcements available.
                          </p>
                        </div>
                      ) : (
                        utilityItems.map((item) => (
                          <div
                            key={item.id}
                            className="border-b border-gray-100 p-5 last:border-b-0"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex min-w-0 items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                                  <Megaphone size={18} aria-hidden="true" />
                                </div>

                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-extrabold text-pink-600">
                                      {item.label}
                                    </span>

                                    <span className="text-xs text-gray-300">
                                      |
                                    </span>

                                    <span className="text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-semibold text-green-700">
                                      Active
                                    </span>
                                  </div>

                                  <p className="mt-1 max-w-3xl text-sm md:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] leading-7 tracking-normal font-body font-semibold text-brand-navy">
                                    {item.message}
                                  </p>
                                </div>
                              </div>

                              <div className="flex shrink-0 gap-2">
                                <button
                                  type="button"
                                  onClick={() => editUtilityItem(item)}
                                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-brand-blue transition-colors duration-200 hover:bg-blue-100"
                                >
                                  <Edit3 size={16} aria-hidden="true" />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteUtilityItem(item.id)}
                                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 text-sm md:text-[0.9375rem] lg:text-base leading-5 tracking-normal font-body font-bold text-red-600 transition-colors duration-200 hover:bg-red-100"
                                >
                                  <Trash2 size={16} aria-hidden="true" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              SYSTEM INFORMATION
          ================================================== */}
          <section className="mt-6 sm:mt-8">
            <div className="rounded-2xl border border-gray-100 bg-brand-navy p-5 shadow-card sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-gold">
                    <Settings size={21} aria-hidden="true" />
                  </div>

                  <div>
                    <h2 className="font-heading text-xl sm:text-[1.375rem] md:text-2xl lg:text-[1.75rem] xl:text-[1.875rem] 2xl:text-3xl leading-tight tracking-tight font-extrabold text-white">
                      Admin Panel
                    </h2>

                    <p className="mt-1 max-w-2xl text-sm md:text-[0.9375rem] lg:text-base leading-7 tracking-normal font-body text-white/70">
                      Gallery, events, notice board and top bar management are
                      available from the admin dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2 text-xs md:text-[0.8125rem] lg:text-sm leading-5 tracking-normal font-body font-semibold text-green-300">
                  <CheckCircle2 size={17} aria-hidden="true" />
                  System Active
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
