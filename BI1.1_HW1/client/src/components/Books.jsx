import useFetch from "../useFetch.jsx";

const Books = () => {
  const { data, loading, error } = useFetch(`http://localhost:3001/books`);

  return (
    <section>
      <h2>All Books</h2>
      {data ? (
        <div>
          <ul>
            {data.map((book) => (
              <li key={book._id}>{book.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        loading && <p>Loading all books details...</p>
      )}
      {error && <p>{error}</p>}
    </section>
  );
};

export default Books;
