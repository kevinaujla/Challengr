/*

authController.js
configuring routes for authRouter

*/

// load environment variables from .env file
require('dotenv').config({path : __dirname + '/../../.env'});
// promise library to avoid callback hell
var Promise = require('bluebird');
// braintree payment API
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.merchantId,
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey
});

module.exports = {

  generateToken: function (req, res) {
    // console log
    console.log('Generate braintree client token and send back to user...');
    // generate token
    gateway.clientToken.generate({}, function (err, response) {
      // propogate token to client
      res.send(response.clientToken);
    });
  },

  checkout: function(req, res){
    // console log
    console.log('Receive payment method nonce from client : ', req.body.payment_method_nonce, ' and generate a transaction...');
    // get payment nonce
    var nonce = req.body.payment_method_nonce;
    var payment = req.body.payment;
    // create transaction
    gateway.transaction.sale({
      amount : payment.amount,
      paymentMethodNonce: nonce
    }, function(err, result){
      if (err) {
        console.log('error creating transaction...', err);
      }
      // propogate result to client
      res.json(result);
    });
  }   

};
