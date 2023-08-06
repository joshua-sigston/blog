require('dotenv').config();

const express = require('express');
const layout = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser =require('cookie-parser');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = 3000 || process.env.PORT;

// connect DB
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');
connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cate',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONOGDB_URI
  })
}));
app.use(fileUpload())

app.use(express.static('public'));
app.set('view engine', 'ejs');
// template engine
app.use(layout);
app.set('layout', './layouts/main');

app.use('/', require('./server/routes/main'));
// app.use('/', require('./server/routes/admin'))

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});