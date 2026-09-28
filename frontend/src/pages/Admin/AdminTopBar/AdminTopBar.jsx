import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Edit3,
  LoaderCircle,
  Megaphone,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyUtilityItem = {
  label: "",
  message: "",
  displayOrder: 0,
};

function AdminTopBar() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyUtilityItem);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     FETCH TOP BAR ITEMS
  ========================================================== */

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/utility`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch top bar items.");
      }

      setItems(result.data);
    } catch (error) {
      console.error("Fetch top bar error:", error);

      setError(error.message || "Failed to load top bar items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* =========================================================
     HANDLE INPUT
  ========================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  /* =========================================================
     ADD / UPDATE
  ========================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.label.trim() || !form.message.trim()) {
      setError("Please fill label and message.");

      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${API_URL}/api/utility/${editingId}`
        : `${API_URL}/api/utility`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: form.label.trim(),
          message: form.message.trim(),
          displayOrder: Number(form.displayOrder) || 0,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save top bar item.");
      }

      if (isEditing) {
        setItems((currentItems) =>
          currentItems
            .map((item) => (item._id === editingId ? result.data : item))
            .sort((a, b) => a.displayOrder - b.displayOrder),
        );

        setMessage("Top bar item updated successfully.");
      } else {
        setItems((currentItems) =>
          [...currentItems, result.data].sort(
            (a, b) => a.displayOrder - b.displayOrder,
          ),
        );

        setMessage("Top bar item added successfully.");
      }

      resetForm();
    } catch (error) {
      console.error("Save top bar error:", error);

      setError(error.message || "Failed to save top bar item.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     EDIT
  ========================================================== */

  const handleEdit = (item) => {
    setForm({
      label: item.label || "",
      message: item.message || "",
      displayOrder: item.displayOrder ?? 0,
    });

    setEditingId(item._id);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE
  ========================================================== */

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this top bar item?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/api/utility/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete top bar item.");
      }

      setItems((currentItems) =>
        currentItems.filter((item) => item._id !== id),
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage("Top bar item deleted successfully.");
    } catch (error) {
      console.error("Delete top bar error:", error);

      setError(error.message || "Failed to delete top bar item.");
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     RESET
  ========================================================== */

  const resetForm = () => {
    setForm(emptyUtilityItem);
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
                Website Management
              </p>

              <h1 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl">
                Top Bar
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
          <div className="max-w-2xl">
            <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
              Announcement Management
            </p>

            <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
              Manage <span className="text-pink-600">Top Bar</span>
            </h2>

            <p className="mt-2 font-body text-sm leading-7 tracking-normal text-text-secondary sm:text-base">
              Add, edit, delete and arrange the announcements displayed in the
              website top bar.
            </p>
          </div>

          {/* =================================================
              ALERTS
          ================================================== */}

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
              ADD / EDIT FORM
          ================================================== */}

          <section className="mt-8 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <Megaphone size={22} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                    Top Bar Editor
                  </p>

                  <h2 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                    {editingId ? "Edit Announcement" : "Add Announcement"}
                  </h2>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
                {/* Label */}

                <div className="lg:col-span-3">
                  <label
                    htmlFor="top-bar-label"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Label
                  </label>

                  <input
                    id="top-bar-label"
                    name="label"
                    type="text"
                    value={form.label}
                    onChange={handleChange}
                    placeholder="ANNOUNCEMENT"
                    maxLength={30}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm uppercase leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                {/* Message */}

                <div className="md:col-span-2 lg:col-span-7">
                  <label
                    htmlFor="top-bar-message"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Message
                  </label>

                  <input
                    id="top-bar-message"
                    name="message"
                    type="text"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Admission Open - Session 2026-27"
                    maxLength={150}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                {/* Order */}

                <div className="lg:col-span-2">
                  <label
                    htmlFor="top-bar-order"
                    className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                  >
                    Order
                  </label>

                  <input
                    id="top-bar-order"
                    name="displayOrder"
                    type="number"
                    min="0"
                    value={form.displayOrder}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              </div>

              {/* Preview */}

              <div className="mt-6 overflow-hidden rounded-xl bg-brand-navy px-4 py-3">
                <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-white/60">
                  Preview
                </p>

                <div className="mt-1 flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap">
                  <Megaphone
                    size={16}
                    className="shrink-0 text-pink-400"
                    aria-hidden="true"
                  />

                  <span className="shrink-0 font-body text-xs font-extrabold leading-5 tracking-normal text-pink-400">
                    {form.label || "ANNOUNCEMENT"}
                  </span>

                  <span className="min-w-0 truncate font-body text-sm font-semibold leading-6 tracking-normal text-white">
                    {form.message || "Your announcement will appear here"}
                  </span>
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

                  {saving ? "Saving..." : editingId ? "Update" : "Add"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={saving}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 font-body text-sm font-bold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-gray-50"
                  >
                    <X size={18} aria-hidden="true" />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* =================================================
              EXISTING ITEMS
          ================================================== */}

          <section className="mt-8">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                  Content Library
                </p>

                <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                  Existing <span className="text-pink-600">Announcements</span>
                </h2>
              </div>

              {!loading && (
                <p className="font-body text-sm leading-5 tracking-normal text-text-secondary">
                  {items.length} announcement
                  {items.length === 1 ? "" : "s"}
                </p>
              )}
            </div>

            {loading ? (
              <div className="flex min-h-48 items-center justify-center rounded-3xl border border-gray-100 bg-white shadow-card">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-brand-blue"
                  aria-label="Loading top bar items"
                />
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-3xl border border-gray-100 bg-white px-5 py-14 text-center shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <Megaphone size={25} aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-body text-lg font-extrabold leading-snug tracking-tight text-brand-navy">
                  No announcements available
                </h3>

                <p className="mx-auto mt-1 max-w-xl font-body text-sm leading-7 tracking-normal text-text-secondary">
                  Add your first top bar announcement using the form above.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
                {items.map((item) => (
                  <article
                    key={item._id}
                    className="border-b border-gray-100 p-5 last:border-b-0 sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                          <Megaphone size={19} aria-hidden="true" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-pink-50 px-2.5 py-1 font-body text-xs font-extrabold leading-5 tracking-normal text-pink-600">
                              {item.label}
                            </span>

                            <span className="rounded-full bg-sky-50 px-2.5 py-1 font-body text-xs font-bold leading-5 tracking-normal text-brand-blue">
                              Order {item.displayOrder}
                            </span>
                          </div>

                          <p className="mt-2 max-w-3xl break-words font-body text-base font-semibold leading-7 tracking-normal text-brand-navy sm:text-lg">
                            {item.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 font-body text-sm font-bold leading-5 tracking-normal text-brand-blue transition-colors duration-200 hover:bg-blue-100"
                        >
                          <Edit3 size={16} aria-hidden="true" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 font-body text-sm font-bold leading-5 tracking-normal text-red-600 transition-colors duration-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === item._id ? (
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

export default AdminTopBar;
