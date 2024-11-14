import useFetch from "../useFetch.jsx";

const HotelByName = ({ hotelName }) => {
  const {
    data: hotel,
    loading,
    error,
  } = useFetch(`http://localhost:3001/hotels/${hotelName}`);

  return (
    <section>
      {hotel ? (
        <div>
          <h2>{hotel.name}</h2>
          <p>
            <strong>Location: </strong>
            {hotel.location}
          </p>
          <p>
            <strong>Rating: </strong>
            {hotel.rating}
          </p>
          <p>
            <strong>Price Range: </strong>
            {hotel.priceRange}
          </p>
        </div>
      ) : (
        loading && <p>Loading data for {hotelName}...</p>
      )}
      {error && <p>{error}</p>}
    </section>
  );
};

export default HotelByName;
