/*

configDatabase.js
configure database models and relations

 */

module.exports = function (db) {
  db.User = db.import(__dirname + '/model/user.js');
  db.Challenge = db.import(__dirname + '/model/challenge.js');

  db.User.hasMany(db.Challenge, {
    as: 'MyChallenges',
    foreignKey: 'challengerUser'
  });

  db.Challenge.belongsTo(db.User, {
    as: 'Challenger'
  });

  db.User.hasMany(db.Challenge, {
    as: 'ImposedChallenges',
    foreignKey: 'challengedUser'
  });

  db.Challenge.belongsTo(db.User, {
    as: 'Challenged'
  });

  db.sync()
    .then(function successCallback() {
      console.log('database is up and running');
    }, function errorCallback(err) {
      console.log('failed syncing database: ' + err);
    });
};
