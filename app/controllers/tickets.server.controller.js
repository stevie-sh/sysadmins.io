'use strict';

var tickets = require('../../app/controllers/tickets.server.controller');

var mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		Ticket = mongoose.model('Ticket'),
		_ = require('lodash'),
		chalk = require('chalk');

var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

var transporter = nodemailer.createTransport(ses({
	accessKeyId: process.env.ACCESS_KEY_ID, 
	secretAccessKey: process.env.SECRET_ACCESS_KEY 
}));

exports.sendEmail = function(req, res) {
	//send from webmaster to webmaster
	transporter.sendMail({
		from: process.env.WEBMASTER,  //webmaster
		to: process.env.WEBMASTER, 
		subject: 'Sysadmins.io: New Ticket Created!',
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

	//send from webmaster to auth user
	transporter.sendMail({
		from: process.env.WEBMASTER, 
		to: req.body.user.email,
		subject: 'Sysadmins.io: New Ticket Created!',
		html: req.body.ticketHTML
	}, function(error, responseStatus){
		if (error)
			console.log(error);		
		else{
			console.log(responseStatus.message); // response from the server
			console.log(responseStatus.messageId); // Message-ID value used
		}
	});
	console.log('dumping here\n\n\n');
	console.log(req.body.user.email);
	res.status(200).send();

};


exports.latest = function(req, res) {
	Ticket.findOne({}, {}, { sort: { 'created_at' : -1 } }, 
			function(err, ticket) {
				res.json(ticket);
			});
};


exports.tryParseJSON = function (ticket) {
	if (!ticket) {
		return null;
	}
	else
	{
		try {
			return JSON.parse(JSON.stringify(ticket));
		}
		catch (e) {
			console.log(chalk.red(e));
			return undefined;	
		}	
	}
};

exports.create = function(req, res) {
	var ticketJSON = req.body.ticket;

	if (tickets.tryParseJSON(ticketJSON)) {
		var ticket = new Ticket(ticketJSON);
		ticket.save(function(err){
			if (err) res.send(err);
			res.status(201).json({ message: 'Ticket Successfully Created' });
		});
	}
	else {
		res.status(500).json({ message: 'Ticket Creation Failed due to invalid JSON' });	
	}
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
			res.json( { message : 'Ticket updated!' });	
		});	
	});
};

exports.delete = function(req, res) {
	Ticket.remove(
			{ _id : req.params.ticket_id },			
			function(err) {
				if (err) res.send(err);
				res.json( { message : 'Successfully deleted ticket' } );	
			});
};

exports.list = function(req, res) {
	Ticket.find(function(err, tickets) {
		if (err) res.send(err);
		res.json(tickets);
	});
};
