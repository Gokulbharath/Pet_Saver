import { useState } from "react";
import "./Services.css";
import { database, storage } from "../firebase";
import { ref as dbRef, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

function Services() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    type: "none",
    justification: "",
    email: "",
    phone: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = "";

      if (imageFile) {
        const imgRef = storageRef(storage, `petImages/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imgRef, imageFile);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      const dataToPush = { ...formData, imageURL };

      const newEntry = dbRef(database, "pets");
      await push(newEntry, dataToPush);

      alert("Pet submitted successfully!");

      setFormData({
        name: "",
        age: "",
        location: "",
        type: "none",
        justification: "",
        email: "",
        phone: ""
      });

      setImageFile(null);
      document.getElementById("picture").value = "";
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to submit pet.");
    }
  };

  return (
    <div className="services-container">
      <header className="welcome-section">
        <img src="/assets/lov.jpg" alt="Pet Adoption" className="landscape-image" />
      </header>

      <div className="content-container">
        <div className="left-content">
          <section className="benefits-section">
            <img src="/assets/adop.png" alt="pet" className="pet-image" />
          </section>

          <section className="process-section">
            <h2>Adoption Process</h2>
            <ul>
              <li>Fill Out an Application</li>
              <li>Meet Pets</li>
              <li>Complete Paperwork</li>
            </ul>
            <p>The process ensures you and your pet are a great fit.</p>
          </section>

          <section className="responsibilities-section">
            <h2>Responsibilities</h2>
            <ul>
              <li>Feeding</li>
              <li>Grooming</li>
              <li>Exercise</li>
              <li>Medical Care</li>
            </ul>
            <p>Pet care is a lifelong commitment.</p>
          </section>

          <button className="btn-primary">Find Your Perfect Pet</button>
        </div>

        <div className="right-form">
          <form onSubmit={handleSubmit}>
            <h2><center>Adopt a Pet</center></h2>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
            </div>

            <div className="form-group">
              <label htmlFor="age">Pet Age:</label>
              <input type="text" id="age" value={formData.age} onChange={handleChange} placeholder="Enter pet's age" />
            </div>


            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" value={formData.location} onChange={handleChange} placeholder="Enter location" />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select id="type" value={formData.type} onChange={handleChange}>
                <option value="none">None</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="justification">Justification for giving a pet:</label>
              <textarea id="justification" value={formData.justification} onChange={handleChange} placeholder="Explain briefly"></textarea>
            </div>

            <div className="form-group">
              <h3>Contact Information</h3>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Ph. No:</label>
              <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
            </div>

            <button type="submit" className="btn-primary">Submit Your Pet</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Services;
