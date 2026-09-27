import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Facilities from "../pages/Facilities/Facilities";
import Admission from "../pages/Admission/Admission";
import Gallery from "../pages/Gallery/Gallery";

import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC WEBSITE ROUTES
      ====================================================== */}
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/facilities" element={<Facilities />} />

      <Route path="/admission" element={<Admission />} />

      <Route path="/gallery" element={<Gallery />} />

      {/* =====================================================
          ADMIN ROUTES
      ====================================================== */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
