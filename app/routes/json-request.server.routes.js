'use strict';

var json = require('../../app/controllers/json-request.server.controller');

module.exports = function(app) {
	app.route('/json')
			.get(json.list);
	app.route('/json/latest')
		.get(json.read);	
	
// 	app.get('/json', function(req, res) {
// 				// Get JSON from 3rd party API, and format correctly	
// 				request.get({url:url, json:true} , function (response, body) {
// 				res.send(body);		// Send JSON response back to the client
// 				var typeform = new JsonRequest(body);	// Create a new JsonRequest mongoose model from the given body's JSON
// 				typeform.save();	// Write to the DB
// 		});
// 		});
};
