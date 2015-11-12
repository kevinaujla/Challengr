/*

authController.js
configuring routes for authRouter

 */

// promise library to avoid callback hell
var Promise = require('bluebird');
// module for securely hashing passwords
var bcrypt = require('bcrypt-nodejs');
// module implementing authO jwt's
var jwt = require('jsonwebtoken');

module.exports = {
  signup: function (req, res) {
    // console.log
    console.log('/api/user/signup is being called with body: ' + req.body);
    // pull out username and password
    var username = req.body.username;
    var password = req.body.password;

    // query for user
    User.findOne({
        where: {
          username: username
        }
      })
      .then(function (user) {
        // console.log
        console.log('user with username: ' + username + ' exists: ' + !!user);
        if (user) {
          // respond to client
          res.json({
            success: false,
            message: 'Username ' + username + ' is already taken'
          });
        } else {
          var hashing = Promise.promisify(bcrypt.hash);

          // hash password and save user to the database
          hashing(password, null, null)
            .then(function (hash) {
              // create user in db
              User.create({
                  username: username,
                  password: hash
                })
                .then(function (user) {
                  // console.log
                  console.log('user with username: ' + username + 'got created: ' + !!user);
                  // create token
                  var token = jwt.sign(user, process.env.TOKEN_SECRET, {
                    expiresInMinutes: 60
                  });

                  // respond to client
                  res.json({
                    success: true,
                    message: 'Successfully signed up as ' + username,
                    token: token,
                    user: {
                      username: username
                    }
                  });
                });
            });
        }
      });
  },

  signin: function (req, res) {
    // console.log
    console.log('/api/user/signin is being called with body: ' + req.body);
    // pull out username and password
    var username = req.body.username;
    var password = req.body.password;

    // query for user
    User.findOne({
        where: {
          username: username
        }
      })
      .then(function (user) {
        console.log('user with username: ' + username + ' exists: ' + !!user);
        if (!user) {
          // respond to client
          res.json({
            success: false,
            message: 'Wrong username or password'
          });
        } else {
          // compare supplied password and password from database
          bcrypt.compare(password, user.password, function (err, success) {
            if (err) {
              // console.log
              return console.log('Error ocurred while comparing password: ', err);
            }
            if (!success) {
              // console.log
              console.log('Wrong password supplied for username: ' + username);
              // respond to client
              res.json({
                success: false,
                message: 'Wrong username or password'
              });
            } else {
              // console.log
              console.log('User with username: ' + username + ' supplied correct credentials');
              // create token
              var token = jwt.sign(user, process.env.TOKEN_SECRET, {
                expiresInMinutes: 60
              });

              // respond to client
              res.json({
                success: true,
                message: 'Successfully signed in as ' + username,
                token: token,
                user: {
                  username: username
                }
              });
            }
          });
        }
      });
  }
};
