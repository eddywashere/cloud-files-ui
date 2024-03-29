'use strict';

var express = require('express');
// var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')({ session: session });
var bodyParser = require('body-parser');
var compress = require('compression')();
var Authentication = require('./authentication');
var ErrorHandler = require('./error');
var passport = require('passport');
var flash = require('connect-flash');
var cors = require('cors');
var corsOptions = {
  origin: '*'
};
var staticDir;
// A proxy for Keystone Service Catalog Endpoints
var ProxyKeystone = require('proxy-keystone');

var proxyKeystone = new ProxyKeystone({
  userAgent: 'Rackspace Custom Dashboard'
});
// routes
var routes = require('./routes/index');
var styleguide = require('./routes/styleguide');
var corsOptions = {
  origin: 'https://b5d45c6f37adce61f143-6257090f8b77658659ee2c55c0d9059e.ssl.cf1.rackcdn.com'
};

// express setup
var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(compress);
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: 'chachachangeme!!!',
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/cloud-images-ui',
    auto_reconnect: true
  })
}));
// setup passport authentication
app.use(passport.initialize());
app.use(passport.session());
// other
app.use(flash());
app.use(cors(corsOptions));

if (app.get('env') === 'production') {
  staticDir = __dirname + '/../dist';
} else {
  staticDir = __dirname + '/../app';
  app.use('/styles', express.static(__dirname + '/../.tmp/styles'));
}

app.use(express.static(staticDir));

app.set('views', staticDir);
app.set('view engine', 'ejs');
app.engine('html', require('ejs-locals'));

passport.use(Authentication.keystoneStrategy);
passport.serializeUser(Authentication.serializeUser);
passport.deserializeUser(Authentication.deserializeUser);

// setup routes
app.use('/', routes);

if (app.get('env') === 'development'){
  app.use('/', styleguide);
}

app.all('/proxy/*',
  proxyKeystone.middleware
);

proxyKeystone.on('proxyError',function(err){
  console.log('proxy error data:');
  console.log(err.message);
});

// app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
if (app.get('env') === 'development') {
  app.use(ErrorHandler.development);
} else {
  app.use(ErrorHandler.production);
}

module.exports = app;
