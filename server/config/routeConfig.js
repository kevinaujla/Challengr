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

  var braintreeRouter = express.Router();
  braintreeRouter.use(authCtrl.authenticate);
  require(__dirname + '/../braintree/braintreeRouter.js')(braintreeRouter, db);
  app.use('/api/braintree', braintreeRouter);

  // handling all challenge related operations (create, retrieveAll, update, ...)
  var challengeRouter = express.Router();
  challengeRouter.use(authCtrl.authenticate);
  require(__dirname + '/../challenge/challengeRouter.js')(challengeRouter, db);
  app.use('/api/challenge', challengeRouter);

  // handling all user related routes (retrieveAll, update, retrieve specific, ...)
  var userRouter = express.Router();
  userRouter.use(authCtrl.authenticate);
  require(__dirname + '/../user/userRouter.js')(userRouter, db);
  app.use('/api/user', userRouter);

  // handling all charity related routes (retrieveAll)
  var charityRouter = express.Router();
  charityRouter.use(authCtrl.authenticate);
  require(__dirname + '/../charity/charityRouter.js')(charityRouter, db);
  app.use('/api/charity', charityRouter);

  // handling all s3 routes for storing images
  var s3Router = express.Router();
  s3Router.use(authCtrl.authenticate);
  require(__dirname + '/../s3/s3Router.js')(s3Router, db);
  app.use('/api/s3', s3Router);
};
