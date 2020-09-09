const express = require('express');

const { checkStatus } = require('../utils/utils');

const {
  getBooks,
  getBook,
  updateBook,
  addBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

// @desc get all Books
// route : GET api/books

router.get('/books', checkStatus, getBooks);

// @desc get Book
// route : GET api/:id

router.get('/books/:id', getBook);

// @desc add Book
// route : POST api/addBooks

router.post('/addBooks', addBook);

// @desc Delete Book
// route : DELETE api/books/:id

router.delete('/books/:id', deleteBook);

// @desc update status of book
// route : PUT api/books/:id

router.put('/books/:id', checkStatus, updateBook);

module.exports = router;
