/*

challengeRouter.js
specifying routes for /api/challenge

 */

module.exports = function (app, db) {
  // app === challengeRouter injected from server.js

  var challengeCtrl = require(__dirname + '/challengeCtrl.js')(db);

  // create a challenge
  app.post('/', challengeCtrl.create);
  // retrieve all challenges
  app.get('/', challengeCtrl.retrieveAll);
  // update model
  app.put('/', challengeCtrl.update);
  // getting the challenges for currently logged in user
  app.get('/my', challengeCtrl.getMyChallenges);
  // getting all imposed challenges for currently logged in user
  app.get('/imposed', challengeCtrl.getImposedChallenges);
  // getting the specified by the id
  app.get('/id', challengeCtrl.getChallengeByID);
};
