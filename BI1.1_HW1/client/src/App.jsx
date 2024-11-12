import Books from "./components/Books.jsx";
import BookByTitle from "./components/BookByTitle.jsx";
import BooksByAuthor from "./components/BooksByAuthor.jsx";

function App() {
  return (
    <>
      <Books />
      <br />
      <BookByTitle title="Shoe Dog" />
      <br />
      <BooksByAuthor author="Harper Lee" />
    </>
  );
}

export default App;
