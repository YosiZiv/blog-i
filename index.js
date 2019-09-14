const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//  Express App initalizing
const app = express();

//  Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
app.use(function(error, req, res, next) {
  console.log('inside error handler', error);
  res.status(error.status || 500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
