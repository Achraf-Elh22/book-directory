const fs = require('fs');
const path = require('path');

module.exports = {
  saveFile: (data) => {
    fs.writeFileSync(
      path.join(__dirname, '../public/JSON/books.json'),
      JSON.stringify(data),
      (err) => {
        if (!err) throw new Error(`Something wrong happen 💣💣 ${err}`);
      }
    );
  },
  checkStatus: (req, res, next) => {
    const status = req.params.id || req.query.status || next();

    if (
      (status != 'want to read') &
      (status != 'currently reading') &
      (status != 'completed')
    ) {
      return res.status(400).json({
        status: 'error',
        message:
          'Invalid Value only (want to read or currently reading, completed) are acceptable',
      });
    }

    next();
  },
};
