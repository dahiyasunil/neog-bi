import AddBook from "./components/AddBook.jsx";
import Books from "./components/Books.jsx";
import BookByTitle from "./components/BookByTitle.jsx";
import BooksByAuthor from "./components/BooksByAuthor.jsx";

function App() {
  return (
    <>
      <AddBook />
      <br />
      <Books />
      <br />
      <BookByTitle title="Shoe Dog" />
      <br />
      <BooksByAuthor author="Harper Lee" />
    </>
  );
}

export default App;
