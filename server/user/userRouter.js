/*

userRouter.js
specifying routes for /api/user

 */

module.exports = function (app, db) {
  var userCtrl = require(__dirname + '/userCtrl.js')(db);

  // retrieve all users
  app.get('/', userCtrl.retrieveAll);
  // update user
  app.put('/', userCtrl.update);
  // retrieve specified user
  app.get('/one', userCtrl.retrieveUser);
};
