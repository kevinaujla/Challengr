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

// imports instance of database from database.js
var db = require(__dirname + '/../../database/database.js');

// import database models
var User = db.import(__dirname + '/../../database/model/user.js');
// var Challenge = db.import(path.join(__dirname, '/../../database/model/challenge.js'));

module.exports = {
  signup: function (req, res) {
    // Console Log
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
        // Console Log
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
                  // Console Log
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
    // Console Log
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
              // Console Log
              return console.log('Error ocurred while comparing password: ', err);
            }
            if (!success) {
              // Console Log
              console.log('Wrong password supplied for username: ' + username);
              // respond to client
              res.json({
                success: false,
                message: 'Wrong username or password'
              });
            } else {
              // Console Log
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
  },

  authenticate: function (req, res, next) {
    // Console Log
    console.log('authenticating user with body: ' + req.body);

    // pull out token
    var token = req.body.token;

    // token exists in request body
    if (token) {
      // Console Log
      console.log('Token exists: ' + !!token);

      // decode and verify token
      jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
          // respond to client
          res.json({
            success: false,
            message: 'Failed decoding token'
          });
        } else {
          // Console Log
          console.log('Successfully authenticated token, access granted');
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
