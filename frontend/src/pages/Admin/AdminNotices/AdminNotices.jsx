import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Bell,
  Edit3,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import { readCache, writeCache } from "../../../utils/cache";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SAKSHI_NOTICES_CACHE = "sakshi_notices_cache";

const emptyNotice = {
  day: "",
  month: "",
  title: "",
  description: "",
  displayOrder: 0,
};

function AdminNotices() {
  const [notices, setNotices] = useState(() =>
    readCache("sakshi_notices_cache", []),
  );
  const [noticeForm, setNoticeForm] = useState(emptyNotice);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     FETCH NOTICES
  ========================================================== */

  const fetchNotices = async () => {
    const cachedNotices = readCache("sakshi_notices_cache", []);

    if (!cachedNotices.length) {
      setLoading(true);
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/api/notices`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch notices.");
      }

      const latestNotices = Array.isArray(result.data) ? result.data : [];

      setNotices(latestNotices);
      writeCache("sakshi_notices_cache", latestNotices);
    } catch (error) {
      console.error("Fetch notices error:", error);

      // Cached data stays visible when the API is unavailable.
      if (!cachedNotices.length) {
        setError(error.message || "Failed to load notices.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  /* =========================================================
     HANDLE INPUT
  ========================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNoticeForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  /* =========================================================
     ADD / UPDATE NOTICE
  ========================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !noticeForm.day.trim() ||
      !noticeForm.month.trim() ||
      !noticeForm.title.trim() ||
      !noticeForm.description.trim()
    ) {
      setError("Please fill all notice fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${API_URL}/api/notices/${editingId}`
        : `${API_URL}/api/notices`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: noticeForm.day.trim(),
          month: noticeForm.month.trim().toUpperCase(),
          title: noticeForm.title.trim(),
          description: noticeForm.description.trim(),
          displayOrder: Number(noticeForm.displayOrder) || 0,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save notice.");
      }

      if (isEditing) {
        setNotices((currentNotices) => {
          const updatedNotices = currentNotices
            .map((item) => (item._id === editingId ? result.data : item))
            .sort((a, b) => a.displayOrder - b.displayOrder);

          writeCache("sakshi_notices_cache", updatedNotices);

          return updatedNotices;
        });

        setMessage("Notice updated successfully.");
      } else {
        setNotices((currentNotices) => {
          const updatedNotices = [...currentNotices, result.data].sort(
            (a, b) => a.displayOrder - b.displayOrder,
          );

          writeCache("sakshi_notices_cache", updatedNotices);

          return updatedNotices;
        });

        setMessage("Notice added successfully.");
      }

      resetForm();
    } catch (error) {
      console.error("Save notice error:", error);

      setError(error.message || "Failed to save notice.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     EDIT NOTICE
  ========================================================== */

  const handleEdit = (notice) => {
    setNoticeForm({
      day: notice.day || "",
      month: notice.month || "",
      title: notice.title || "",
      description: notice.description || "",
      displayOrder: notice.displayOrder ?? 0,
    });

    setEditingId(notice._id);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE NOTICE
  ========================================================== */

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this notice?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/api/notices/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete notice.");
      }

      setNotices((currentNotices) => {
        const updatedNotices = currentNotices.filter((item) => item._id !== id);

        writeCache("sakshi_notices_cache", updatedNotices);

        return updatedNotices;
      });

      if (editingId === id) {
        resetForm();
      }

      setMessage("Notice deleted successfully.");
    } catch (error) {
      console.error("Delete notice error:", error);

      setError(error.message || "Failed to delete notice.");
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     RESET FORM
  ========================================================== */

  const resetForm = () => {
    setNoticeForm(emptyNotice);
    setEditingId(null);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-sky-50 font-body">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-gray-100 bg-white">
        <div className="container">
          <div className="flex min-h-16 items-center justify-between gap-4 py-3">
            <div className="min-w-0">
              <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                Content Management
              </p>

              <h1 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl">
                Notices
              </h1>
            </div>

            <Link
              to="/admin/dashboard"
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-body text-sm font-bold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-gray-50 sm:px-4"
            >
              <ArrowLeft size={17} aria-hidden="true" />

              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container">
          {/* Intro */}

          <div className="max-w-2xl">
            <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
              Notice Management
            </p>

            <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
              Manage <span className="text-pink-600">Notices</span>
            </h2>

            <p className="mt-2 font-body text-sm leading-7 tracking-normal text-text-secondary sm:text-base">
              Add, edit, delete and arrange the notices displayed on the school
              website.
            </p>
          </div>

          {/* Alerts */}

          {message && (
            <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 font-body text-sm font-semibold leading-5 text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 font-body text-sm font-semibold leading-5 text-red-700">
              {error}
            </div>
          )}

          {/* =================================================
              ADD / EDIT NOTICE
          ================================================== */}

          <section className="mt-8 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                  <Bell size={22} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                    Notice Editor
                  </p>

                  <h2 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                    {editingId ? "Edit Notice" : "Add Notice"}
                  </h2>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
                {/* Day */}

                <div className="lg:col-span-2">
                  <label
                    htmlFor="notice-day"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Day
                  </label>

                  <input
                    id="notice-day"
                    name="day"
                    type="text"
                    value={noticeForm.day}
                    onChange={handleChange}
                    placeholder="14"
                    maxLength={2}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                {/* Month */}

                <div className="lg:col-span-2">
                  <label
                    htmlFor="notice-month"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Month
                  </label>

                  <input
                    id="notice-month"
                    name="month"
                    type="text"
                    value={noticeForm.month}
                    onChange={handleChange}
                    placeholder="SEP"
                    maxLength={3}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal uppercase outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                {/* Title */}

                <div className="md:col-span-2 lg:col-span-4">
                  <label
                    htmlFor="notice-title"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Notice Title
                  </label>

                  <input
                    id="notice-title"
                    name="title"
                    type="text"
                    value={noticeForm.title}
                    onChange={handleChange}
                    placeholder="Admission 2026-27"
                    maxLength={120}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                {/* Display Order */}

                <div className="lg:col-span-1">
                  <label
                    htmlFor="notice-order"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Order
                  </label>

                  <input
                    id="notice-order"
                    name="displayOrder"
                    type="number"
                    min="0"
                    value={noticeForm.displayOrder}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                {/* Description */}

                <div className="md:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="notice-description"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Description
                  </label>

                  <textarea
                    id="notice-description"
                    name="description"
                    value={noticeForm.description}
                    onChange={handleChange}
                    rows={2}
                    maxLength={500}
                    placeholder="Enter notice description..."
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-body text-sm leading-7 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 font-body text-sm font-bold leading-5 tracking-normal text-white transition-colors duration-200 hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                  ) : editingId ? (
                    <Save size={18} aria-hidden="true" />
                  ) : (
                    <Plus size={18} aria-hidden="true" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Notice"
                      : "Add Notice"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={saving}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 font-body text-sm font-bold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-gray-50 disabled:opacity-60"
                  >
                    <X size={18} aria-hidden="true" />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* =================================================
              EXISTING NOTICES
          ================================================== */}

          <section className="mt-8">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                  Content Library
                </p>

                <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                  Existing <span className="text-pink-600">Notices</span>
                </h2>
              </div>

              {!loading && (
                <p className="font-body text-sm leading-5 tracking-normal text-text-secondary">
                  {notices.length} notice
                  {notices.length === 1 ? "" : "s"}
                </p>
              )}
            </div>

            {loading ? (
              <div className="flex min-h-48 items-center justify-center rounded-3xl border border-gray-100 bg-white shadow-card">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-brand-blue"
                  aria-label="Loading notices"
                />
              </div>
            ) : notices.length === 0 ? (
              <div className="rounded-3xl border border-gray-100 bg-white px-5 py-14 text-center shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                  <Bell size={25} aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-body text-lg font-extrabold leading-snug tracking-tight text-brand-navy">
                  No notices available
                </h3>

                <p className="mx-auto mt-1 max-w-xl font-body text-sm leading-7 tracking-normal text-text-secondary">
                  Add your first notice using the form above.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
                {notices.map((notice) => (
                  <article
                    key={notice._id}
                    className="border-b border-gray-100 p-5 last:border-b-0 sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      {/* Notice Info */}

                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50">
                          <span className="font-body text-lg font-extrabold leading-5 text-brand-navy">
                            {notice.day}
                          </span>

                          <span className="mt-0.5 font-body text-[10px] font-bold uppercase leading-4 tracking-wide text-brand-blue">
                            {notice.month}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-sky-50 px-2.5 py-1 font-body text-xs font-bold leading-5 tracking-normal text-brand-blue">
                              Order {notice.displayOrder}
                            </span>
                          </div>

                          <h3 className="mt-2 break-words font-body text-lg font-extrabold leading-snug tracking-tight text-brand-navy">
                            {notice.title}
                          </h3>

                          <p className="mt-1 max-w-3xl font-body text-sm leading-7 tracking-normal text-text-secondary sm:text-base">
                            {notice.description}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="flex shrink-0 flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(notice)}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 font-body text-sm font-bold leading-5 tracking-normal text-brand-blue transition-colors duration-200 hover:bg-blue-100"
                        >
                          <Edit3 size={16} aria-hidden="true" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(notice._id)}
                          disabled={deletingId === notice._id}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 font-body text-sm font-bold leading-5 tracking-normal text-red-600 transition-colors duration-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === notice._id ? (
                            <LoaderCircle
                              size={16}
                              className="animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <Trash2 size={16} aria-hidden="true" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default AdminNotices;
