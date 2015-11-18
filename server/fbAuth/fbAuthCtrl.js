/*

fbAuthCtrl.js
configuring routes for fbAuthRouter

*/

module.exports = function (db) {
  return {
    ensureAuthenticated: function (req, res, next) { // make sure user auth is valid, use this for anything that needs to be protected
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/signin')
    },

    fetchUserInfoFromFB: function (req, res) { // Get User info from FB
      var fbUserInfo = {
        "fbId": res.req.user.id,
        "fbUserName": res.req.user.displayName,
        "fbPicture": res.req.user.photos[0].value,
      };

      res.cookie('facebook', fbUserInfo); // Set user info in cookies

      this.postUserInfo(fbUserInfo);

      res.redirect('/');
    },

    postUserInfo: function (userInfo) { // post user info to our db
      console.log(userInfo);
    },
  };
};
