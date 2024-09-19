import React, { useState, useEffect } from "react";
import axios from "axios";
import { EventTags } from "./EventTags";
import { BASE_URL } from "../../utils/constants";
import AddEventMap from "./AddEventMap";  // Import AddEventMap

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    description: "",
    date: "",
    time: "",
    address: "",
    image: null,
    point_x: "",  // X coordinate to be filled from map
    point_y: "",  // Y coordinate to be filled from map
    organization: "",
    district: "",
    tags: [],
  });

  const [addressVerified, setAddressVerified] = useState(false);  // Track if address is verified
  const [organizations, setOrganizations] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetch organizations and districts from API
  useEffect(() => {
    axios.get("http://192.168.0.108:8000/api/events/")
      .then((response) => {
        const uniqueOrganizations = Array.from(
          new Set(response.data.filter(event => event.organization).map(event => JSON.stringify(event.organization)))
        ).map(org => JSON.parse(org));

        const uniqueDistricts = Array.from(
          new Set(response.data.filter(event => event.district).map(event => JSON.stringify(event.district)))
        ).map(dist => JSON.parse(dist));

        setOrganizations(uniqueOrganizations);
        setDistricts(uniqueDistricts);
      })
      .catch(error => {
        console.error("Error fetching event data: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset verification if the address changes
    if (name === "address") {
      setAddressVerified(false);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleTagsChange = (tags) => {
    setFormData({
      ...formData,
      tags: tags.map(tag => tag.tag),
    });
  };

  const handleCoordsChange = (point_x, point_y) => {
    setFormData({
      ...formData,
      point_x,
      point_y,
    });
    setAddressVerified(true);  // Set verification after successful coordinate update
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addressVerified) {
      alert("Проверьте адрес перед сохранением!");
      return;
    }

    const combinedDateTime = new Date(`${formData.date}T${formData.time}:00`).toISOString();
    const eventToSend = {
      ...formData,
      date: combinedDateTime,
    };

    console.log(JSON.stringify(eventToSend));

    axios
      .post(`${BASE_URL}events/create/`, eventToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Event created successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error creating the event!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div>
        <label>Название мероприятия:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Короткое описание:</label>
        <input
          type="text"
          name="about"
          value={formData.about}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Описание:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Дата:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Время:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Адрес:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <AddEventMap address={formData.address} onCoordsChange={handleCoordsChange} />

      <div>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          required
        />
      </div>

      <div>
        <label>Организация:</label>
        <select
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          required
        >
          <option value="">Выберите организацию</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.organization_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Район:</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        >
          <option value="">Выберите район</option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.name}
            </option>
          ))}
        </select>
      </div>

      <EventTags onChange={handleTagsChange} />

      <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Сохранить</button>
    </form>
  );
};

export default EventForm;
