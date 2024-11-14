import { useState } from "react";

const AddHotel = () => {
  const [success, setSuccess] = useState(false);
  const [waitToSave, setWaitToSave] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    rating: "",
    reviews: "",
    website: "",
    phoneNumber: "",
    checkInTime: "",
    checkOutTime: "",
    amenities: "",
    priceRange: "",
    reservationsNeeded: "",
    isParkingAvailable: "",
    isWifiAvailable: "",
    isPoolAvailable: "",
    isSpaAvailable: "",
    isRestaurantAvailable: "",
    photos: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "reservationsNeeded" ||
        name === "isParkingAvailable" ||
        name === "isWifiAvailable" ||
        name === "isPoolAvailable" ||
        name === "isSpaAvailable" ||
        name === "isRestaurantAvailable"
          ? e.target.checked
          : name === "amenities" || name === "photos"
          ? value.split(",")
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaitToSave(true);
      setError(null);
      setSuccess(false);
      const response = await fetch(`http://localhost:3001/hotels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setWaitToSave(false);
        setSuccess(false);
        const error = await response.json();
        setError(error.msg || `Something went wrong. Please try again later!`);
      }

      const data = await response.json();
      if (data) {
        setSuccess(true);
        setWaitToSave(false);
        setError(null);
      } else {
        throw new Error(``);
      }
    } catch (err) {
      setSuccess(false);
      setWaitToSave(false);
      setError(`Failed to add hotel. Please try again later!`);
    }
  };

  return (
    <section>
      <h2>Add new Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="category">Category: </label>
        <br />
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Budget">Budget</option>
          <option value="Mid-Range">Mid-Range</option>
          <option value="Luxury">Luxury</option>
          <option value="Boutique">Boutique</option>
          <option value="Resort">Resort</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />
        <label htmlFor="location">Location: </label>
        <br />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="rating">Rating: </label>
        <br />
        <input
          type="number"
          step="0.1"
          min="0"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="website">Website: </label>
        <br />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="phoneNumber">Phone Number: </label>
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="checkInTime">Check-In Time: </label>
        <br />
        <input
          type="text"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="checkOutTime">Check-Out Time: </label>
        <br />
        <input
          type="text"
          name="checkOutTime"
          value={formData.checkOutTime}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="amenities">Amenities: </label>
        <br />
        <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="priceRange">Price Range: </label>
        <br />
        <select
          name="priceRange"
          id="priceRange"
          value={formData.priceRange}
          onChange={handleChange}
        >
          <option value="$$ (11-30)">$$ (11-30)</option>
          <option value="$$$ (31-60)">$$$ (31-60)</option>
          <option value="$$$$ (61+)">$$$$ (61+)</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />
        <label htmlFor="reservationsNeeded">
          <input
            type="checkbox"
            name="reservationsNeeded"
            id="reservationsNeeded"
            value={formData.reservationsNeeded}
            onChange={handleChange}
          />
          Reservations Needed{" "}
        </label>
        <br />
        <br />
        <label htmlFor="isParkingAvailable">
          <input
            type="checkbox"
            name="isParkingAvailable"
            id="isParkingAvailable"
            value={formData.isParkingAvailable}
            onChange={handleChange}
          />
          Is Parking Available{" "}
        </label>
        <br />
        <br />
        <label htmlFor="isWifiAvailable">
          <input
            type="checkbox"
            name="isWifiAvailable"
            id="isWifiAvailable"
            value={formData.isWifiAvailable}
            onChange={handleChange}
          />
          isWifiAvailable{" "}
        </label>
        <br />
        <br />
        <label htmlFor="isPoolAvailable">
          <input
            type="checkbox"
            name="isPoolAvailable"
            id="isPoolAvailable"
            value={formData.isPoolAvailable}
            onChange={handleChange}
          />
          isPoolAvailable{" "}
        </label>
        <br />
        <br />
        <label htmlFor="isSpaAvailable">
          <input
            type="checkbox"
            name="isSpaAvailable"
            id="isSpaAvailable"
            value={formData.isSpaAvailable}
            onChange={handleChange}
          />
          isSpaAvailable{" "}
        </label>
        <br />
        <br />
        <label htmlFor="isRestaurantAvailable">
          <input
            type="checkbox"
            name="isRestaurantAvailable"
            id="isRestaurantAvailable"
            value={formData.isRestaurantAvailable}
            onChange={handleChange}
          />
          isRestaurantAvailable{" "}
        </label>
        <br />
        <br />
        <label htmlFor="photos">Photos: </label>
        <br />
        <input
          type="text"
          name="photos"
          value={formData.photos}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {success ? (
          <p>Hotel Added successfully!</p>
        ) : (
          waitToSave && <p>saving book...</p>
        )}
        {error && { error }}
      </div>
    </section>
  );
};

export default AddHotel;
