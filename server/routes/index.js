var express = require('express');
var router = express.Router();
var passport = require('passport');
var Authentication = require('../authentication');


router.get('/', Authentication.ensureUnauthenticated, function(req, res){
  res.render('index', {
    title: 'Dashboard - Login',
    message: {
      error: req.flash('error'),
      info: req.flash('info'),
      success: req.flash('success')
    }
  });
});

router.get('/dashboard', Authentication.ensureAuthenticated, function(req, res){
  res.render('dashboard', {
    user: req.user,
    title: 'Dashboard',
    message: {
      error: req.flash('error'),
      info: req.flash('info'),
      success: req.flash('success')
    }
  });
});

// router.get('/login', function(req, res){
//   res.render('login', { user: req.user, );
// });

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
// router.post('/login',
//   passport.authenticate('keystone', {
//     failureRedirect: '/',
//     failureFlash: true,
//     successFlash: 'Welcome back!'
//   }),
//   function(req, res) {
//     res.redirect('/dashboard');
//   }
// );

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
router.post('/login', function(req, res, next) {
  passport.authenticate('keystone', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      if (info.message == 'Error (401): Unauthorized') {
        req.flash('error', 'Unable to authenticate user with credentials provided.');
      } else {
        req.flash('error', info.message);
      }
      return res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You\'ve successfully logged out.');
  res.redirect('/');
});

module.exports = router;
