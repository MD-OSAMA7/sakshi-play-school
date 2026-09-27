import { useLocation } from "react-router-dom";

import UtilityBar from "./components/common/UtilityBar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton";
import ScrollToTop from "./components/common/ScrollToTop";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {/* Public Website Header */}
      {!isAdminPage && (
        <>
          <UtilityBar />
          <Navbar />
        </>
      )}

      <AppRoutes />

      {/* Public Website Footer */}
      {!isAdminPage && (
        <>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}

export default App;
