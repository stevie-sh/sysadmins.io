'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		_ = require('lodash'),
		JsonRequest = mongoose.model('JsonRequest'),
		url = 'https://api.typeform.com/v0/form/jjQYDx?key=e2e83155e4048a263195c43a086a1b91a2eb984e&completed=true',
		request = require('request');

/**
 * Create a Json request
 */
exports.create = function(req, res) {
};

/**
 * Show the current Json request
 */
exports.read = function(req, res) {
	url='https://api.typeform.com/v0/form/jjQYDx?key=e2e83155e4048a263195c43a086a1b91a2eb984e&since=' + Date.now(); 
	request.get( { url: 'http://localhost:3000/json', json: true }, function(response, body){
			res.json(body.body);		
	});	

};

/**
 * Update a Json request
 */
exports.update = function(req, res) {

};

/**
 * Delete an Json request
 */
exports.delete = function(req, res) {

};

/**
 * List of Json requests
 */
exports.list = function(req, res) {
	// Get JSON from 3rd party API, and format correctly	
	request.get({url:url, json:true} , function (response, body) {
		console.log(url);	
		var typeform = new JsonRequest(body);	// Create a new JsonRequest mongoose model from the given body's JSON
		typeform.save();	// Write to the DB
		res.json(typeform);		// Send JSON response back to the client
	});
};
