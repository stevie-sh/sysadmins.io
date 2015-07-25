'use strict';

var json = require('../../app/controllers/json-request.server.controller');
var express = require('express');
var app = express();
var request = require('request');
var url = 'https://api.typeform.com/v0/form/jjQYDx?key=e2e83155e4048a263195c43a086a1b91a2eb984e&completed=true';	
var mongoose = require('mongoose'),
		JsonRequest = mongoose.model('JsonRequest');

module.exports = function(app) {
	app.get('/json', function(req, res) {
			//request.get( {url: url, json: true} ).pipe(res);
				// Get JSON from 3rd party API, and format correctly	
				request.get({url:url, json:true} , function (response, body) {
				res.send(body);		// Send JSON response back to the client
				var typeform = new JsonRequest(body);	// Create a new JsonRequest mongoose model from the given body's JSON
				typeform.save();	// Write to the DB
		});
		});
};
