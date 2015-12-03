/*

server.js
configuring routes for charityRouter

*/

module.exports = function (db) {
  return {
    retrieveAll: function (req, res) {
      db.Charity.findAll({
        raw: true
      }).then(function (charities) {
        res.json(charities);
      });
    }
  };
};
