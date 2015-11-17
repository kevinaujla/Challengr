/*

middlewareConfig.js
configures middleware for our app

 */

module.exports = function (app, express) {
  // logging requests to the server
  var morgan = require('morgan');
  // parsing HTTP request bodys 
  var bodyParser = require('body-parser');

  // set development mode for morgan regarding logging format
  app.use(morgan('dev'));
  // parses application/x-www-form-urlencoded from html forms
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  // parse json bodies
  app.use(bodyParser.json());
};
