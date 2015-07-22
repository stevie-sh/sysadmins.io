'use strict';

angular.module('chat')
    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('chat', {
                        url: '/chat',
                        templateUrl: '/modules/chat/views/chat.client.view.html'
                }).state('signout', {
										url: '/',
										templateUrl: 'modules/core/views/home.client.view.html'

								});
 }]);
