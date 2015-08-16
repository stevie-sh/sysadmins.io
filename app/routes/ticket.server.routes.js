'use strict';

var tickets = require('../../app/controllers/tickets.server.controller'),
		users = require('../../app/controllers/users.server.controller');


module.exports = function(app) {
	app.route('/api/sendmail')
		.post(users.requiresLogin, tickets.sendEmail);

	app.route('/api/ticket/latest')
		.get(users.requiresLogin, tickets.latest);
	
	app.route('/api/ticket')
		// CREATE
		.post( tickets.create)
		// LIST ALL	
		.get( tickets.list);

	app.route('/api/ticket/:ticket_id')
		// READ 
		.get( tickets.read)
		// UPDATE	
		.put(users.requiresLogin, tickets.update)
		// DELETE	
		.delete(users.requiresLogin, tickets.delete);	
};
