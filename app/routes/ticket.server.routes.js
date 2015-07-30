'use strict';

var tickets = require('../../app/controllers/tickets.server.controller'),
		users = require('../../app/controllers/users.server.controller');


module.exports = function(app) {
	app.route('/api/sendmail')
		.post(tickets.sendEmail);

	app.route('/api/ticket/latest')
		.get(users.requiresLogin, tickets.latest);
	
	app.route('/api/ticket')
		// CREATE
		.post(users.requiresLogin, tickets.create)
		// LIST ALL	
		.get(users.requiresLogin, tickets.list);

	app.route('/api/ticket/:ticket_id')
		// READ 
		.get(users.requiresLogin, tickets.read)
		// UPDATE	
		.put(users.requiresLogin, tickets.update)
		// DELETE	
		.delete(users.requiresLogin, tickets.delete);	
};
