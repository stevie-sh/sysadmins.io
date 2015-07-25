'use strict';

//Setting up route
angular.module('servers').config(['$stateProvider',
	function($stateProvider) {
		// Servers state routing
		$stateProvider.
		state('servers', {
			url: '/servers',
			templateUrl: 'modules/servers/views/servers.client.view.html'
		});
	}
]);