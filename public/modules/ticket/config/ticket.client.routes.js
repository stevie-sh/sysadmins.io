'use strict';

angular.module('ticket')
    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('ticket', {
                        url: '/ticket',
                        templateUrl: 'modules/ticket/views/ticket.client.view.html',
												controller: 'TicketController'
                }).state('signout', {
										url: '/',
										templateUrl: 'modules/core/views/home.client.view.html'

								});
 }]);
