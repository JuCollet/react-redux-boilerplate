const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '..', 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'));
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(process.env.PORT || 8080);
