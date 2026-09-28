import { useEffect, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  Music2,
  Palette,
  Star,
  Trophy,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { readCache, writeCache } from "../../utils/cache";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const GALLERY_CACHE_KEY = "sakshi_gallery_cache";

const iconStyles = [
  {
    icon: BookOpenIcon,
    colorClass: "bg-pink-100 text-pink-600",
  },
  {
    icon: Camera,
    colorClass: "bg-amber-100 text-amber-600",
  },
  {
    icon: UsersIcon,
    colorClass: "bg-blue-100 text-brand-blue",
  },
  {
    icon: Palette,
    colorClass: "bg-pink-100 text-pink-600",
  },
  {
    icon: Music2,
    colorClass: "bg-green-100 text-green-600",
  },
  {
    icon: Heart,
    colorClass: "bg-purple-100 text-purple-600",
  },
  {
    icon: CalendarIcon,
    colorClass: "bg-amber-100 text-amber-600",
  },
  {
    icon: Palette,
    colorClass: "bg-green-100 text-green-600",
  },
  {
    icon: Star,
    colorClass: "bg-pink-100 text-pink-600",
  },
  {
    icon: Heart,
    colorClass: "bg-purple-100 text-purple-600",
  },
  {
    icon: Camera,
    colorClass: "bg-blue-100 text-brand-blue",
  },
  {
    icon: Trophy,
    colorClass: "bg-amber-100 text-amber-600",
  },
];

const formatGalleryItems = (items, startIndex = 0) => {
  return items.map((item, index) => {
    const style = iconStyles[(startIndex + index) % iconStyles.length];

    return {
      id: item._id,
      title: item.title || "School Moments",
      image: item.imageUrl,
      icon: style.icon,
      colorClass: style.colorClass,
      displayOrder: item.displayOrder ?? 0,
    };
  });
};

const getCachedGallery = () => {
  const cached = readCache(GALLERY_CACHE_KEY, null);

  if (!cached || !Array.isArray(cached.items)) {
    return {
      items: [],
      pagination: null,
    };
  }

  return cached;
};

function BookOpenIcon({ size = 20, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 4h7a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H2z" />
      <path d="M22 4h-7a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h7z" />
    </svg>
  );
}

function UsersIcon({ size = 20, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon({ size = 20, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function Gallery() {
  const cachedGallery = getCachedGallery();
  const cachedItems = formatGalleryItems(cachedGallery.items);

  const [galleryItems, setGalleryItems] = useState(cachedItems);
  const [currentPage, setCurrentPage] = useState(
    cachedGallery.pagination?.page || 1,
  );
  const [hasNextPage, setHasNextPage] = useState(
    cachedGallery.pagination?.hasNextPage ?? false,
  );
  const [loading, setLoading] = useState(cachedItems.length === 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchInitialGallery = async () => {
      try {
        if (cachedItems.length === 0) {
          setLoading(true);
        }

        setError("");

        const response = await fetch(`${API_URL}/api/gallery?page=1&limit=12`);

        if (!response.ok) {
          throw new Error("Failed to fetch gallery images.");
        }

        const result = await response.json();

        const galleryData = Array.isArray(result) ? result : result.data || [];

        setGalleryItems(formatGalleryItems(galleryData));
        setCurrentPage(result.pagination?.page || 1);
        setHasNextPage(result.pagination?.hasNextPage ?? false);

        writeCache(GALLERY_CACHE_KEY, {
          items: galleryData,
          pagination: result.pagination || {
            page: 1,
            limit: 12,
            hasNextPage: false,
          },
        });
      } catch (fetchError) {
        console.error("Gallery fetch error:", fetchError);

        // Cached/default content stays visible when the API fails.
        if (cachedItems.length === 0) {
          setError("Unable to load gallery images.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialGallery();
    // The cache is intentionally read once when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore || !hasNextPage) {
      return;
    }

    try {
      setLoadingMore(true);
      setError("");

      const nextPage = currentPage + 1;

      const response = await fetch(
        `${API_URL}/api/gallery?page=${nextPage}&limit=12`,
      );

      if (!response.ok) {
        throw new Error("Failed to load more gallery images.");
      }

      const result = await response.json();

      const galleryData = Array.isArray(result) ? result : result.data || [];

      const newItems = formatGalleryItems(galleryData, galleryItems.length);

      setGalleryItems((currentItems) => [...currentItems, ...newItems]);
      setCurrentPage(result.pagination?.page || nextPage);
      setHasNextPage(result.pagination?.hasNextPage ?? false);

      const cachedGalleryData = getCachedGallery();

      writeCache(GALLERY_CACHE_KEY, {
        items: [...(cachedGalleryData.items || []), ...galleryData],
        pagination: result.pagination || {
          page: nextPage,
          limit: 12,
          hasNextPage: false,
        },
      });
    } catch (fetchError) {
      console.error("Load more gallery error:", fetchError);
      setError("Unable to load more gallery images.");
    } finally {
      setLoadingMore(false);
    }
  };

  const selectedImageIndex = selectedImage
    ? galleryItems.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const handlePreviousImage = () => {
    if (selectedImageIndex < 0 || galleryItems.length < 2) return;

    const previousIndex =
      (selectedImageIndex - 1 + galleryItems.length) % galleryItems.length;

    setSelectedImage(galleryItems[previousIndex]);
  };

  const handleNextImage = () => {
    if (selectedImageIndex < 0 || galleryItems.length < 2) return;

    const nextIndex = (selectedImageIndex + 1) % galleryItems.length;

    setSelectedImage(galleryItems[nextIndex]);
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowLeft") {
        handlePreviousImage();
      }

      if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  });

  return (
    <main className="overflow-hidden bg-white font-sans">
      {/* =====================================================
          GALLERY HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-sky-50">
        <div className="container">
          <div className="grid items-center gap-6 lg:min-h-96 lg:grid-cols-12">
            {/* Hero Content */}
            <div className="relative z-10 py-10 sm:py-14 lg:col-span-6 lg:py-16">
              {/* Heading */}
              <div className="relative mt-2 w-fit">
                <h1 className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="text-brand-navy">G</span>
                  <span className="text-pink-600">a</span>
                  <span className="text-brand-navy">l</span>
                  <span className="text-pink-600">l</span>
                  <span className="text-brand-navy">e</span>
                  <span className="text-pink-600">r</span>
                  <span className="text-brand-navy">y</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-text-secondary sm:text-lg">
                A glimpse of our little learners, big moments and happy memories
                at Sakshi Play School.
              </p>

              {/* Breadcrumb */}
              <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                <Link
                  to="/"
                  className="text-brand-blue transition-colors duration-200 hover:text-brand-navy"
                >
                  Home
                </Link>

                <span className="text-text-secondary">/</span>

                <span className="text-brand-navy">Gallery</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative min-h-72 sm:min-h-80 lg:col-span-6 lg:min-h-96">
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <img
                  src="/images/gallery/gallery-hero.webp"
                  alt="Happy child at Sakshi Play School"
                  className="h-full w-full border-0 object-cover"
                  loading="eager"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-r from-sky-50 via-sky-30 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div
          aria-hidden="true"
          className="h-1 w-full rounded-b-full bg-linear-to-r from-pink-500 via-brand-gold to-brand-blue"
        />
      </section>

      {/* =====================================================
          GALLERY GRID
      ====================================================== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="container">
          {/* Loading */}
          {loading && (
            <div className="flex min-h-48 items-center justify-center">
              <p className="text-sm font-medium text-text-secondary">
                Loading gallery...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && galleryItems.length === 0 && (
            <div className="flex min-h-48 items-center justify-center">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && galleryItems.length === 0 && (
            <div className="flex min-h-48 items-center justify-center">
              <p className="text-sm font-medium text-text-secondary">
                No gallery photos available.
              </p>
            </div>
          )}

          {/* Gallery Cards */}
          {!loading && galleryItems.length > 0 && (
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {galleryItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
                  >
                    {/* Image */}
                    <button
                      type="button"
                      onClick={() => setSelectedImage(item)}
                      className="relative block aspect-4/3 w-full overflow-hidden text-left"
                      aria-label={`View ${item.title}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Image Overlay */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-t from-brand-navy/20 via-transparent to-transparent"
                      />
                    </button>

                    {/* Card Footer */}
                    <div className="flex items-center gap-3 px-4 py-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.colorClass}`}
                      >
                        <Icon size={19} strokeWidth={2} aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold leading-5 text-brand-navy">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="h-1 bg-linear-to-r from-pink-500 via-brand-gold to-brand-blue" />
                  </article>
                );
              })}
            </div>
          )}

          {/* Inline Error */}
          {!loading && error && galleryItems.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}

          {/* Load More */}
          {!loading && !error && hasNextPage && (
            <div className="mt-9 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-pink-600 px-7 text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-pink-700 hover:shadow-button-hover disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Camera size={17} aria-hidden="true" />
                {loadingMore ? "Loading..." : "Load More Photos"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          HAPPY BEGINNING
      ====================================================== */}
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div className="container">
          <div className="relative justify-center overflow-hidden rounded-3xl bg-pink-200 text-center sm:py-10">
            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl lg:text-4xl">
              A Happy Beginning for a{" "}
              <span className="text-pink-600">Brighter Future</span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-6 text-text-secondary sm:text-base">
              At Sakshi Play School, we believe every child deserves the right
              environment to learn, grow and shine. Join us in this beautiful
              journey of early learning.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMAGE LIGHTBOX
      ====================================================== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-md transition-colors hover:bg-white"
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>

            {/* Previous */}
            {galleryItems.length > 1 && (
              <button
                type="button"
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-md transition-all hover:scale-105 hover:bg-white sm:left-4"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next */}
            {galleryItems.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-md transition-all hover:scale-105 hover:bg-white sm:right-4"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image Preview */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-floating">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[80vh] w-full object-contain"
              />

              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="min-w-0 text-base font-extrabold text-brand-navy">
                    {selectedImage.title}
                  </h3>

                  <span className="shrink-0 text-xs font-semibold text-text-secondary">
                    {selectedImageIndex + 1} / {galleryItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Gallery;
