const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport      = require('passport');

const app = express();

app.use(require('cors')());
app.options(require('cors')());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
//app.use(passport.session());
require('./config/passport.js')(passport);
var parseQuery = require('./middlewares/parseQuery');

app.use('/api/auth/me', passport.authenticate('jwt', { session: false }));
app.use('/api/categories', passport.authenticate('jwt', { session: false }));
app.use('/api/clients', passport.authenticate('jwt', { session: false }));
app.use('/api/providers', passport.authenticate('jwt', { session: false }));
app.use('/api/providers', passport.authenticate('jwt', { session: false }));
app.use('/api/expenses', passport.authenticate('jwt', { session: false }));
app.use('/api/products', passport.authenticate('jwt', { session: false }));
app.use('/api/sales', passport.authenticate('jwt', { session: false }));
app.use('/api/users', passport.authenticate('jwt', { session: false }));

const isAuthenticated = require('./middlewares/isAuthenticated');
isAuthenticated.unless = require('express-unless');

app.use('/api', isAuthenticated.unless({
  path:['/api/auth/login', '/api/auth/logout']
}));

app.use(function(req, res, next) {
  req.query.all = function() {
    return parseQuery.parse(req.query);
  }
  return next();
});
app.disable('x-powered-by');

app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/products', require('./routes/products'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
