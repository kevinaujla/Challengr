/*

authRouter.js
specifying routes for authRouter

 */

var authController = require(__dirname + '/authController.js');

module.exports = function (app) {
  // app === userRouter injected from server.js

  // API endpoint for signup requests
  app.post('/signup', authController.signup);
  // API endpoint for signin requests
  app.post('/signin', authController.signin);
  // middleware for all routes after here
  app.use(authController.authenticate);
};
