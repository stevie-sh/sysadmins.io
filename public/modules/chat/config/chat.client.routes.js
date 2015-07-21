'use strict';

angular.module('chat')
    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.
                    state('chat', {
                        url: '/chat',
                        templateUrl: '../../../../app/views/mvp1.server.view.html'
                });
 }]);
