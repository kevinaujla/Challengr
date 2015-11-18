/*

fbAuthRouter.js
specifying routes for /auth/facebook

*/

var passport = require('passport');  // auth via passport
var FacebookStrategy = require('passport-facebook').Strategy;  // FB auth via passport
var session = require('express-session');  // to enable user sessions
var cookieParser = require('cookie-parser');  // parses cookies

module.exports = function (app, db, mainApp) {
  // app === userRouter injected from server.js

// AUTH INIT
app.use(session({ secret: 'this is challengr' }));
app.use(passport.initialize());  // initialize passport
app.use(passport.session());  // to support persistent login sessions
app.use(cookieParser());


passport.serializeUser(function(user, done) { // serialization is necessary for persistent sessions
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


  var utils = require(__dirname + '/fbAuthCtrl.js')(db);

  app.get('/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/signin'
    }),
    function (req, res) {
      utils.fetchUserInfoFromFB(req, res);
    });

  app.get('/',
    passport.authenticate('facebook'),
    function (req, res) {
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
    });

  app.get('/userauth', passport.authenticate('facebook', {
      failureRedirect: '/signin'
    }),
    function (req, res) {
      res.redirect('/');
    });

  passport.use(new FacebookStrategy({ // request fields from facebook
      profileFields: ['id', 'displayName', 'photos'],
      clientID: '1534819266808872',
      clientSecret: '7cb15159c731afe15686d596b633b20c',
      callbackURL: '/auth/facebook/callback',
      enableProof: false
    },

    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  ));

  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.clearCookie('facebook');
      res.redirect('/');
    });
  });
};
