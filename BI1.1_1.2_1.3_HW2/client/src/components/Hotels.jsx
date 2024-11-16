import { useState } from "react";
import useFetch from "../useFetch.jsx";

const Hotels = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const {
    data: hotels,
    loading,
    error,
  } = useFetch(`http://localhost:3001/hotels`);

  const handleDelete = async (hotelId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/hotels/delete/id/${hotelId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete book!`);
      }
      const data = await response.json();
      if (data) {
        setDeleteSuccess(`Hotel deleted successfully!`);
        setTimeout(() => {
          window.location.reload();
          setDeleteSuccess("");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      {hotels ? (
        <div>
          <h2>All Hotels</h2>
          <ul>
            {hotels.map((hotel) => (
              <li key={hotel._id}>
                <div>
                  {hotel.name}{" "}
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    style={{ color: "red" }}
                  >
                    <small>Delete</small>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        loading && <p>Loading hotels data...</p>
      )}
      {error && <p>{error}</p>}
      {deleteSuccess && <p>{deleteSuccess}</p>}
    </section>
  );
};

export default Hotels;
