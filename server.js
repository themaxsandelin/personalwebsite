const express = require('express');
const path = require('path');
const app = express();

// Changed shit.

app.use(express.static('public/css'));
app.use(express.static('public/images'));
app.use(express.static('public/javascript'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname + '/public/404.html'));
});

app.listen(8080);
console.log('Website running on port 8080.');