import useFetch from "../useFetch.jsx";

const MovieByTitle = ({ title }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:3001/movies/titles/${title}`,
    []
  );

  return (
    <section className="container py-4">
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>Director: {data.director}</p>
          <p>Country: {data.country}</p>
          <p>Release Year: {data.releaseYear}</p>
          <p>Rating: {data.rating}</p>
          <p>Actors: {data.actors ? data.actors.join(", ") : ""}</p>
          <p>Awards: {data.awards}</p>
          <p>Plot: {data.plot}</p>
          <img src={data.posterUrl} alt="Poster Image" />
        </div>
      ) : (
        loading && <p>Loading...</p>
      )}
    </section>
  );
};

export default MovieByTitle;
