/*

charityRouter.js
specifying routes for /api/charity

*/

module.exports = function (app, db) {
  // app === charityRouter injected from server.js

  var s3Ctrl = require(__dirname + '/s3Ctrl.js')(db);

  // retrieve all charities
  app.post('/upload', s3Ctrl.upload);
};
