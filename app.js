const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes/index');
const session = require('express-session');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Views'));


app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false
}));

app.use('/', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// hhhhhJ