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

// * Create new book
const createNewBook = async (bookData) => {
  try {
    const newBook = new Book(bookData);
    return await newBook.save();
  } catch (err) {
    throw err;
  }
};

app.post("/books", async (req, res) => {
  try {
    const newBookData = req.body;

    if (
      !newBookData.title ||
      !newBookData.author ||
      !newBookData.publishedYear ||
      !newBookData.language
    ) {
      res.status(404).json({
        msg: `title, author, publishedYear and language are required!`,
      });
    } else {
      const newBook = await createNewBook(newBookData);
      if (newBook) {
        res.status(201).json({ msg: `Book added successfully!` });
      } else {
        throw new Error(
          `An error occured while trying to save book in database.`
        );
      }
    }
  } catch (err) {
    res.status(500).json({ msg: "Failed to add book!" });
    console.log(`Failed to add book in database.
      ${err}`);
  }
});

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

// * Delete book by Id
const deleteBookById = async (bookId) => {
  try {
    return await Book.findByIdAndDelete(bookId);
  } catch (err) {
    throw new Error(
      `An error occured while trying to delete book. ${err.message}`
    );
  }
};

app.delete("/books/delete/id/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedBook = await deleteBookById(bookId);
    if (deletedBook) {
      res.status(200).json({ msg: `Book deleted successfully!` });
    } else {
      res.status(404).json({ msg: `No book found!` });
    }
  } catch (err) {
    res.status(500).json({ msg: `Failed to delete the book.` });
    console.error(`Failed to delete the book by id ${bookId}.
      Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
