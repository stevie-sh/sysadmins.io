'use strict';

var mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		Ticket = mongoose.model('Ticket'),
		_ = require('lodash');

var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

var transporter = nodemailer.createTransport(ses({
	accessKeyId: process.env.ACCESS_KEY_ID, 
	secretAccessKey: process.env.SECRET_ACCESS_KEY 
}));

exports.sendEmail = function(req, res) {
	transporter.sendMail({
		from: 'rivanov@sysadmins.io',
		to: 'rivanov@gmail.com',
		subject: 'New ticket created',
		html: req.body.ticketHTML
	}, function(error, responseStatus){
		if (error)
			console.log(error);		
		else{
			console.log(responseStatus.message); // response from the server
			console.log(responseStatus.messageId); // Message-ID value used
		}
	});


	res.status(200).send();
};


exports.latest = function(req, res) {
	Ticket.findOne({}, {}, { sort: { 'created_at' : -1 } }, 
			function(err, ticket) {
				res.json(ticket);
			});
};


exports.create = function(req, res) {
	console.log(req.body.ticket);	
	var ticket = new Ticket(req.body.ticket);
	ticket.save(function(err){
		if (err) res.send(err);
		res.status(201).json({ message: 'Ticket Successfully Created' });
	});
};

exports.read = function(req, res) {
	Ticket.findById(req.params.ticket_id, function(err, ticket)
			{
				if (err) res.send(err);
				res.json(ticket);
			});
};

exports.update = function(req, res) {
	Ticket.findById(req.params.ticket_id, function (err, ticket) {
		if (err) res.send(err);

		ticket.questions = req.body.ticket.questions;	
		ticket.responses = req.body.ticket.responses;

		ticket.save(function (err) {
			if (err) res.send(err);
			res.json( { message : "Ticket updated!" });	
		});	
	});
};

exports.delete = function(req, res) {
	Ticket.remove(
			{ _id : req.params.ticket_id },			
			function(err) {
				if (err) res.send(err);
				res.json( { message : "Successfully deleted ticket" } );	
			});
};

exports.list = function(req, res) {
	Ticket.find(function(err, tickets) {
		if (err) res.send(err);
		res.json(tickets);
	});
}
