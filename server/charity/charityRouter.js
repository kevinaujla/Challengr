/*

charityRouter.js
specifying routes for /api/charity

*/

module.exports = function (app, db) {
  // app === charityRouter injected from server.js

  var charityCtrl = require(__dirname + '/charityCtrl.js')(db);

  // retrieve all charities
  app.get('/', charityCtrl.retrieveAll);
};
