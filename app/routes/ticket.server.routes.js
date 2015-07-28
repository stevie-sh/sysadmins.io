'use strict';

var tickets = require('../../app/controllers/tickets.server.controller');	

module.exports = function(app) {
	app.route('/api/ticket/latest')
		.get(tickets.latest);
	
	app.route('/api/ticket')
		// CREATE
		.post(tickets.create)
		// LIST ALL	
		.get(tickets.list);

	app.route('/api/ticket/:ticket_id')
		// READ 
		.get(tickets.read)
		// UPDATE	
		.put(tickets.update)
		// DELETE	
		.delete(tickets.delete);	
};
