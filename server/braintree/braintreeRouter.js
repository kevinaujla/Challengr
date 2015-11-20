/*

braintreeRouter.js
specifying routes for braintreeRouter

*/

var authCtrl = require(__dirname + '/../auth/authCtrl.js')();

module.exports = function (app, db) {
  
  var braintreeController = require(__dirname + '/braintreeController.js')(db);

  app.get('/searchCustomer', authCtrl.authenticate, braintreeController.searchCustomer);
  app.get('/transactions', authCtrl.authenticate, braintreeController.transactions);
  app.get('/customersAll', authCtrl.authenticate, braintreeController.searchAllBraintreeCustomers);

  app.post('/checkout', braintreeController.checkout);
  app.post('/clientToken', authCtrl.authenticate, braintreeController.generateToken);
  app.post('/createCustomer', authCtrl.authenticate, braintreeController.createCustomer);
  app.post('/updateCustomer', authCtrl.authenticate, braintreeController.updateCustomer);
  app.post('/transaction', authCtrl.authenticate, braintreeController.transaction);

};
