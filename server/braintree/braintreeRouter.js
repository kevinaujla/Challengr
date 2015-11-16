/*

braintreeRouter.js
specifying routes for braintreeRouter

*/

var braintreeController = require('./braintreeController.js');

module.exports = function (app) {
  // app === braintreeRouter injected from server.js

  app.get('/clientToken', braintreeController.generateToken);

  app.post('/checkout', braintreeController.checkout);
  
  app.post('/createCustomer', braintreeController.createCustomer);
  app.post('/updateCustomer', braintreeController.updateCustomer);

};
