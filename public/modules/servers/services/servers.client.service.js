'use strict';

angular.module('servers').factory('ServersFactory', ['$http', 'TicketFactory', 

		function ($http, TicketFactory) {
			var servers = {};

			servers.getTickets = function () {
				var req = {
					method: 'GET',
					url: '/api/ticket',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					data: {}
				};
				return $http(req).success(function (data) {
					TicketFactory.tickets = data;
				})
				.error(function(){ console.log('FAIL'); });

			};

			return servers;
		}]);
