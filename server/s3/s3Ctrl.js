/*

s3Ctrl.js
configuring routes for s3Router

 */

var aws = require('aws-sdk');

module.exports = {
  signRequest: function (req, res) {
    // console log
    console.log('/sign_s3 signing s3 request');
    // set config variables
    aws.config.update({
      accessKeyId: process.env.AWS_ACESS_KEY,
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
        // respond to client
        res.json(returnData);
      }
    });
  }
};
