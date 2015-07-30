'use strict';

angular.module('chat').controller('ChatController', ['$scope', '$location', '$http', 'Authentication', 'Menus','TicketFactory', 
		function($scope, $location, $http, Authentication, Menus, Tickets) {
			$scope.authentication = Authentication;
			$scope.isCollapsed = true;	

			$scope.submitTicket = function () {
				console.log("Submit Clicked");
				console.log($scope.ticket);
				$scope.ticket.user = $scope.authentication.user;	


				var req = {
					method: 'POST',
					url: '/api/ticket',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					data: { ticket: $scope.ticket  }
				};

				$http(req).success(function () {
					console.log("SUCCESS!");
				}).error(function () { return console.log("FAIL!");});

				// req = {
				// 	mthod: 'POST',
				// 	url: '/api/sendmail'
				// };
				// $http(req);
			};



			//show the menu bar again...
			$scope.$parent.menubarVisible = false;
			$scope.$on('$stateChangeSuccess', function () {
				//$scope.$parent.menubarVisible = false;
			});
		}
]);
