import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Facilities from "../pages/Facilities/Facilities";
import Admission from "../pages/Admission/Admission";
import Gallery from "../pages/Gallery/Gallery";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/facilities" element={<Facilities />} />

      <Route path="/admission" element={<Admission />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default AppRoutes;
