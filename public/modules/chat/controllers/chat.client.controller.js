'use strict';

angular.module('chat')
.controller('ChatController',['$log','$scope','$state','$http', 'ChatService', 'messageFormatter', 'Authentication', '$cookies', 'TicketFactory', '$rootScope', '$location', '$stateParams',
		function ($log, $scope, $state, $http, ChatService, messageFormatter, Authentication, $cookies, TicketFactory, $rootScope, $location, $stateParams) {
			$scope.TicketFactory = TicketFactory;

			$scope.$watch('TicketFactory.selectedTicket._id');
			$rootScope.$on('$locationChangeSuccess', function() {
				$rootScope.actualLocation = $location.path();
			});

			$rootScope.$watch(function () {return $location.path();}, function (newLocation, oldLocation) {
				if($rootScope.actualLocation === newLocation) {
					console.log('Back pressed!');	
					ChatService.socket.removeAllListeners();
				}
			});

			$scope.$watch('$viewContentLoaded', function() {
				console.log('Reconnecting');
				console.log(ChatService.socket);	
				// ChatService.socket.connect();	
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
			if ($cookies.needsRefresh !== 'true')
				$cookies.firstMessage = Date.now();
			$scope.messageLog += ChatService.messageLog;

			console.log('Adding user: ' + $scope.user.username);	
			ChatService.socket.emit('addUser', $scope.user.username);	

			if(! $stateParams.ticket_id ) {
				console.log('Switching Rooms: ' + $scope.TicketFactory.selectedTicket._id);
				ChatService.socket.emit('switchRoom', $scope.TicketFactory.selectedTicket._id); 
			} else {
				console.log('Switching Rooms: ' + $scope.TicketFactory.selectedTicket._id);
				ChatService.socket.emit('switchRoom', $stateParams.ticket_id); 
			}
			// Send message upon button press	
			$scope.sendMessage = function() {
				ChatService.socket.emit('sendChat', $scope.message);

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

					$cookies.needsRefresh = true;
					// Create the new message in the DB	
					$http.post('/api/chat', {
						_User: Authentication.user._id,
						Text: $scope.message
					});

					$log.debug('message sent', $scope.message);
					$scope.message = '';
				}


			}; // end sendMessage

			ChatService.socket.on('updateChat', function(username, data) {
				console.log('Updating chat ....');	

				if (data.substring(0,5) === '/join') return;	
				ChatService.messageLog += messageFormatter(new Date(), username, data);	
			});

			$scope.$watch(function () {
				$scope.messageLog = ChatService.messageLog;	
			});
		}]);  // end of controller
