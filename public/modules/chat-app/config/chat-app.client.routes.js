'use strict';

angular.module('chatApp').config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {
			$stateProvider.state('chatApp', {
				url: '/chatApp/:ticket_id',
				templateUrl: 'modules/chat-app/views/chat-app.client.view.html'
			});
		}]);

