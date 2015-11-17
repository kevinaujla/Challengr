/*

userCtrl.js
configuring routes for userRouter

 */

module.exports = function (db) {
  return {
    retrieveAll: function (req, res) {
      // Console Log
      console.log('api/user/ retrieving all users');
      // query for all users
      db.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        raw:true
      }).then(function (users) {
        res.json(users);
      });
    }
  };
};
