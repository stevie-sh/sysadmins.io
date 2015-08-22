'use strict';

angular.module('chat').config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {
			$stateProvider.state('chat', {
				url: '/chat/:ticket_id',
				templateUrl: 'modules/chat/views/chat.client.view.html'
			});
		}]);

