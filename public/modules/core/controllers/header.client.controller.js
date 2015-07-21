'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$location', 'Authentication', 'Menus',
	function($scope, $location, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.$parent.$parent.menubarVisible = true; 
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
		console.log($location.url());	
		if ($location.url() === '/chat') 
			{
				$scope.isCollapsed = true;
				$scope.$parent.$parent.menubarVisible = false; 
			}
		});
	}
]);
