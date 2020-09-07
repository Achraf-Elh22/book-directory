const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON
app.use(express.json());

// View engine (PUG)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', require('./router/bookRouter'));

module.exports = app;

// TODO:
//  _ Build APi with Crud methods []
//  _ handle Erorrs []
//  _ Feature: find all the information of the book just with isbn []
