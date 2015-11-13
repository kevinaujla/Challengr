exports.httpBackendMock = function() {

  angular.module('httpBackendMock', ['App', 'ngMockE2E'])
  .run(function($httpBackend) {
    
    console.log('Test platform bootstrapping');  

    $httpBackend.whenGET('/login')
      .respond({user: 'fooBarBaz', roles: ['admin', 'user']});

    // allow views directory to go to real $http
    $httpBackend.whenGET(/^\/views\//).passThrough();      
    
    console.log('Test platform bootstrapping ... done');
  });
  
};

// angular.module('App.testing', ['ngMockE2E'])
//   .run(function($httpBackend) {
      
//     $httpBackend.whenGET('/login')
//       .respond({user: 'fooBarBaz', roles: ['admin', 'user']});


//     // we have a real /api/customer service, let it through
//     $httpBackend.whenGET(/^/api/customers//).passThrough();
// });