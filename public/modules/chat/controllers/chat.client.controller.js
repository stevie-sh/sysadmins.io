'use strict';

angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Menus','TicketFactory', 
	function($scope, $location, Authentication, Menus, Tickets) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = true;	

		$scope.submitTicket = function () {
			console.log("Submit Clicked");
			console.log($scope.ticket);
		};

		//show the menu bar again...
		$scope.$parent.menubarVisible = false;
		$scope.$on('$stateChangeSuccess', function () {
			//$scope.$parent.menubarVisible = false;
		});
	}
]);
