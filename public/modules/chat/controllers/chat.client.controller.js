'use strict';

angular.module('chat').controller('ChatController', ['$scope', '$location', '$http', '$state', 'Authentication', 'Menus','TicketFactory',
		function($scope, $location, $http, $state, Authentication, Menus, Tickets) {
			$scope.authentication = Authentication;
			$scope.isCollapsed = false;

			$scope.submitTicket = function () {
				console.log("Submit Clicked");
				console.log($scope.ticket);
				var ticket = $scope.ticket;

				$scope.ticket.user = $scope.authentication.user;

				var req = {
					method: 'POST',
					url: '/api/ticket',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					data: { ticket: ticket }
				};

				$http(req).success(function () {
					console.log("SUCCESS!");

					var ticketHTML = "<h1>User submitted: " + ticket.user.email
					+	"<h2>Server Name: " + ticket.server.name + "</h2>"
					+ "<h3>Operating System: " + ticket.server.OS + "</h3>"
					+ "<h3>Hosting Service: " + ticket.hostingService + "</h3>"
					+ "<p>Problem: " + ticket.problem + "</p>";

					req = {
						method: 'POST',
						url: '/api/sendmail',
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						},
						data: { ticketHTML: ticketHTML, user: $scope.ticket.user }
					};
					$http(req);
					$state.go('servers');
				}).error(function () { return console.log("FAIL!");});
			};


			//show the menu bar again...
			// $scope.$parent.menubarVisible = false;
			// $scope.$on('$stateChangeSuccess', function () {
			// 	//$scope.$parent.menubarVisible = false;
			// });
		}
]);
