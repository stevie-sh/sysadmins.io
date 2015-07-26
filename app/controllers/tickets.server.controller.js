'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ticket = mongoose.model('Ticket'),
	_ = require('lodash');

exports.create = function(req, res) {
	console.log(req.body.ticket);	
	var ticket = new Ticket(req.body.ticket);
	ticket.save(function(err){
		if (err) res.send(err);
		res.status(201).json({ message: 'Ticket Successfully Created' });
	});
};

exports.read = function(req, res) {
	return null;
};

exports.update = function(req, res) {
	return null;
};

exports.delete = function(req, res) {
	return null;
};

exports.list = function(req, res) {
};

