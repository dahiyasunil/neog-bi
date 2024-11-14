const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.models");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

initializeDatabase();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to movies database.");
});

const addNewMovie = async (movieData) => {
  try {
    const newMovie = new Movie(movieData);
    return await newMovie.save();
  } catch (err) {
    throw err;
  }
};
app.post("/movies", async (req, res) => {
  try {
    const movieData = req.body;
    if (
      !movieData.title ||
      !movieData.releaseYear ||
      !movieData.director ||
      !movieData.language
    ) {
      res.status(404).json({
        msg: `title,releaseYear,director and language are required!`,
      });
    } else {
      const movie = await addNewMovie(movieData);
      if (movie) {
        res.status(201).json({ msg: `Movie added successfully!` });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    console.log(`Failed to add movie!
        ${err}`);
    res.status(500).json({ msg: `Failed to add movie!` });
  }
});

const readAllMovies = async () => {
  try {
    return await Movie.find();
  } catch (err) {
    throw err;
  }
};

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await readAllMovies();
    if (allMovies.length != 0) {
      res.json(allMovies);
    } else {
      res.status(204).json({ msg: `No movies in database!` });
    }
  } catch (err) {
    console.log(`Failed to get movies.
        ${err}`);
    res.status(500).json({ msg: `Failed to get movies!` });
  }
});

const readMoviesByTitle = async (movieTitle) => {
  try {
    return await Movie.findOne({ title: movieTitle });
  } catch (err) {
    throw err;
  }
};

app.get("/movies/titles/:movieTitle", async (req, res) => {
  try {
    const movies = await readMoviesByTitle(req.params.movieTitle);
    if (movies.length != 0) {
      res.status(200).json(movies);
    } else {
      res.status(204).json({ msg: `No movies found for the title.` });
    }
  } catch (err) {
    console.log(`Failed to get movie by title: ${req.movieTitle}.
      ${err}`);
    res.status(500).json({ msg: `Failed to get movies by title.` });
  }
});

const deleteMovieById = async (movieId) => {
  try {
    return await Movie.findByIdAndDelete(movieId);
  } catch (err) {
    throw err;
  }
};

app.delete("/movies/delete/id/:id", async (req, res) => {
  try {
    const deletedMovie = await deleteMovieById(req.params.id);
    if (deletedMovie) {
      res.status(200).json({ msg: `Movie deleted successfully!` });
    } else {
      throw new Error(`No movie id found in database. Id: ${req.params.id}`);
    }
  } catch (err) {
    console.log(`Failed to delete movie by Id.
        ${err}`);
    res.status(500).json({ msg: `Failed to delete movie.` });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
