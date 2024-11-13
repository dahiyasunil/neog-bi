import useFetch from "../useFetch.jsx";

const Hotels = () => {
  const {
    data: hotels,
    loading,
    error,
  } = useFetch(`http://localhost:3001/hotels`);

  return (
    <section>
      {hotels ? (
        <div>
          <h2>All Hotels</h2>
          <ul>
            {hotels.map((hotel) => (
              <li key={hotel._id}>{hotel.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        loading && <p>Loading hotels data...</p>
      )}
      {error && <p>{error}</p>}
    </section>
  );
};

export default Hotels;
