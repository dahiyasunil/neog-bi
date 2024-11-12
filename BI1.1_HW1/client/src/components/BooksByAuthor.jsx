import useFetch from "../useFetch";

const BooksByAuthor = ({ author }) => {
  const {
    data: booksByAuthor,
    loading,
    error,
  } = useFetch(`http://localhost:3001/books/authors/${author}`);

  return (
    <section>
      {booksByAuthor ? (
        <div>
          <h2>Books By {author}</h2>
          <ul>
            {booksByAuthor.map((book) => (
              <li key={book._id}>{book.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        loading && <p>Loading books by author {author}</p>
      )}
    </section>
  );
};

export default BooksByAuthor;
