/*

fbAuthRouter.js
specifying routes for /auth/facebook

*/

var passport = require('passport');  // auth via passport
var FacebookStrategy = require('passport-facebook').Strategy;  // FB auth via passport

module.exports = function (app, db, mainApp) {
  // app === userRouter injected from server.js

  var fbAuthCtrl = require(__dirname + '/fbAuthCtrl.js')(db);

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      utils.fetchUserInfoFromFB(req, res);
    });

  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function (req, res) {
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
    });

  app.get('/userauth', passport.authenticate('facebook', {
      failureRedirect: '/login'
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
