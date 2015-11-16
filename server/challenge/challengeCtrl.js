/*

challengeCtrl.js
configuring routes for challengeRouter

 */

// import database models
var Challenge = db.import(__dirname + '/../../database/model/challenge.js');

module.exports = {
  create: function (req, res) {
    // Console Log
    console.log('/api/challenge/create is being called with body: ' + req.body);
    // pull out data
    var challenger = req.user;
    var challenged = req.body.challenged;
    var title = req.body.title;
    var description = req.body.description;
    var type = req.body.type;
    var charity_amount = req.body.amount;
    var issued = new Date();
    var expires = new Date();
    // expires in 24 hours
    expires.setDate(expires.getDate()+1);
  }
};
