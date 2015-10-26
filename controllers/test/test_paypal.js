var Paypal = require('../paypal');
var should = require('chai').should();
describe('Braintree Token', function () {
	var testToken;
	before(function (done) {
		Paypal.getClientToken(function (token) {
			testToken = token;
			done();
		});
	});
	it('Braintree Service is up and running token received', function () {
		testToken.should.be.a('string');
	});
});


describe('Braintree Plans', function () {
	var testPlans;
	before(function (done) {
		Paypal.getPlansAvailable(function (plans) {
			testPlans = plans;
			done();
		});
	});
	it('Braintree Service is up and running plans received', function () {
		testPlans.should.be.a('array');
	});
});


describe('Create a Braintree subscription', function () {
	var subscription;
	before(function (done) {
		var nonce = 'b0ee1e1b-ffe2-4425-81ff-b5edac5c1b7f';
		var plan = 'r9r2';
		Paypal.createSubscription(plan, nonce, function (response) {
			subscription = response;
			done();
		});
	});

	it('Braintree Service is up and running plans received', function () {
		subscription.should.be.a('string');
	});

});
