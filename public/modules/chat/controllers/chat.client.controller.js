'use strict';

angular.module('chat').controller('ChatController', ['$scope', '$location', '$http', 'Authentication', 'Menus','$state', 
		function($scope, $location, $http, Authentication, Menus, $state) {
		$scope.authentication = Authentication;
			$scope.isCollapsed = false;

			$scope.submitTicket = function () {
				console.log('Submit Clicked');
				var ticket = $scope.ticket;

				$scope.ticket._user = $scope.authentication.user._id;	
				var req = {
					method: 'POST',
					url: '/api/ticket',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					data: { ticket: ticket }
				};

				$http(req).success(function () {
				var ticketHTML = "<h1>User submitted: " + $scope.authentication.user.email
					+	"<h2>Server Name: " + ticket.server.name + "</h2>"
					+ "<h3>Operating System: " + ticket.server.OS + "</h3>"
					+ "<h3>Hosting Service: " + ticket.hostingService + "</h3>"
					+ "<h3>Problem: " + ticket.problem + "</h3>" 
					+ "<h3>Add 'sysadminsio' on Skype to access the chat client during our beta period</h3>";

					req = {
						method: 'POST',
						url: '/api/sendmail',
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						},
						data: { ticketHTML: ticketHTML, user: $scope.authentication.user }
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
