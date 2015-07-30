'use strict';

angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Menus',
	function($scope, $location, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = true;

		//show the menu bar again...
		$scope.$parent.menubarVisible = false;
		$scope.$on('$stateChangeSuccess', function () {
			//$scope.$parent.menubarVisible = false;
		});
	}
]);
