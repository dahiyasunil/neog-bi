import { useState } from "react";
import useFetch from "../useFetch.jsx";

const Books = () => {
  const { data, loading, error } = useFetch(`http://localhost:3001/books`);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/books/delete/id/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete book!`);
      }

      const data = await response.json();
      if (data) {
        setDeleteSuccess(`Book deleted successfully!`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <h2>All Books</h2>
      {data ? (
        <div>
          <ul>
            {data.map((book) => (
              <li key={book._id}>
                {book.title}
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        loading && <p>Loading all books details...</p>
      )}
      {error && <p>{error}</p>}
      {deleteSuccess}
    </section>
  );
};

export default Books;
