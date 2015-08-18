'use strict';

angular.module('servers').controller('ServersController', ['$scope', '$location', '$http', 'Authentication', 'Menus','TicketFactory',
        function($scope, $location, $http, Authentication, Menus, Tickets) {
            $scope.authentication = Authentication;
            $scope.isCollapsed = false;
						var req = {
							method: 'GET',
							url: '/api/ticket',
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							},
							data: {}
						};
						$http(req).success(function (data) {
							console.log(data);
							$scope.whatever = data;
						}).error(function(){ console.log('FAIL') });
            $scope.currentUser = { 'user._id': Authentication.user._id };
}]);
