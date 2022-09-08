var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var cors = require('cors')
const passport = require("passport");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var categoryRouter = require('./routes/categoryRoutes');
var productRouter = require('./routes/productRoutes')
var cartRouter = require('./routes/cartRoutes')

var app = express();

require("dotenv").config();
//connect database
mongoose.connect(process.env.DataBase, () => {
  console.log("Connected to DATABASE");
});

app.use(passport.initialize());
require("./security/passport")(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
