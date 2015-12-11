/*

challengeCtrl.js
configuring routes for challengeRouter

*/

module.exports = function (db) {
  return {
    create: function (req, res) {
      // console.log('create challenge: ', req.body);
      // pull out data
      var challenger = req.user;
      var challenged = req.body.challenged;
      var title = req.body.info.title;
      var description = req.body.info.description;
      var type = req.body.info.type;
      var charityAmount = req.body.info.charityAmount;
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
              // console.log('successfully created challenge');
              res.status(201).end();
            });
          });
        });
    },

    retrieveAll: function (req, res) {
      // console.log('retrieving all challenges');
      db.Challenge.findAll({
          attributes: ['id',
            'title',
            'type',
            'description',
            'charityAmount',
            'completed',
            'notCompleted',
            'likes',
            'expiresDate',
            'issuedDate',
            'completedDate'
          ],
          include: [{
            model: db.User,
            as: 'Challenger',
            attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL']
          }, {
            model: db.User,
            as: 'Challenged',
            attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL']
          }],
          order: 'issuedDate DESC'
        })
        .then(function (challenges) {
          for (var i = 0; i < challenges.length; i++) {
            challenges[i] = challenges[i].toJSON();
          }
          res.json(challenges);
        });
    },

    update: function (req, res) {
      // console.log('/api/challenge updating model');
      // pull out necessary data
      var id = req.body.id;
      var updateModel = {
        completed: req.body.completed,
        notCompleted: req.body.notCompleted,
        likes: req.body.likes
      };
      // query for challenge to update
      db.Challenge.findOne({
        where: {
          id: id
        }
      }).then(function (challenge) {
        challenge.update(updateModel)
          .then(function (challenge) {
            res.status(200).json({
              success: true
            });
          });
      });
    },

    getMyChallenges: function (req, res) {
      // console.log('/api/challenge/user retrieving challenges for user: ' + req.user.firstName);
      // pull current user id
      var id = req.user.id;
      db.User.findOne({
        where: {
          id: id
        }
      }).then(function (user) {
        user.getMyChallenges({
            attributes: ['id',
              'title',
              'type',
              'description',
              'charityAmount',
              'completed',
              'notCompleted',
              'likes',
              'expiresDate',
              'issuedDate',
              'completedDate'
            ],
            include: [{
              model: db.User,
              as: 'Challenger',
              attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL']
            }, {
              model: db.User,
              as: 'Challenged',
              attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL']
            }]
          })
          .then(function (challenges) {
            // console.log('successfully fetched all challenges from db for user: ' + user.firstName);
            res.status(200).json(challenges);
          });
      });
    },

    getImposedChallenges: function (req, res) {
      // console.log('/api/challenge/imposed retrieving all imposed challenges for user: ' + req.user.firstName);
      // pull out current user id
      var id = req.user.id;
      db.User.findOne({
        where: {
          id: id
        }
      }).then(function (user) {
        user.getImposedChallenges({
            attributes: ['id',
              'title',
              'type',
              'description',
              'charityAmount',
              'completed',
              'notCompleted',
              'likes',
              'expiresDate',
              'issuedDate',
              'completedDate'
            ],
            include: [{
              model: db.User,
              as: 'Challenger',
              attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL']
            }, {
              model: db.User,
              as: 'Challenged',
              attributes: ['id', 'firstName', 'lastName', 'email', 'photoURL']
            }]
          })
          .then(function (challenges) {
            // console.log('successfully fetched all imposed challenges for user: ' + req.user.firstName);
            res.status(200).json(challenges);
          });
      });
    },

    getChallengeByID: function (req, res) {
      // console.log('/api/challenge/:id retrieving specific challenge');
      var id = req.query.id;
      db.Challenge.findOne({
          where: {
            id: id
          },
          attributes: {
            exclude: [
              'challengedUser',
              'challengerUser'
            ]
          }
        })
        .then(function (challenge) {
          // console.log('successfully retrieved challenge from db : ', challenge);
          res.status(200).json({
            challenge: challenge
          });
        });
    }

  };
};
