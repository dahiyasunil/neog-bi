import { useState } from "react";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    releaseYear: "",
    genre: "",
    director: "",
    actors: "",
    language: "",
    country: "",
    rating: "",
    plot: "",
    awards: "",
    posterUrl: "",
    trailerUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "releaseYear" || name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("form data \n", formData);

    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add movie.`);
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="releaseYear">Release Year: </label>
        <br />
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="genre">Genre: </label>
        <br />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="director">Director: </label>
        <br />
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="actors">Actors: </label>
        <br />
        <input
          type="text"
          name="actors"
          value={formData.actors}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="language">Language: </label>
        <br />
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="country">Country: </label>
        <br />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="rating">Rating: </label>
        <br />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="plot">Plot: </label>
        <br />
        <input
          type="text"
          name="plot"
          value={formData.plot}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="awards">Awards: </label>
        <br />
        <input
          type="text"
          name="awards"
          value={formData.awards}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="posterUrl">Poster URL: </label>
        <br />
        <input
          type="text"
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="trailerUrl">Trailer URL: </label>
        <br />
        <input
          type="text"
          name="trailerUrl"
          value={formData.trailerUrl}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddMovie;
