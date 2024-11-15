import { useState } from "react";

const NewBook = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    language: "",
    country: "",
    rating: "",
    summary: "",
    coverImageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "publishedYear"
          ? parseInt(value)
          : name === "genre"
          ? value.split(",")
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await fetch(`http://localhost:3001/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setLoading(false);
        setSuccess(false);
        const error = await response.json();
        setError(error.msg || `Something went wrong. Please try again later!`);
        return;
      }

      const data = await response.json();
      if (data) {
        setSuccess(true);
        setLoading(false);
        setError(null);
      } else {
        throw new Error(``);
      }
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      setError(`Failed to add book. Please try again later!`);
    }
  };

  return (
    <section>
      <h2>Add new Book</h2>
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
        <label htmlFor="author">Author: </label>
        <br />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="publishedYear">Published Year: </label>
        <br />
        <input
          type="number"
          name="publishedYear"
          value={formData.publishedYear}
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
          required
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
          required
        />
        <br />
        <br />
        <label htmlFor="rating">Rating: </label>
        <br />
        <input
          type="number"
          name="rating"
          step="0.1"
          min="0"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="summary">Summary: </label>
        <br />
        <input
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="coverImageUrl">Cover Image Url: </label>
        <br />
        <input
          type="text"
          name="coverImageUrl"
          value={formData.coverImageUrl}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {success ? (
          <p>Book Added successfully!</p>
        ) : (
          loading && <p>saving book...</p>
        )}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
};

export default NewBook;
