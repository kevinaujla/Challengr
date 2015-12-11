/*

server.js
configuring routes for charityRouter

*/

var aws = require('aws-sdk');

module.exports = function (db) {
  return {
    /***
    Getting signed AWS request for AWS
    ***/
    signRequest: function (req, res) {
      // console.log('/sign_s3 signing s3 request : ', req.query);
      // set config variables
      aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      });
      aws.config.update({
        region: process.env.AWS_REGION,
        signatureVersion: 'v4'
      });
      var s3 = new aws.S3();
      var s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
      };
      s3.getSignedUrl('putObject', s3Params, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var returnData = {
            signedRequest: data,
            url: 'https://' + process.env.S3_BUCKET + '.s3-website-us-west-2.amazonaws.com/' + req.query.file_name
          };
          res.json(returnData);
        }
      });
    },

    /***
      Uploading images to AWS S3
    ***/
    upload: function (req, res) {
      aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      });
      aws.config.update({
        region: process.env.AWS_REGION
      });
      // Define AWS S3 Bucket
      var s3Bucket = new aws.S3({
        params: {
          Bucket: process.env.S3_BUCKET
        }
      });
      // Create Buffer
      var imageBuffer = new Buffer(req.body.imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      var userURL = 'profileImages/' + req.body.imgName + '/profileImg.png';

      // Define Upload Params
      var data = {
        Key: userURL,
        Body: imageBuffer,
        ContentEncoding: 'base64',
        ContentType: 'image/png'
      };

      // S3 Bucket Upload
      s3Bucket.upload(data, function (err, data) {
        if (err) {
          console.log('ERROR : ', err);
        } else {
          // console.log('S3 image url : ', data.Location);
          var location = data.Location;
          res.json({
            imageURL: location
          });
        }
      });
    }
  };
};
