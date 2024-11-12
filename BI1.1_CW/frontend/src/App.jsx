import { useState } from 'react';
import Movies from './pages/Movies.jsx';
import MovieByTitle from './pages/MovieByTitle.jsx';

function App() {
  return (
    <>
      <Movies />
      <br />
      <MovieByTitle title="PK" />
    </>
  );
}

export default App;
