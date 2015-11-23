/*

s3Factory.js
handles image upload to s3 bucket

*/

angular.module('App.s3Factory', [])

.factory('s3Factory', ['$http', function ($http) {

  var getSignedRequest = function (file) {
    return $http({
      method: 'GET',
      url: ('/api/s3/sign_s3?file_name=' + file.name + '&file_type' + file.type),
    }).then(function (resp) {
      console.log('receiving from getSignedRequest: ' + resp.data);
      return resp.data;
    });
  };

  var uploadFile = function (file, signedRequest) {
    return $http({
      method: 'PUT',
      url: signedRequest,
      headers: {
        'x-amz-acl': 'public-read'
      },
      data: file
    }).then(function (resp) {
      console.log('receiving from uploadFile to s3: ' + resp.data);
      return resp.data;
    });
  };

  var updatePicture = function (imageData, description) {
    console.log('imageData : ', imageData);
    console.log('description : ', description);
    return $http({
      method: 'POST',
      url: '/api/s3/upload',
      data : ({ imgName : description, imageData: imageData }),
    }).then(function (resp) {
      return resp.data;
    });
  };

  return {
    getSignedRequest: getSignedRequest,
    uploadFile: uploadFile,
    updatePicture: updatePicture,
  };

}]);
