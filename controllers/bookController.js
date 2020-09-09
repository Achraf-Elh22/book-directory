const { saveFile } = require('../utils/utils');
const _ = require('lodash');

const Books = require('../public/JSON/books.json');
const AppError = require('../utils/appErorr');

exports.getBooks = (req, res) => {
  if (req.query.status) {
    const books = Books.filter((book) => book.status === req.query.status);
    return res.status(200).json({
      results: books.length,
      books,
    });
  }

  res.status(200).json({
    status: 'success',
    results: Books.length,
    Books,
  });
};

exports.getBook = (req, res, next) => {
  const book = Books.filter((book) => book.isbn === req.params.id);
  if (book.length === 0) next(new AppError('The book does not exist', 404));

  res.status(200).json({
    status: 'success',
    book,
  });
};

exports.addBook = (req, res, next) => {
  const newBook = { ...req.body, status: 'want to read' };
  // Check if New Book already exist
  const book = Books.filter((book) => newBook.isbn === book.isbn);
  if (book.length >= 1) next(new AppError('The Book Already exist', 409));

  Books.push(newBook);

  // Save Books
  saveFile(Books);

  res.status(200).json({
    status: 'success',
    newBook,
  });
};

exports.deleteBook = (req, res, next) => {
  const newBooks = Books.filter((book) => req.params.id != book.isbn);

  // Check if book exist
  if (_.isEqual(newBooks, Books))
    next(new AppError(`No book exist with this isbn : ${req.params.id}`, 404));
  // Save Books
  saveFile(newBooks);

  res.status(200).json({
    status: 'success',
  });
};

exports.updateBook = (req, res, next) => {
  const book = Books.filter((book) => req.params.id === book.isbn);
  const bookIndex = Books.indexOf((book) => req.params.id === book.isbn);
  // Check if New Book already exist
  if (book.length === 0) next(new AppError('The book does not exist', 404));

  // Changing the status
  const newBook = { ...book[0], status: req.body.status };

  // books[bookIndex] = newBook;
  const newBooks = [...Books, (Books[bookIndex] = newBook)];
  // Save Books
  saveFile(newBooks);

  res.status(200).json({
    status: 'success',
    newBook,
  });
};
