'use strict';

angular.module('json-request').controller('JsonRequestController', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/json').
			success(function (data, status, headers, config) {
				console.log(data);	
							
				$scope.data = data;			
				$scope.status = status;	
			});
			//failure(function (data, status, headers, config) {
			//	$scope.data = data || 'Request Failed';
			//	$scope.status = status;
			//});
	}
]);
