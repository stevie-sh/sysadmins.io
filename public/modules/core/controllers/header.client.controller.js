'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$location', 'Authentication', 'Menus', '$state',
		function($scope, $location, Authentication, Menus, $state) {
			$scope.authentication = Authentication;

			// $scope.isCollapsed = false;
			$scope.loggedIn = $scope.authentication.user;
			// $scope.$parent.$parent.menubarVisible = true; 
			// $scope.menu = Menus.getMenu('topbar');

			$scope.toggleCollapsibleMenu = function() {
				$scope.isCollapsed = !$scope.isCollapsed;
			};

			$scope.$on('$stateChangeSuccess', function() {
				if ($scope.authentication.user) {	
					$scope.loggedIn = true;
				}

				if ($location.url() === '/chat') {
					if (!$scope.loggedIn) {
						$state.go('signin');
					}
				}
			});
		}
]);
