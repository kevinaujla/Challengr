/*

userCtrl.js
configuring routes for userRouter

 */

module.exports = function (db) {
  return {
    retrieveAll: function (req, res) {
      // console Log
      console.log('api/user/ retrieving all users');
      // query for all users
      db.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        raw: true
      }).then(function (users) {
        res.json(users);
      });
    },
    update: function (req, res) {
      // console log
      console.log('/api/user/ updating user');
      // pull out data
      var id = req.body.id;
      var updateModel = {
        photoURL: req.body.photoURL
      };
      // query for specific user
      db.User.find({
        id: id
      }).then(function (user) {
        user.update(updateModel)
          .then(function (user) {
            res.status(200).end();
          });
      });
    }
  };
};
