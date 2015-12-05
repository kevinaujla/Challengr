/*

middlewareConfig.js
configures middleware for our app

 */

module.exports = function (app, express) {
  // parsing HTTP request bodys 
  var bodyParser = require('body-parser');

  // parses application/x-www-form-urlencoded from html forms
  app.use(bodyParser.urlencoded({
    extended: false,
    limit : '50mb'
  }));
  
  // parse json bodies
  app.use(bodyParser.json({ limit : '50mb' }));
};
