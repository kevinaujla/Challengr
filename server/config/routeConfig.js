/*

routeConfig.js
configure routes for our app
 
 */

module.exports = function (app, express, db) {
  // serving static files from client folder
  app.use(express.static(__dirname + '/../../client'));

  // handling all authentication (signup, signin, route protection)
  var authRouter = express.Router();
  require(__dirname + '/../auth/authRouter.js')(authRouter, db, app);
  app.use('/api/auth', authRouter);

  // all routes below are protected and need to have valid jwt in header

  // handling all braintree payment routes
  var braintreeRouter = express.Router();
  require(__dirname + '/../braintree/braintreeRouter.js')(braintreeRouter);
  app.use('/api/braintree', braintreeRouter);

  // handling all challenge related operations (create, retrieveAll)
  var challengeRouter = express.Router();
  require(__dirname + '/../challenge/challengeRouter.js')(challengeRouter, db);
  app.use('/api/challenge', challengeRouter);
};
