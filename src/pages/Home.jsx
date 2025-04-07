import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleAdoptPetClick = () => {
    navigate("/pets");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>
            Your Pets <span className="highlight">Are Our Priority</span>
          </h1>
          <p>
            Pet adoption is a way to give homeless animals a second chance at life. 
            By adopting, you provide a loving home to a pet in need and gain a loyal 
            friend for life.
          </p>
          <p>
            It’s a simple act of kindness that benefits both you and the pet. For animals, 
            it means safety, care, and a family. For adopters, it brings joy, companionship, 
            and unconditional love.
          </p>
          <p>
            Adoption helps reduce overcrowded shelters and supports a kinder, more caring 
            community. Open your heart and home every paw deserves love and a happy life.
          </p>
          <button className="btn-primary" onClick={handleAdoptPetClick}>
            Adopt a Pet
          </button>
        </div>
        <div className="hero-image">
          <img
            src="/assets/img.jpg" 
            alt="pet"
            className="pet-image"
          />
        </div>
      </header>

      {/* Information Section */}
      <section className="info-section">
        <div className="info-content">
          <h2>1.2k+ Furry Friends</h2>
          <p>Living Their Best Lives</p>
        </div>
        <div className="info-details">
          <h3>What We Do?</h3>
          <p>
            With a focus on matching the right pet with the right family, PawFinds
            makes it easy to adopt love and foster happiness.
          </p>
        </div>
        <div className="info-image">
          <img
            src="/assets/logo.png"
            alt="Happy pets"
            className="info-img"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
