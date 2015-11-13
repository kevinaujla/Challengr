/*

  Test


*/

var mockModule = require('./mocked-backend');

describe('Protractor Demo App', function() {
  it('should have a title', function() {

    var user = browser.get('/events');

    expect(user.username).toEqual('Jordan');
  });
});