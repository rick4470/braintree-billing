var express = require('express');
var router = express.Router();
var Paypal = require('../controllers/paypal');

/* GET home page. */
router.get('/', function (req, res, next) {
	var response = {};
	Paypal.getClientToken(function (token) {
		if (token) {
			response.token = token;
			Paypal.getPlansAvailable(function (plans) {
				if (plans) {
					response.plans = plans;
					res.render('index', {
						page: 'home',
						data: response
					});
				}
			});
		}
	});
});

/* POST Value for subscription */
router.post('/subscribe', function (req, res) {
	var nonce = req.body.payment_method_nonce;
	var plan = req.body.plan;
	if (nonce && plan) {
		Paypal.createSubscription(plan, nonce, function (subscribed) {
			if (subscribed) {
				res.render('index', {
					page: 'subscribed',
					data: JSON.stringify(subscribed, null, 3)
				});
			} else {
				// TODO: Something went wrong report back to user
				res.status(404).send('Service is not avialble at this time');
			}
		});
	} else {
		res.status(401).send('Unauthorized!');
	}
});

module.exports = router;
