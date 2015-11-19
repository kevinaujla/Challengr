Style Guide & Commit Style
Logs & Comments
console logs should be the first thing after every function definition
log the arguments passed in if any and the name of the function 
Example of client code, generic comments almost every line except if doing same thing
  /***
  Explain at the top of each function, what it does
  ***/
  self.saveDriver = function(){
    // Console Log
    console.log('Save Driver...');
    // Show Loader
    LoadingService.showLoader();
    // Set Service Object
    CrashEventObj.crashEvent.crashDriver = self.crashDriver;
    // Reset Input Fields
    self.crashDriver = angular.copy(self.crashDriverMaster);
    // Show Success
    PopupService.showSuccess();
    // Hide Loader
    LoadingService.hideLoader();
    // Navigation
    $ionicSlideBoxDelegate.next();
  };
  Example of server code, note the generic comments on almost every line
  /***
    get ALL the users from the database and send back to the client
  ***/
  readAll : function(req, res, next){
    // Console Log
    console.log('Retreive all of Users...');
    // Create Promise
    var findAllUsers = Q.nbind(User.find, User);
    // Mongoose Query
    findAllUsers({}, 'username fname lname profileImgUrl')
      .then(function(allUsers){
        // Console Log
        console.log('All users from DB : ', allUsers);
        // Propogate Data to Client
        res.json({ data : allUsers });
      })
      .catch(function(err){
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      });
  }
