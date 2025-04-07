import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Function to handle button click
  const handlePetGiveClick = () => {
    navigate("/services"); // Navigate to the /services page
  };

  return (
    <header className="header">
      <div className="logo">
        {/* Logo with text */}
        <img
          src="/assets/logo.png" // Example logo URL
          alt="Logo"
          className="logo-image"
        />
        <span className="logo-text">HAPPYPAWS</span>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/pets" className={({ isActive }) => (isActive ? "active" : "")}>
              Pets
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Call-to-action button with click handler */}
      <button className="cta-button" onClick={handlePetGiveClick}>
        Give a Pet
      </button>
    </header>
  );
}

export default Header;
