'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema({
	// Ticket model fields   
	// ...
});

mongoose.model('Ticket', TicketSchema);