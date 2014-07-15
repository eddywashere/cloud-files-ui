var passport = require('passport');
var KeystoneStrategy = require('passport-keystone').Strategy;
var https = require('https');


module.exports = {

  // Use the KeystoneStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a username and password), and invoke a callback
  //   with a user object.  In the real world, this would query a database;
  //   however, in this example we are using a baked-in set of users.

  keystoneStrategy: new KeystoneStrategy(
    {
      authUrl: 'https://identity.api.rackspacecloud.com',
      region: 'ord',
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, identity, done) {
      if (!req.user) {
        var options,
        user = {};
        user.id    = identity.user.id;
        user.username  = identity.user.name;
        user.tenant  = identity.token.tenant.id;
        user.email = '';
        user.token = identity.token.id;
        user.serviceCatalog = identity.raw.access.serviceCatalog;
        user.serviceCatalog.push({
          name: 'identity',
          endpoints: [{
            publicURL: 'https://identity.api.rackspacecloud.com/v2.0'
          }]
        });
        req.session.cookie.expires = Date.parse(identity.token.expires) - Date.now();

        options = {
          host: 'identity.api.rackspacecloud.com',
          path: '/v2.0/users?name=' + user.username,
          headers: {
            'X-Auth-Token': user.token
          }
        };

        https.get(options, function(res) {
          var bodyChunks = [];
          res.on('data', function(chunk) {
            bodyChunks.push(chunk);
          }).on('end', function() {
            var body = JSON.parse(Buffer.concat(bodyChunks));
            user.email = body.user.email;
            return done(null, user);
          });
        }).on('error', function(e) {
          console.log('Error requesting user info: ' + e.message);
          return done(null, user);
        });

      } else {
        // user already exists and is logged in, we have to link accounts
        var user = req.user; // pull the user out of the session
        user.token = identity.token.id;
        req.session.cookie.expires = Date.parse(identity.token.expires) - Date.now();
        return done(null, user);
      }
    }
  ),

  serializeUser: function(user, done) {
    done(null, user);
  },

  deserializeUser: function(obj, done) {
    done(null, obj);
  },

  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/');
    }
  },

  ensureUnauthenticated: function(req, res, next) {
    if (req.isUnauthenticated()) {
      return next();
    } else {
      return res.redirect('/dashboard');
    }
  },

  csrf: function(req) {
    var token = (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token'])
    || (req.headers['x-xsrf-token']);
    return token;
  }
};
