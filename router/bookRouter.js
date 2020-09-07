const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const books = require('../public/JSON/books.json');

const router = express.Router();

// @desc get all Books
// route : GET api/

router.get('/', (req, res) => {
  res.status(200).json({ books });
});

// @desc get Book
// route : GET api/:id

router.get('/:id', (req, res) => {
  const book = books.filter((book) => book.isbn === req.params.id);
  res.status(200).json({
    status: 'success',
    book,
  });
});

// @desc add Book
// route : POST api/addBooks

router.post('/addBooks', (req, res) => {
  const newBook = req.body;

  // Check if New Book already exist
  const book = books.filter((book) => newBook.isbn === book.isbn);
  if (book.length >= 1) {
    return res.status(409).json({
      status: 'Fail',
      message: 'The Book Already exist',
    });
  }

  books.push(newBook);

  fs.writeFileSync(
    path.join(__dirname, '../public/JSON/books.json'),
    JSON.stringify(books),
    (err) => {
      if (!err) throw new Error(`Something wrong happen 💣💣 ${err}`);
    }
  );
  res.status(200).json({
    status: 'success',
    newBook,
  });
});

// @desc Delete Book
// route : DELETE api/books/:id

router.delete('/books/:id', (req, res) => {
  const newBooks = books.filter((book) => req.params.id != book.isbn);

  // Check if book exist
  if (_.isEqual(newBooks, books)) {
    res.status(200).json({
      status: 'error',
      message: `No book exist with this isbn : ${req.params.id}`,
    });
  }
  fs.writeFileSync(
    path.join(__dirname, '../public/JSON/books.json'),
    JSON.stringify(newBooks),
    (err) => {
      if (!err) throw new Error(`Something wrong happen 💣💣 ${err}`);
    }
  );
  res.status(200).json({
    status: 'success',
  });
});

module.exports = router;
