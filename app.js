const path = require('path');
const express = require('express');
const morgan = require('morgan');

const globalErorrHandler = require('./controllers/errorController');
const AppError = require('./utils/appErorr');

const app = express();

// Logger
app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON
app.use(express.json());

// View engine (PUG)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', require('./router/bookRouter'));

app.use('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} on this Server!!!`, 404));
});

app.use(globalErorrHandler);

module.exports = app;

// TODO:
//  _ Build APi with Crud methods [*]
//  _ Feature: add status(want to read,currently reading,completed) to book and the ability to re-assign it [*]
//  _ Feature: Filter books by status [*]
//  _ Feature: find all the information of the book just with isbn [] front-end
//  _ handle Erorrs []
