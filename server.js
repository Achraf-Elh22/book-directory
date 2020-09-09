const app = require('./app');
const dotenv = require('dotenv').config({ path: 'config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!! 💣💣 Shunting down .... ');
  console.log(err.name, err.message, err);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 👍👌`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!!! 💣💣 Shunting down .... ');
  server.close(() => {
    process.exit();
  });
});
