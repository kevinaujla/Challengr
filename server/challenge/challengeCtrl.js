/*

challengeCtrl.js
conf
iguring routes for challengeRouter

 */

module.exports = function (db) {
  return {
    create: function (req, res) {
      // Console Log
      console.log('/api/challenge/create is being called with body: ', req.body);
      // pull out data
      var challenger = req.user;
      var challenged = req.body.challenged;
      var title = req.body.title;
      var description = req.body.description;
      var type = req.body.type;
      var charityAmount = req.body.charityAmount;
      var issuedDate = new Date();
      var expiresDate = new Date();
      // expires in 24 hours from issue date
      expiresDate.setDate(expiresDate.getDate() + 1);

      // query for challenger
      db.User.findOne({
          where: {
            email: challenger.email
          }
        })
        .then(function (challenger) {
          // query for challenged
          db.User.findOne({
            where: {
              email: challenged.email
            }
          }).then(function (challenged) {
            // create challenge
            db.Challenge.create({
              title: title,
              type: type,
              description: description,
              charityAmount: charityAmount,
              issuedDate: issuedDate,
              expiresDate: expiresDate,
            }).then(function (challenge) {
              // create foreign keys on challenge
              challenger.addImposedChallenge(challenge);
              challenged.addMyChallenge(challenge);
              challenge.setChallenger(challenger);
              challenge.setChallenged(challenged);
              // Console Log
              console.log('successfully created challenge');
              res.status(201).end();
            });
          });
        });
    },

    retrieveAll: function (req, res) {
      // Console Log 
      console.log('api/challenge/retrieveAll is being called');
      // query for all challenges
      db.Challenge.findAll({
        include: [{model: db.User, as: 'Challenger'}, {model: db.User, as: 'Challenged'}]
      })
        .then(function (challenges) {
          var allChallenges = [];
          for(var i=0; i<challenges.length; i++) {
            allChallenges.push(challenges[i].dataValues);
          }
          res.json(allChallenges);
        });
    }
  };
};
