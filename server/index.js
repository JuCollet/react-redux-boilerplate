'use strict';

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '..', 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'));
});

app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.json({
    error : {
      message : err.message
    }
  });
});

app.listen(process.env.PORT || 8080, function(){
  console.log('Server running');
});