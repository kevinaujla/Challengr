/*

routeConfig.js
configure routes for our app
 
 */

module.exports = function (app, express, db) {
  // serving static files from client folder
  app.use(express.static(__dirname + '/../../client'));

  var authCtrl = require(__dirname + '/../auth/authCtrl.js')(db);

  // handling all authentication (signup, signin, route protection)
  var authRouter = express.Router();
  require(__dirname + '/../auth/authRouter.js')(authRouter, db, app);
  app.use('/api/auth', authRouter);

  //handling all fb authentication 
  var fbAuthRouter = express.Router();
  require(__dirname + '/../fbAuth/fbAuthRouter.js')(fbAuthRouter, db, app);
  app.use('/auth/facebook', fbAuthRouter);

  //handling all twitter authentication
  var twtAuthRouter=express.Router();
  require(__dirname + '/../twtAuth/twtAuthRouter.js')(twtAuthRouter, db, app);
  app.use('/auth/twitter', twtAuthRouter);

  // handling all braintree payment routes
  var braintreeRouter = express.Router();
  require(__dirname + '/../braintree/braintreeRouter.js')(braintreeRouter);
  app.use('/api/braintree', braintreeRouter);

  // handling all challenge related operations (create, retrieveAll)
  var challengeRouter = express.Router();
  // protect challenge routes
  challengeRouter.use(authCtrl.authenticate);
  require(__dirname + '/../challenge/challengeRouter.js')(challengeRouter, db);
  app.use('/api/challenge', challengeRouter);

  // handling all user related routes (retrieveAll)
  var userRouter = express.Router();
  // protect user routes
  userRouter.use(authCtrl.authenticate);
  require(__dirname + '/../user/userRouter.js')(userRouter, db);
  app.use('/api/user', userRouter);

  // handling all charity related routes (retrieveAll)
  var charityRouter = express.Router();
  // protect charity routes
  charityRouter.use(authCtrl.authenticate);
  require(__dirname + '/../charity/charityRouter.js')(charityRouter, db);
  app.use('/api/charity', charityRouter);

  // handling all s3 routes for storing images
  var s3Router = express.Router();
  // protect s3 routes
  s3Router.use(authCtrl.authenticate);
  require(__dirname + '/../s3/s3Router.js');
  app.use('/api/s3', s3Router);
};
