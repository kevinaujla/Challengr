/*

server.js
express/node server 

*/

// load environment variables from .env file
require('dotenv').load();

// create express app
var express = require('express');
var app = express();

// logging requests to the server
var morgan = require('morgan');
// convenience method for making http requests
var request = require('request');
// module for transforming filepaths
var path = require('path');
// promise library to avoid callback hell
var Promise = require('bluebird');
// module for securely hashing passwords
var bcrypt = require('bcrypt-nodejs');
// parsing HTTP request bodys
var bodyParser = require('body-parser');
// module implementing authO jwt's
var jwt = require('jsonwebtoken');

// imports instance of database from database.js
var db = require('../database/database.js');

// choose process port if applicable
var port = process.env.PORT || 3000;

var User = db.import(path.join(__dirname, '../database/model/user.js'));
var Challenge = db.import(path.join(__dirname, '../database/model/challenge.js'));

app.use(morgan('dev'));
// parses application/x-www-form-urlencoded from forms
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// serving static files from client folder
app.use(express.static(__dirname + '/../client'));

// API endpoint for signup requests
app.post('/api/user/signup', function (req, res) {
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
});

// API endpoint for signin requests
app.post('/api/user/signin', function (req, res) {
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
            })
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
});

// start server to listen on localhost:port
app.listen(port);
console.log('Challengr is listening on port ', port);
