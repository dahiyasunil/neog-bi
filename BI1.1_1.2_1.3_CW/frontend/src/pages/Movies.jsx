import useFetch from "../useFetch.jsx";

const Movies = () => {
  const { data, loading, error } = useFetch(`http://localhost:3001/movies`, []);

  return (
    <main className="container py-5">
      <ul className="list-group list-group-flush mt-4">
        {data?.map((movie) => (
          <li key={movie._id} className="list-group-item">
            {movie.title}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Movies;
