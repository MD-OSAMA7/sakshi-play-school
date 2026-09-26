import galleryStripData from "../../data/galleryStripData";

function GalleryStrip() {
  return (
    <section id="gallery" className="bg-white md:py-8 lg:py-10">
      <div className="container">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        
          {galleryStripData.slice(0, 2).map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl">
              <img
                src={item.image}
                alt={item.alt}
                className="aspect-video h-35 w-full object-cover"
              />
            </div>
          ))}

          {/* Center Message */}
          <div className="order-first col-span-2 flex min-h-32 items-center justify-center rounded-2xl bg-white px-4 py-5 text-center md:order-0 md:col-span-2 lg:col-span-1">
            <div className="relative">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-xl">
                <span className="block text-pink-600 ">
                  <span className="inline-block -rotate-4 mr-1 ">Happy</span>
                  <span className="inline-block rotate-0.5 -translate-y-0.5">
                    Children
                  </span>
                </span>

                <span className="block -rotate-3">Brighter Future</span>
              </h2>

              <div className="mx-auto mt-1 -rotate-4 h-1 w-12 rounded-full bg-brand-gold" />
            </div>
          </div>

          {galleryStripData.slice(2).map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl">
              <img
                src={item.image}
                alt={item.alt}
                className="aspect-video h-35 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryStrip;
