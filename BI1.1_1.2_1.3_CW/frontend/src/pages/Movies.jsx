import { useState } from "react";
import useFetch from "../useFetch.jsx";

const Movies = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const { data, loading, error } = useFetch(`http://localhost:3001/movies`, []);

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/movies/delete/id/${movieId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete movie.`);
      }

      const data = (await response).json();

      if (data) {
        setSuccessMsg(`Movie deleted successfully!`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="container py-5">
      <ul className="list-group list-group-flush mt-4">
        {data?.map((movie) => (
          <li key={movie._id} className="list-group-item">
            {movie.title}
            <button
              className=" btn btn-sm btn-outline-danger float-end"
              onClick={() => handleDelete(movie._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p>{successMsg}</p>
    </main>
  );
};

export default Movies;
