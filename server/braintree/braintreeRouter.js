/*

braintreeRouter.js
specifying routes for braintreeRouter

*/

var braintreeController = require(__dirname + '/braintreeController.js');
var authCtrl = require(__dirname + '/../auth/authCtrl.js')();

module.exports = function (app) {
  // app === braintreeRouter injected from server.js
  
  app.get('/searchCustomer', authCtrl.authenticate, braintreeController.searchCustomer);

  app.post('/checkout', braintreeController.checkout);
  app.post('/clientToken', authCtrl.authenticate, braintreeController.generateToken);
  app.post('/createCustomer', authCtrl.authenticate, braintreeController.createCustomer);
  app.post('/updateCustomer', authCtrl.authenticate, braintreeController.updateCustomer);
  app.post('/transaction', authCtrl.authenticate, braintreeController.transaction);

};
