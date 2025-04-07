import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import "./Pet.css";

// Default image based on pet type
const getDefaultImage = (type) => {
  switch (type?.toLowerCase()) {
    case "dog":
      return "/assets/dog.jpg";
    case "cat":
      return "/assets/cat.png";
    default:
      return "/assets/com.png";
  }
};

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    state: "",
    city: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPets = () => {
      setIsLoading(true);
      const petsRef = ref(database, "pets");
      onValue(petsRef, (snapshot) => {
        const data = snapshot.val();
        const petsList = [];

        for (let key in data) {
          petsList.push({ id: key, ...data[key] });
        }

        // Apply filters
        const filteredPets = petsList.filter((pet) => {
          return (
            (filters.type === "" || pet.type?.toLowerCase() === filters.type.toLowerCase()) &&
            (filters.state === "" || pet.location?.toLowerCase().includes(filters.state.toLowerCase())) &&
            (filters.city === "" || pet.location?.toLowerCase().includes(filters.city.toLowerCase()))
          );
        });

        setPets(filteredPets);
        setIsLoading(false);
      });
    };

    fetchPets();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pet-container">
      {/* Filter Sidebar */}
      <aside className="filter-box">
        <h3>Filter by:</h3>
        <div className="form-group">
          <label htmlFor="type">Pet Type:</label>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            id="state"
            value={filters.state}
            onChange={handleFilterChange}
            placeholder="Enter state"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            value={filters.city}
            onChange={handleFilterChange}
            placeholder="Enter city"
          />
        </div>
      </aside>

      {/* Pets Listing */}
      <main className="pets-list">
        <h1>Pets Available for Adoption</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : pets.length > 0 ? (
          pets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <img
                src={pet.imageURL || getDefaultImage(pet.type)}
                alt={pet.name}
                className="pet-image"
              />
              <h3>{pet.name}</h3>
              <p><b>Type:</b> {pet.type}</p>
              <p><b>Age:</b> {pet.age}</p>
              <p><b>Location:</b> {pet.location}</p>
              <p><b>Contact:</b> {pet.phone}</p>
            </div>
          ))
        ) : (
          <p>No pets found.</p>
        )}
      </main>
    </div>
  );
};

export default Pet;
