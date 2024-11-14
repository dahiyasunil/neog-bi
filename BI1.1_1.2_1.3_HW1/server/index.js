const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/book.models");
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

// * Read all books
const readAllBooks = async () => {
  try {
    return await Book.find();
  } catch (err) {
    console.log("An error occured while trying to return");
    throw err;
  }
};

app.get("/books", async (req, res) => {
  try {
    const allBooks = await readAllBooks();
    if (allBooks.length != 0) {
      res.json(allBooks);
    } else {
      res.status(204).json({ msg: "No books in database!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Failed to get books data." });
  }
});

// * Read book by title
const readBookByTitle = async (bookTitle) => {
  try {
    return await Book.findOne({ title: bookTitle });
  } catch (error) {
    console.log(
      `An error occured while trying to get book with title: ${bookTitle}.\nError:\n${error}`
    );
    throw err;
  }
};

app.get("/books/:title", async (req, res) => {
  try {
    const bookByTitle = await readBookByTitle(req.params.title);
    if (bookByTitle) {
      res.json(bookByTitle);
    } else {
      res.status(200).json({ msg: `No book for title: ${req.params.title}` });
    }
  } catch (err) {
    res.status(500).json({ msg: "Failed to get book." });
  }
});

// * Read book by Author
const readBookByAuthor = async (author) => {
  try {
    return await Book.find({ author: author });
  } catch (err) {
    console.log(
      `An error occured while trying to get book by author: ${author}.\nError:\n${err}`
    );
    throw err;
  }
};

app.get("/books/authors/:authorName", async (req, res) => {
  try {
    const allBooksByAuthor = await readBookByAuthor(req.params.authorName);
    if (allBooksByAuthor != 0) {
      res.json(allBooksByAuthor);
    } else {
      res.status(200).json({
        msg: `No books found for author: ${req.params.authorName}`,
      });
    }
  } catch (err) {
    res.status(500).json({ msg: "Failed to get books." });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
