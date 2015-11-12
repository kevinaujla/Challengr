Style Guide & Commit Style
Logs & Comments
console logs should be the first thing after every function definition
log the arguments passed in if any and the name of the function 
Example of client code, generic comments almost every line except if doing same thing
  /***
  Explain at the top of each function, what it does
    After manually entering the crash driver's information
    save the crash user obj into the CrashEventObj.crashEvent object
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
  
Art of Commit Messages
Layout
        [type] : \<subject>
        \<body>
        \<footer> 
Allowed Values for \<type>
- feat (new feature)
- fix (bug fix)
- docs (changes to documentation)
- style (formatting, missing semi colons, etc; no code change)
- refactor (refactoring production code)
- test (adding missing tests, refactoring tests; no production code change)
- chore (updating grunt tasks etc; no production code change)
- library (adding any kind of dependencies or library code to production code)
Subject
Use an imperative tone for your commit messages conveying what a commit does, rather than what it did. Ex. **change** rather than **changed** or **changes**
Example: 
        [docs]: add README.md
        [refactor]: remove unused container element       
The Body
The body, just like the subject, should use an imperative tone. You do not necessarily have to use the body, but you may if you think it further clears your point.
ex: git commit -m "Subject" -m "Body"
