'use strict';

angular.module('chat').factory('TicketFactory', ['$http', function ($http) {
		var factory = {};
		factory.tickets = []; 
		factory.selectedTicket = {};
		factory.makeTicket = function () {
			$http.post('/api/ticket', {});	
		};
		
		return factory;
}]);	 
