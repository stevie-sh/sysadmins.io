'use strict';


angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
	function($scope, $state, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.current = $state.current;
	}
]);
