import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Facilities from "../pages/Facilities/Facilities";
import Admission from "../pages/Admission/Admission";
import Gallery from "../pages/Gallery/Gallery";

import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AdminGallery from "../pages/Admin/AdminGallery/AdminGallery";
import AdminEvents from "../pages/Admin/AdminEvents/AdminEvents";
import AdminNotices from "../pages/Admin/AdminNotices/AdminNotices";
import AdminTopBar from "../pages/Admin/AdminTopBar/AdminTopBar";

import ProtectedAdminRoute from "./ProtectedAdminRoute";

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
          ADMIN LOGIN
      ====================================================== */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* =====================================================
          PROTECTED ADMIN ROUTES
      ====================================================== */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/gallery" element={<AdminGallery />} />

        <Route path="/admin/events" element={<AdminEvents />} />

        <Route path="/admin/notices" element={<AdminNotices />} />

        <Route path="/admin/top-bar" element={<AdminTopBar />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
