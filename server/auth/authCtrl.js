/*

authCtrl.js
configuring routes for authRouter

*/

// promise library to avoid callback hell
var Promise = require('bluebird');
// module for securely hashing passwords
var bcrypt = require('bcrypt-nodejs');
// module implementing authO jwt's
var jwt = require('jsonwebtoken');

module.exports = function (db) {
  return {
    signup: function (req, res) {
      // console.log('/api/user/signup is being called with body: ', req.body);
      // pull out user data
      var email = req.body.email;
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var password = req.body.password;
      // query for user with email(unique)
      db.User.findOne({
          where: {
            email: email
          }
        })
        .then(function (user) {
          // console.log('user with email: ' + email + ' exists: ' + !!user);
          if (user) {
            // respond to client
            res.json({
              success: false,
              message: 'email: ' + email + ' is already in use'
            });
          } else {
            var hashing = Promise.promisify(bcrypt.hash);

            // hash password and save user to the database
            return hashing(password, null, null)
              .then(function (hash) {
                // create user in db
                db.User.create({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: hash
                  })
                  .then(function (user) {
                    console.log('user with email: ' + email + ' got created: ' + !!user);
                    // create token
                    jwt.sign(user, process.env.TOKEN_SECRET, {
                      expiresIn: '1h'
                    }, function (token) {
                      // respond to client
                      res.json({
                        success: true,
                        message: 'Successfully signed up with ' + email,
                        token: token,
                        user: {
                          id: user.id,
                          email: user.email,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          photoURL: user.photoURL,
                        }
                      });
                    });
                  })
                  .catch(function (err) {
                    console.log('error signing up user: ', err);
                  });
              });
          }
        });
    },

    signin: function (req, res) {
      // console.log('/api/user/signin is being called with body: ', req.body);
      // pull out user data
      var email = req.body.email;
      var password = req.body.password;
      // query for user with email(unique)
      db.User.findOne({
          where: {
            email: email
          }
        })
        .then(function (user) {
          // console.log('user with email: ' + email + ' exists: ' + !!user);
          if (!user) {
            // respond to client
            res.json({
              success: false,
              message: 'Wrong email or password'
            });
          } else {
            // compare supplied password and password from database
            bcrypt.compare(password, user.password, function (err, success) {
              if (err) {
                return console.log('Error ocurred while comparing password: ', err);
              }
              if (!success) {
                // console.log('Wrong password supplied for user with email: ' + email);
                // respond to client
                res.json({
                  success: false,
                  message: 'Wrong email or password'
                });
              } else {
                // console.log('User with email: ' + email + ' supplied correct credentials');
                // create token
                var token = jwt.sign(user, process.env.TOKEN_SECRET, {
                  expiresIn: '1h'
                });

                // respond to client
                res.json({
                  success: true,
                  message: 'Successfully signed in with: ' + email,
                  token: token,
                  user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photoURL: user.photoURL,
                  }
                });
              }
            });
          }
        })
        .catch(function (err) {
          console.log('error signing in user: ', err);
        });
    },

    checkUser: function (req, res) {
      // console.log('checking if user is allowed to access');
      // pull out token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        // console.log('Token exists: ' + !!token);
        // decode and verify token
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
          if (err) {
            // respond to client
            res.json({
              success: false,
              message: 'Failed decoding token'
            });
          } else {
            console.log('authenticated token, access granted');
            // respond to client
            res.json({
              success: true,
              message: 'user is allowed access'
            });
          }
        });
      } else {
        // respond to client
        res.status(403).send({
          success: false,
          message: 'No token provided'
        });
      }
    },

    authenticate: function (req, res, next) {
      // pull out token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        // decode and verify token
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
          if (err) {
            // respond to client
            res.json({
              success: false,
              message: 'Failed decoding token'
            });
          } else {
            // link user to request for further requests
            req.user = decoded;
            // move on to next middleware
            next();
          }
        });
      } else {
        // respond to client
        res.status(403).send({
          success: false,
          message: 'No token provided'
        });
      }
    }
  };
};
