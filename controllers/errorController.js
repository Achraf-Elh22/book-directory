const AppError = require('../utils/appErorr');

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    //Operationel, trusted Error: Send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unknown Error: don't leak error details
    // 1)log Error
    console.error('ERROR 💣 ', err);
    // 2) Send Generate message
    return res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went wrong!!',
    });
  }
  // B) Rendered website
  //Operationel, trusted Error: Send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!!',
      msg: err.message,
    });
  }
  // 1)log Error
  console.error('ERROR 💣 ', err);

  // 2) Send Generate message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!!',
    msg: 'Please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    sendErrorProd(err, req, res);
  }
};
