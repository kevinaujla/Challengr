
    // ensureAuthenticated = function (req, res, next) { // make sure user auth is valid, use this for anything that needs to be protected
    //   if (req.isAuthenticated()) {
    //     return next();
    //   }
    //   res.redirect('/login')
    // },

    // fetchUserInfoFromFB = function (req, res) { // Get User info from FB
    //   var fbUserInfo = {
    //     "fbId": res.req.user.id,
    //     "fbUserName": res.req.user.displayName,
    //     "fbPicture": res.req.user.photos[0].value,
    //   };

    //   res.cookie('facebook', fbUserInfo); // Set user info in cookies

    //   exports.postUserInfo(fbUserInfo);

    //   res.redirect('/');
    // },

    // postUserInfo = function (userInfo) { // post user info to our db
    //   var userCreate = Q.nbind(User.findOrCreate, User);
    //   var newUser = {
    //     'user_fb_id': userInfo.fbId,
    //     'username': userInfo.fbUserName,
    //     'photo': userInfo.fbPicture
    //   };
    //   userCreate(newUser);
    // },

