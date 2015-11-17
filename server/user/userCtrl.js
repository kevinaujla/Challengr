/*

userCtrl.js
configuring routes for userRouter

 */

module.exports = function (db) {
  return {
    retrieveAll: function (req, res) {
      db.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        raw:true
      }).then(function (users) {
        res.json(users);
      });
    }
  };
};
