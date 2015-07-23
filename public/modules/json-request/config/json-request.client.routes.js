'use strict';

//Setting up route
angular.module('json-request').config(['$stateProvider',
	function($stateProvider) {
		// Json request state routing
		$stateProvider.
		state('json-request', {
			url: '/json-request',
			templateUrl: 'modules/json-request/views/json-request.client.view.html'
		});
	}
]);