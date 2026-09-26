import Hero from "../../sections/hero/Hero";
import Features from "../../sections/features/Features";
import PortalSection from "../../sections/portal/PortalSection";
import About from "../../sections/about/About";
import Programs from "../../sections/programs/Programs";
import GalleryStrip from "../../sections/gallery/GalleryStrip";
import AdmissionBanner from "../../sections/admission/AdmissionBanner";

function Home() {
  return (
    <main>
      <Hero />

      <Features />

      <PortalSection />

      <About />

      <Programs />

      <GalleryStrip />

      <AdmissionBanner />
    </main>
  );
}

export default Home;