'use strict';

angular.module('servers').controller('ServersController', ['$scope', '$location', '$http', 'Authentication', 'Menus','TicketFactory', '$state', 'ServersFactory',
		function($scope, $location, $http, Authentication, Menus, TicketFactory, $state, ServersFactory) {
			$scope.authentication = Authentication;
			$scope.TicketFactory = TicketFactory;
			
			$scope.isCollapsed = false;
			$scope.currentUser = { 'user._id': Authentication.user._id };

			// Call /api/ticket, and set TicketFactory.ticket	
			ServersFactory.getTickets().then(function () {
					$scope.tickets = TicketFactory.tickets;	
					console.log(TicketFactory.tickets);	
			});
			$scope.goToChatRoom = function (item) {
				console.log('GoToChatRoom');
				$scope.TicketFactory.selectedTicket = item;	
				console.log(TicketFactory.selectedTicket);	
				$state.go('chat', { "ticket_id": TicketFactory.selectedTicket._id });		
			};

		}]);
