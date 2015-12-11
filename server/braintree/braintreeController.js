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

module.exports = function (db) {

  var braintreeObj = {
    generateToken: function (req, res) {
      console.log('Generate braintree client token : ', req.body.id);
      // generate token
      gateway.clientToken.generate({
        customerId: req.body.id
      }, function (err, response) {
        // propogate token to client
        // console.log('generated braintree client token...');
        res.send(response.clientToken);
      });
    },

    checkout: function (req, res) {
      console.log('payment method nonce : ', req.body.nonce, ' generate transaction :', req.body.charityAmount);
      // create transaction
      gateway.transaction.sale({
        amount: req.body.charityAmount,
        paymentMethodNonce: req.body.nonce,
      }, function (err, result) {
        if (err) {
          console.log('error searching for customer...', err);
        }
        // propogate result to client
        res.json(result);
      });
    },

    /*
      Create a new customer with a payment method (First time checkout)
    */
    createCustomer: function (req, res) {
      // get user object
      var user = req.body.user;
      // Check if the customer already exists or not
      var stream = gateway.customer.search(function (search) {
        search.email().is(user.email);
        search.firstName().is(user.firstName);
        search.lastName().is(user.lastName);
      }, function (err, response) {
        // create new customer
        if (response.ids.length === 0) {
          gateway.customer.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }, function (err, result) {
            if (err) {
              console.log('error creating customer : ', err);
            }
            res.json({ braintreeUser: result.customer });
          });
        } else {
          response.each(function (err, customer) {
            if (err) {
              console.log('error looping through braintree customers');
            }
            // customer is the object
            res.json({ braintreeUser: customer }).end();
          });
        }

      });

    },

    /*
      1:1 model of customer to credit card
    */
    updateCustomer: function (req, res) {
      console.log('update customer');
      // get user object
      var user = req.body.user;
      gateway.customer.find(user.customer.id, function (err, customer) {
        var token = customer.creditCards[0].token;
      });
    },

    /*
      Search if customer exists
    */
    searchCustomer: function (req, res) {
      console.log('search for braintree customer : ', req.user.email, req.user.firstName, req.user.lastName);

      var stream = gateway.customer.search(function (search) {
        search.email().is(req.user.email);
        search.firstName().is(req.user.firstName);
        search.lastName().is(req.user.lastName);
      }, function (err, response) {

        // will not work if doing response[0]
        response.each(function (err, customer) {
          if (err) {
            console.log('error searching braintree customer...', err);
            res.status(404).end(err);
          }
          console.log('this message should appear once, braintree customer found, : ', customer.firstName);
          res.json({ braintreeUser: customer });
        });

      });

    },

    transaction: function (req, res) {
      console.log('store transaction into database user : ', req.user.email);
      // query for user with email(unique)
      db.User.findOne({
          where: {
            email: req.user.email
          }
        })
        .then(function (user) {
          console.log('found user : ', user.firstName);
          // store the transaction
          db.Transaction.create({
              transactionId: req.body.transaction.id,
              amount: req.body.transaction.amount,
              created: req.body.transaction.createdAt,
              last4: req.body.transaction.creditCard.last4,
              imgUrl: req.body.transaction.creditCard.imageUrl,
            })
            .then(function (transaction) {
              user.addTransaction(transaction);
              res.status(200).end();
            })
            .catch(function (err) {
              console.log('err : ', err);
            });
        });
    },

    transactions: function (req, res) {
      // query for user with email(unique)
      db.User.findOne({
          where: {
            email: req.user.email
          }
        })
        .then(function (user) {
          return user.getTransactions()
            .then(function (transactions) {
              res.json({ transactions: transactions });
            })
            .catch(function (err) {
              console.log('error finding transactions...', err);
            });
        })
        .catch(function (err) {
          console.log('error finding user...', err);
        });
    },

    searchAllBraintreeCustomers: function (req, res) {
      console.log('searching all braintree customers...');
      var today = new Date();
      var stream = gateway.customer.search(function (search) {
        search.createdAt().min(today.getDate() - 30);
      }, function (err, response) {
        if (err) {
          console.log('ERROR retreiving all braintree customers : ', err);
        } else {
          console.log('BRAINTREE CUSTOMERS : ', response.ids);
          res.json(response.ids);
        }
      });
    },

    deleteBraintreeCustomer: function (req, res) {
      console.log('deleting customer : ', req.body.user_id);
      gateway.customer.delete(req.body.user_id, function (err, response) {
        // err;
        console.log('error deleting customer : ', err);
        res.status(200).end();
      });
    },

  };

  return braintreeObj;

};
