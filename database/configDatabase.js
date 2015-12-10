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
      return db.Charity.findOrCreate({
        where: {
          name: 'United Way of the Bay Area'
        },
        defaults: {
          link: 'https://uwba.org/',
          description: 'Together we are making great strides to help the 1 in 4 Bay Area families living in poverty. Thanks to your support, we helped connect more than 250,000 people with services like food pantry access, financial coaching, education support and more last year.',
          imgUrl: 'https://s3-us-west-2.amazonaws.com/challengrimages/placeholder/uwba.jpg',
        }
      }).spread(function (charity, created) {
        return db.Charity.findOrCreate({
          where: {
            name: 'Swords to Plowshares'
          },
          defaults: {
            link: 'http://www.swords-to-plowshares.org/',
            description: 'All veterans will have access to the care and services they need to rebuild their lives. War causes wounds and suffering that last beyond the battlefield. Swords to Plowshares’ mission is to heal the wounds, to restore dignity, hope, and self-sufficiency to all veterans in need, and to prevent and end homelessness and poverty among veterans.',
            imgUrl: 'https://s3-us-west-2.amazonaws.com/challengrimages/placeholder/swords.png',
          }
        }).spread(function (charity, created) {

        });

      });

    }, function errorCallback(err) {
      console.log('failed syncing database: ' + err);
    });
};