import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pets from "./pages/Pets";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <div>
        {/* Permanent Navbar */}
        <Header />
        <main>
          {/* Define all routes here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
