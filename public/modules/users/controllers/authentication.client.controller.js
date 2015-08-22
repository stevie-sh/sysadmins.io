'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$state', 'ChatService', '$cookies',
		function($scope, $http, $location, Authentication, $state, ChatService, $cookies) {
			$scope.authentication = Authentication;

			// If user is signed in then redirect back home
			if ($scope.authentication.user) $location.path('/');

			$scope.signup = function() {
				// Stops user from signing up while logged in
				if ($scope.authentication.user) {
					$scope.error = 'You cannot signup while already logged in';
					return;
				}

				$http.post('/auth/signup', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					// And redirect to the index page
					$state.go('home');
				})
				.error(function(response) {
					$scope.error = response.message;
				});
			};

			$scope.signin = function() {
				$http.post('/auth/signin', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;
					console.log('authentication-controller: ' + $scope.authentication.user.email);
				
					console.log('Authentication Controller -- Message Log' + ChatService.messageLog);	

					$cookies.needsRefresh = false;
					// And redirect to the index page
					$state.go('ticket');
				})
				.error(function(response) {
					$scope.error = response.message;
				});
			};
		}
]);
