/*

fbAuthCtrl.js
configuring routes for fbAuthRouter

*/

// promise library to avoid callback hell
var Promise = require('bluebird');

// module implementing authO jwt's
var jwt = require('jsonwebtoken');

module.exports = function (db) {
  return {
    ensureAuthenticated: function (req, res, next) { // make sure user auth is valid, use this for anything that needs to be protected
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/signin');
    },

    fetchUserInfoFromFB: function (req, res) { // Get User info from FB
      var fbUserInfo = {
        'fbId': res.req.user.id,
        'fbUserName': res.req.user.displayName,
        'fbPicture': res.req.user.photos[0].value,
      };

      // res.cookie('facebook', fbUserInfo); // Set user info in cookies

      this.postUserInfo(req, res, fbUserInfo);

    },

    postUserInfo: function (req, res, userInfo) { // post user info to our db
      db.User.findOne({
          where: {
            FBid: userInfo.fbId
          }
        })
        .then(function (user) {
          if (!user) {
            var nameArray = userInfo.fbUserName.split(' ');

            db.User.create({
                FBid: userInfo.fbId,
                firstName: nameArray[0],
                lastName: nameArray[1],
                photoURL: userInfo.fbPicture
              })
              .then(function (user) {
                // create token
                var token = jwt.sign(user, process.env.TOKEN_SECRET, {
                  expiresIn: '1h'
                });

                res.json({
                  success: true,
                  message: 'Successfully Signed IN',
                  token: token,
                  user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                  }
                });


              });
          } else {

            var token = jwt.sign(user, process.env.TOKEN_SECRET, {
              expiresIn: '1h'
            });

            res.json({
              success: true,
              message: 'Successfully Signed IN',
              token: token,
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
              }
            });
          }
        });
    }
    
  };
};