'use strict';

angular.module('chat').factory('TicketFactory', ['$http', function ($http) {
		var factory = {};

		factory.log = function () { console.log('TicketFactory'); };
		factory.makeTicket = function () {
			$http.post('/api/ticket', {});	
		};
		factory.newTicket = function (){
			return undefined;	
		};
		
		return factory;
}]);	 
