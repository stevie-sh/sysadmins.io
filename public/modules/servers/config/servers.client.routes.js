'use strict';

angular.module('servers')
    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('servers', {
									url: '/servers',
									templateUrl: 'modules/servers/views/servers.client.view.html'
								});
 }]);
