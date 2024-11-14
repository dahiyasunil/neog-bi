import Movies from "./pages/Movies.jsx";
import MovieByTitle from "./pages/MovieByTitle.jsx";
import AddMovie from "./pages/AddMovie.jsx";

function App() {
  return (
    <>
      <AddMovie />
      <br />
      <Movies />
      <br />
      <MovieByTitle title="PK" />
    </>
  );
}

export default App;
