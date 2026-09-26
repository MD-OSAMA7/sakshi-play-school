import UtilityBar from "./components/common/UtilityBar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton";
import ScrollToTop from "./components/common/ScrollToTop";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <ScrollToTop />

      <UtilityBar />

      <Navbar />

      <AppRoutes />

      <Footer />

      <WhatsAppButton />
    </>
  );
}

export default App;
