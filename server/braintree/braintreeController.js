/*

authController.js
configuring routes for authRouter

*/

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
    console.log('Generate braintree client token and send back to user... with customer : ', req.body.id);
    // generate token
    gateway.clientToken.generate({
      customerId: req.body.id
    }, function (err, response) {
      // propogate token to client
      console.log('generated token...');
      res.send(response.clientToken);
    });
  },

  checkout: function(req, res){
    // console log
    console.log('Receive payment method nonce from client : ', req.body.nonce, ' and generate a transaction...', req.body);
    // create transaction
    gateway.transaction.sale({
      amount : 24.00,
      paymentMethodNonce: req.body.nonce,
    }, function(err, result){
      if (err) {
        console.log('error creating transaction...', err);
      }
      // propogate result to client
      res.json(result);
    });
  },

  /*
    Create a new customer with a payment method
    (First time checkout)
  */
  createCustomer: function(req, res){
    // console log
    console.log('create new braintree customer... ', req.body);
    // get user object
    var user = req.body.user;

    // // Check if the customer already exists or not
    // searchCustomer(req);

    // create new customer
    gateway.customer.create({
      firstName: user.firstName,
      lastName: user.lastName,
      // company: "Braintree",
      email: user.email
    }, function (err, result) {
      if (err) {
        console.log('error creating customer : ', err);
      }
      // propogate result to client
      res.json(result);
      // result.success; // true
      // result.customer.id; // e.g 160923
      // result.customer.paymentMethods[0].token; // e.g f28wm
    });

  },

  /*
    1:1 model of customer to credit card
  */  
  updateCustomer: function(req, res){
    // console log
    console.log('update customer...');
    // get user object
    var user = req.body.user;
    gateway.customer.find(user.customer.id, function (err, customer) {
      var token = customer.creditCards[0].token;
    });
  }, 

  /*
    Search if customer exists
  */
  searchCustomer: function(req, res){
    console.log('SEARCH for braintree customer...');
    console.log('req.user : ', req.user);
    var stream = gateway.customer.search(function (search) {
      search.email().is(req.user.email);
      search.firstName().is(req.user.firstName);
      search.lastName().is(req.user.lastName);
    }, function (err, response) {
      response.each(function (err, customer) {
        if (err) {
          console.log('error searching for customer...', err);
        } else{
          console.log('found customer : ', customer.firstName);
          res.json({braintreeUser : customer});
        }
      });
    });
  },

  transaction: function(req, res){
    console.log('store transaction into database...');

  },

};
