/*

s3Router.js
specifying routes for /api/s3

 */

module.exports = function (app, db) {
  // app === s3Router injected from server.js

  var s3Ctrl = require(__dirname + '/s3Ctrl');

  // get temporarily signed s3 request for access to bucket
  app.get('/sign_s3', s3Ctrl.signRequest)(db);
};
