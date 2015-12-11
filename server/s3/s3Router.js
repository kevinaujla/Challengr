/*

s3Router.js
specifying routes for /api/s3

*/

module.exports = function (app, db) {
  // app === s3Router injected from server.js

  var s3Ctrl = require(__dirname + '/s3Ctrl.js')(db);

  // get signed request for S3
  app.get('/sign', s3Ctrl.signRequest);
  // directly upload picture to S3
  app.post('/upload', s3Ctrl.upload);
};
