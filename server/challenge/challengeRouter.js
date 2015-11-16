/*

challengeRouter.js
specifying routes for /api/challenge

 */

module.exports = function (app, db) {
  // app === challengeRouter injected from server.js

  var challengeCtrl = require(__dirname + '/challengeCtrl.js')(db);

  // create a challenge
  app.post('/create', challengeCtrl.create);
  // retrieve all challenges
  app.get('/retrieveAll', challengeCtrl.retrieveAll);
}
