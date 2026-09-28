import { useCallback, useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  Edit3,
  Image as ImageIcon,
  LoaderCircle,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { useAuth } from "@clerk/react";

import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminGallery() {
  const { getToken } = useAuth();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");

  const [editingImageId, setEditingImageId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editOrder, setEditOrder] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sortImages = (items) => {
    return [...items].sort(
      (a, b) =>
        Number(a.displayOrder ?? 0) - Number(b.displayOrder ?? 0) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  };

  /* =========================================================
     FETCH GALLERY
  ========================================================== */

  const fetchGalleryPage = useCallback(async (page, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        `${API_URL}/api/gallery?page=${page}&limit=12`,
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch gallery images.");
      }

      const pageImages = sortImages(result.data || []);

      setImages((currentImages) =>
        append ? sortImages([...currentImages, ...pageImages]) : pageImages,
      );

      setCurrentPage(result.pagination?.page || page);
      setHasNextPage(result.pagination?.hasNextPage ?? false);
    } catch (error) {
      console.error("Gallery fetch error:", error);
      setError(error.message || "Failed to load gallery images.");
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchGalleryPage(1);
  }, [fetchGalleryPage]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasNextPage) {
      return;
    }

    await fetchGalleryPage(currentPage + 1, true);
  };

  /* =========================================================
     IMAGE PREVIEW
  ========================================================== */

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  /* =========================================================
     FILE SELECT
  ========================================================== */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setSelectedFile(file);
    setError("");
    setMessage("");
  };

  /* =========================================================
     UPLOAD IMAGE
  ========================================================== */

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }

    if (
      displayOrder !== "" &&
      (!Number.isInteger(Number(displayOrder)) || Number(displayOrder) < 1)
    ) {
      setError("Display order must be a positive number.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      const formData = new FormData();

      formData.append("image", selectedFile);
      formData.append("title", title.trim());

      if (displayOrder !== "") {
        formData.append("displayOrder", displayOrder);
      }

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch(`${API_URL}/api/gallery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Image upload failed.");
      }

      await fetchGalleryPage(1);

      setSelectedFile(null);
      setTitle("");
      setDisplayOrder("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setMessage("Image uploaded successfully.");
    } catch (error) {
      console.error("Gallery upload error:", error);
      setError(error.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  /* =========================================================
     EDIT IMAGE DETAILS
  ========================================================== */

  const startEdit = (image) => {
    setEditingImageId(image._id);
    setEditTitle(image.title || "");
    setEditOrder(String(image.displayOrder ?? ""));
    setError("");
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingImageId(null);
    setEditTitle("");
    setEditOrder("");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!Number.isInteger(Number(editOrder)) || Number(editOrder) < 1) {
      setError("Display order must be a positive number.");
      return;
    }

    try {
      setSavingEdit(true);
      setError("");
      setMessage("");

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch(`${API_URL}/api/gallery/${editingImageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          displayOrder: Number(editOrder),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gallery image update failed.");
      }

      await fetchGalleryPage(1);

      setMessage("Image details updated successfully.");
      cancelEdit();
    } catch (error) {
      console.error("Gallery update error:", error);
      setError(error.message || "Gallery image update failed.");
    } finally {
      setSavingEdit(false);
    }
  };

  /* =========================================================
     DELETE IMAGE
  ========================================================== */

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Image deletion failed.");
      }

      setImages((currentImages) =>
        currentImages.filter((image) => image._id !== id),
      );

      if (editingImageId === id) {
        cancelEdit();
      }

      setMessage("Image deleted successfully.");
    } catch (error) {
      console.error("Gallery delete error:", error);
      setError(error.message || "Image deletion failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-sky-50 font-body">
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
                Gallery
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

      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container">
          {/* Intro */}
          <div className="max-w-2xl">
            <h2 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
              Manage <span className="text-pink-600">School Gallery</span>
            </h2>

            <p className="mt-2 font-body text-sm leading-7 tracking-normal text-text-secondary sm:text-base">
              Upload school photos to Cloudinary and manage them from one place.
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

          {/* Upload */}
          <section className="mt-8 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
              <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                Gallery Upload
              </p>

              <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                Add New <span className="text-pink-600">Image</span>
              </h2>
            </div>

            <form
              onSubmit={handleUpload}
              className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-12"
            >
              {/* Upload Box */}
              <div className="min-w-0 lg:col-span-7">
                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="gallery-image"
                  />

                  {!selectedFile ? (
                    <label
                      htmlFor="gallery-image"
                      className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl px-4 py-8 text-center transition-colors duration-200 hover:bg-white"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                        <Upload size={25} aria-hidden="true" />
                      </div>

                      <h3 className="mt-4 font-body text-lg font-extrabold leading-snug tracking-tight text-brand-navy">
                        Choose an image
                      </h3>

                      <p className="mt-1 max-w-xl font-body text-sm leading-7 tracking-normal text-text-secondary">
                        JPG, PNG or WebP. Maximum file size is 5 MB.
                      </p>

                      <span className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-navy px-4 font-body text-sm font-bold leading-5 tracking-normal text-white">
                        Select Image
                      </span>
                    </label>
                  ) : (
                    <div className="relative overflow-hidden rounded-xl bg-white">
                      <img
                        src={previewUrl}
                        alt="Selected preview"
                        className="h-64 w-full object-cover sm:h-80"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setError("");

                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        aria-label="Remove selected image"
                      >
                        <X size={18} aria-hidden="true" />
                      </button>

                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12">
                        <p className="truncate font-body text-sm font-semibold leading-5 text-white">
                          {selectedFile.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="min-w-0 lg:col-span-5">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="gallery-title"
                      className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                    >
                      Image Title
                    </label>

                    <input
                      id="gallery-title"
                      type="text"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Annual Function"
                      maxLength={120}
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gallery-order"
                      className="mb-1.5 block font-body text-sm font-semibold leading-6 tracking-normal text-brand-navy"
                    >
                      Display Order
                    </label>

                    <input
                      id="gallery-order"
                      type="number"
                      min="1"
                      step="1"
                      value={displayOrder}
                      onChange={(event) => setDisplayOrder(event.target.value)}
                      placeholder="1"
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 font-body text-sm leading-6 tracking-normal outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                    />

                    <p className="mt-1 font-body text-xs leading-5 tracking-normal text-text-secondary">
                      Smaller number appears earlier in the gallery.
                    </p>
                  </div>

                  <div className="rounded-xl bg-sky-50 p-4">
                    <div className="flex items-start gap-3">
                      <ImageIcon
                        size={20}
                        className="mt-0.5 shrink-0 text-brand-blue"
                        aria-hidden="true"
                      />

                      <div>
                        <p className="font-body text-sm font-bold leading-6 text-brand-navy">
                          Storage
                        </p>

                        <p className="mt-1 font-body text-xs leading-5 tracking-normal text-text-secondary">
                          The image will be uploaded to Cloudinary and its URL
                          will be stored in MongoDB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 font-body text-sm font-bold leading-5 tracking-normal text-white transition-colors duration-200 hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploading ? (
                      <>
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={18} aria-hidden="true" />
                        Upload Image
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Existing Images */}
          <section className="mt-8">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-body text-xs font-bold uppercase leading-5 tracking-wide text-brand-blue">
                  Media Library
                </p>

                <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-2xl">
                  Existing <span className="text-pink-600">Images</span>
                </h2>
              </div>

              {!loading && (
                <p className="font-body text-sm leading-5 tracking-normal text-text-secondary">
                  {images.length} image{images.length === 1 ? "" : "s"} loaded
                </p>
              )}
            </div>

            {loading ? (
              <div className="flex min-h-48 items-center justify-center rounded-3xl border border-gray-100 bg-white shadow-card">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-brand-blue"
                  aria-label="Loading gallery"
                />
              </div>
            ) : images.length === 0 ? (
              <div className="rounded-3xl border border-gray-100 bg-white px-5 py-14 text-center shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <ImageIcon size={25} aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-body text-lg font-extrabold leading-snug tracking-tight text-brand-navy">
                  No gallery images
                </h3>

                <p className="mx-auto mt-1 max-w-xl font-body text-sm leading-7 tracking-normal text-text-secondary">
                  Upload your first school image using the form above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {images.map((image) => (
                  <article
                    key={image._id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                      <img
                        src={image.imageUrl}
                        alt={image.title || "School gallery"}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute left-3 top-3 inline-flex min-h-8 items-center rounded-full bg-brand-navy/85 px-3 font-body text-xs font-bold leading-5 tracking-normal text-white backdrop-blur-sm">
                        Order {image.displayOrder}
                      </div>

                      <button
                        type="button"
                        onClick={() => startEdit(image)}
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors duration-200 hover:bg-blue-700"
                        aria-label={`Edit ${image.title || "image"}`}
                      >
                        <Edit3 size={17} aria-hidden="true" />
                      </button>
                    </div>

                    <div className="p-4">
                      {editingImageId === image._id ? (
                        <form onSubmit={handleUpdate} className="space-y-3">
                          <div>
                            <label
                              htmlFor={`edit-title-${image._id}`}
                              className="mb-1 block font-body text-xs font-semibold leading-5 tracking-normal text-brand-navy"
                            >
                              Title
                            </label>

                            <input
                              id={`edit-title-${image._id}`}
                              type="text"
                              value={editTitle}
                              onChange={(event) =>
                                setEditTitle(event.target.value)
                              }
                              maxLength={120}
                              className="h-10 w-full rounded-lg border border-gray-300 px-3 font-body text-sm leading-5 tracking-normal outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`edit-order-${image._id}`}
                              className="mb-1 block font-body text-xs font-semibold leading-5 tracking-normal text-brand-navy"
                            >
                              Display Order
                            </label>

                            <input
                              id={`edit-order-${image._id}`}
                              type="number"
                              min="1"
                              step="1"
                              value={editOrder}
                              onChange={(event) =>
                                setEditOrder(event.target.value)
                              }
                              className="h-10 w-full rounded-lg border border-gray-300 px-3 font-body text-sm leading-5 tracking-normal outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            <button
                              type="submit"
                              disabled={savingEdit}
                              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-brand-navy px-3 font-body text-sm font-bold leading-5 tracking-normal text-white transition-colors hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {savingEdit ? (
                                <LoaderCircle
                                  size={16}
                                  className="animate-spin"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Save size={16} aria-hidden="true" />
                              )}
                              Save
                            </button>

                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-body text-sm font-bold leading-5 tracking-normal text-brand-navy transition-colors hover:bg-gray-50"
                            >
                              <X size={16} aria-hidden="true" />
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <h3 className="truncate font-body text-base font-bold leading-6 tracking-tight text-brand-navy">
                            {image.title || "Untitled Image"}
                          </h3>

                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(image)}
                              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 font-body text-sm font-bold leading-5 tracking-normal text-brand-blue transition-colors duration-200 hover:bg-blue-100"
                            >
                              <Edit3 size={16} aria-hidden="true" />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(image._id)}
                              disabled={deletingId === image._id}
                              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 font-body text-sm font-bold leading-5 tracking-normal text-red-600 transition-colors duration-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingId === image._id ? (
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
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && images.length > 0 && hasNextPage && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 font-body text-sm font-bold leading-5 tracking-normal text-white transition-colors hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore ? (
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <ImageIcon size={17} aria-hidden="true" />
                  )}

                  {loadingMore ? "Loading..." : "Load More Images"}
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default AdminGallery;
