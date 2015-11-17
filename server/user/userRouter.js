/*

userRouter.js
specifying routes for /api/user

 */

module.exports = function (app, db) {
  var userCtrl = require(__dirname + '/userCtrl.js')(db);

  // retrieve all users
  app.get('/', userCtrl.retrieveAll);
};
