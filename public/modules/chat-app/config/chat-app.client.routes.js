'use strict';

angular.module('chatApp').config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {
			$stateProvider.state('chatApp', {
				url: '/chatApp',
				templateUrl: 'modules/chat-app/views/chat-app.client.view.html'
			});
		}]);

