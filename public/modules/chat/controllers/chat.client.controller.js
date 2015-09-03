'use strict';

angular.module('chat')
.controller('ChatController',['$log','$scope','$state','$http', 'ChatService', 'messageFormatter', 'Authentication', '$cookies', 'TicketFactory', '$rootScope', '$location', '$stateParams',
		function ($log, $scope, $state, $http, ChatService, messageFormatter, Authentication, $cookies, TicketFactory, $rootScope, $location, $stateParams) {
			if (!$stateParams.ticket_id) $state.go('servers');	
			$scope.TicketFactory = TicketFactory;
			$scope.TicketFactory.selectedTicket._id = $stateParams.ticket_id;

			ChatService.refreshListeners();

			$rootScope.$on('$locationChangeSuccess', function() {
				$rootScope.actualLocation = $location.path();	
				console.log('[chat.client.controller.js] ', ChatService.socket);
			});

			$rootScope.$watch(function () {return $location.path();}, function (newLocation, oldLocation) {
				if($rootScope.actualLocation === newLocation) {
					console.log('[chat.client.controller.js] ', 'Back pressed');	
				}
			});

			$scope.user = Authentication.user;

			// If no user is logged in
			if (!$scope.user){
				// We do not support chat; Ask them to signin first beofore using it
				$state.go('signin');
				return;
			}

			var email = Authentication.user.email;
			// Get the part of the e-mail before the @ sign and set it as the user's nickName
			var nickName = $scope.nickName = ChatService.emailToUserName(email);

			$scope.messageLog = 'Ready to chat!\n';
			// ChatService.refreshChat();
			if ($cookies.firstLoad === 'true') {
				$cookies.firstMessage = Date.now();
			}
			$scope.messageLog += ChatService.messageLog;

			console.log('Adding user: ' + $scope.user.username);
			ChatService.socket.emit('addUser', $scope.user.username, $cookies.firstMessage, $scope.TicketFactory.selectedTicket._id);

			console.log('[chat.client.controller.js] ', 'Switching to room' + $stateParams.ticket_id);
			ChatService.socket.emit('switchRoom', $stateParams.ticket_id);
			// Send message upon button press
			$scope.sendMessage = function() {

				var joinRegEx = '^\/join (.*)';
				var joinRoom = ChatService.matchedChatCommand($scope.message, joinRegEx);

				if (joinRoom) {
					// ChatService.socket.emit('switchRoom', joinRoom[1]);
					// Clear the send box
					$scope.message = '';
				}

				// If the message is not blank
				if ($scope.message) {
					$log.debug('sending message', $scope.message);

					ChatService.socket.emit('sendChat', $scope.message);
					$cookies.firstLoad = false;
					$log.debug('message sent', $scope.message);
					$scope.message = '';
				}


			}; // end sendMessage

			$scope.$watch(function () {
				$scope.messageLog = ChatService.messageLog;
			});
		}]);  // end of controller
