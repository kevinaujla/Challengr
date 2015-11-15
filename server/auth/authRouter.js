/*

authRouter.js
specifying routes for /api/auth

*/

var authCtrl = require(__dirname + '/authCtrl.js');

module.exports = function (app) {
  // app === userRouter injected from server.js

  // API endpoint for signup requests
  app.post('/signup', authCtrl.signup);
  // API endpoint for signin requests
  app.post('/signin', authCtrl.signin);
  // API endpoint for authenticating user
  app.get('/authenticate', authCtrl.checkUser);
  // middleware for all routes after here
  app.use(authCtrl.authenticate);
};
