/*

twtAuthRouter.js
specifying routes for /auth/twitter

*/

var passport = require('passport'); // auth via passport
var TwitterStrategy = require('passport-twitter').Strategy; // FB auth via passport
var session = require('express-session'); // to enable user sessions
var cookieParser = require('cookie-parser'); // parses cookies

module.exports = function (app, db, mainApp) {
  // app === userRouter injected from server.js

  // AUTH INIT
  app.use(session({
    secret: 'this is challengr'
  }));
  app.use(passport.initialize()); // initialize passport
  app.use(passport.session()); // to support persistent login sessions
  app.use(cookieParser());


  passport.serializeUser(function (user, done) { // serialization is necessary for persistent sessions
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  var utils = require(__dirname + '/twtAuthCtrl.js')(db);


  app.get('/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/signin'
    }),
    function (req, res) {
      utils.fetchUserInfoFromTWT(req, res);
    });


  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  app.get('/', passport.authenticate('twitter'));




  passport.use(new TwitterStrategy({
      consumerKey: 'zhoYvm3yPgyV6iVRaly89mdiU',
      consumerSecret: 'GfkmGY69RHKimjS1rojsMd8zmTOu0Sqh2mS4Ko9TNRiGlvkrTv',
      callbackURL: 'oob'
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreate({
        twitterId: profile.id
      }, function (err, user) {
        return done(err, user);
      });
    }
  ));


  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.clearCookie('twitter');
      res.redirect('/');
    });
  });


};
