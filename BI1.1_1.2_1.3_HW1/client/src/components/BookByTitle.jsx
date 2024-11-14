import useFetch from "../useFetch.jsx";

const BookByTitle = ({ title }) => {
  const {
    data: book,
    loading,
    error,
  } = useFetch(`http://localhost:3001/books/${title}`);

  return (
    <section>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>
            <strong>Author: </strong>
            {book.author}
          </p>
          <p>
            <strong>Release Year: </strong>
            {book.publishedYear}
          </p>
          <p>
            <strong>Genre: </strong>
            {book.genre.join(`, `)}
          </p>
        </div>
      ) : (
        loading && <p>Loading data for book titled {title}...</p>
      )}
      {error && <p>{error}</p>}
    </section>
  );
};

export default BookByTitle;
