/*

braintreeRouter.js
specifying routes for braintreeRouter

*/

var authCtrl = require(__dirname + '/../auth/authCtrl.js')();

module.exports = function (app, db) {
  
  var braintreeController = require(__dirname + '/braintreeController.js')(db);

  app.get('/searchCustomer',braintreeController.searchCustomer);
  app.get('/transactions', braintreeController.transactions);
  app.get('/customersAll', braintreeController.searchAllBraintreeCustomers);
  
  app.post('/customerDelete', braintreeController.deleteBraintreeCustomer);
  app.post('/checkout', braintreeController.checkout);
  app.post('/clientToken', braintreeController.generateToken);
  app.post('/createCustomer', braintreeController.createCustomer);
  app.post('/transaction', braintreeController.transaction);

};
