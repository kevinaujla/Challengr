/*

configDatabase.js
configure database models and relations

 */

module.exports = function (db) {
  db.User = db.import(__dirname + '/model/user.js');
  db.Challenge = db.import(__dirname + '/model/challenge.js');
  db.Charity = db.import(__dirname + '/model/charity.js');
  db.Transaction = db.import(__dirname + '/model/transaction.js');

  // adds foreign key to db.Challenge
  // specificUser.getMyChallenges() returns all challenges
  // where the specific user is challenged
  db.User.hasMany(db.Challenge, {
    as: 'MyChallenges',
    foreignKey: 'challengedUser'
  });

  // adds foreign key do db.Challenge
  // specificChallenge.getChallenger() returns challenger
  db.Challenge.belongsTo(db.User, {
    as: 'Challenger'
  });

  // adds foreign key to db.Challenge
  // specificUser.getImposedChallenges() returns all challenges 
  // where the specific user is the challenger
  db.User.hasMany(db.Challenge, {
    as: 'ImposedChallenges',
    foreignKey: 'challengerUser'
  });

  // adds foreign key do db.Challenge
  // specificChallenge.getChallenged() returns challenged user
  db.Challenge.belongsTo(db.User, {
    as: 'Challenged'
  });

  // adds foreign key userId to db.Transaction
  // User.getTransactions returns all transactions for that user
  db.User.hasMany(db.Transaction);

  db.sync()
    .then(function successCallback() {

      // creating default charities
      db.Charity.findOrCreate({
        where: {
          name: 'Action Against Hunger'
        },
        defaults: {
          link: 'http://www.actionagainsthunger.org/',
          description: 'Action Against Hunger | ACF International, a' +
            ' global humanitarian organization committed to ending world hunger,' +
            ' works to save the lives of malnourished children while providing communities' +
            ' with access to safe water and sustainable solutions to hunger.',
          imgUrl: 'image/charity/ActionAgainstHungerLogo.jpg'
        }
      }).spread(function (charity, created) {
        db.Charity.findOrCreate({
          where: {
            name: 'BitGive Foundation'
          },
          defaults: {
            link: 'http://bitgivefoundation.org/',
            description: 'BitGive is the first 501(c)(3) Bitcoin nonprofit charity representing' +
              ' the Bitcoin community.  Our mission is to leverage the power of the Bitcoin community' +
              ' to improve public health and the environment worldwide.',
            imgUrl: 'image/charity/BitGiveLogo.png'
          }
        }).spread(function (charity, created) {

        });

      });

    }, function errorCallback(err) {
      console.log('failed syncing database: ' + err);
    });
};
