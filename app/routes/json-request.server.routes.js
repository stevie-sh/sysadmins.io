'use strict';

var json = require('../../app/controllers/json-request.server.controller');
var express = require('express');
var app = express();
var request = require('request');
var url = 'https://api.typeform.com/v0/form/jjQYDx?key=e2e83155e4048a263195c43a086a1b91a2eb984e&completed=true';	
var mongoose = require('mongoose'),
    _ = require('lodash'),
		JsonRequest = mongoose.model('JsonRequest');

module.exports = function(app) {
	app.get('/json', function(req, res) {
			//request.get( {url: url, json: true} ).pipe(res);
			request.get({url:url, json:true} , function (response, body) {
				res.send(body);
				var typeform = new JsonRequest(body);
				typeform.save();
		});
		});
};
