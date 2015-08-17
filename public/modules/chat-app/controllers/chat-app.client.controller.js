'use strict';

angular.module('chatApp')
.controller('SocketCtrl',['$log','$scope','$state','$http', 'ChatService', 'messageFormatter', 'Authentication', '$cookies', 
		function ($log, $scope, $state, $http, ChatService, messageFormatter, Authentication, $cookies) {
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
			$scope.sendMessage = function() {
				ChatService.socket.emit('sendChat', $scope.message);
				
				
				var joinRegEx = '^\/join (.*)';
				var joinRoom = ChatService.matchedChatCommand($scope.message, joinRegEx);	

				if (joinRoom) {
					console.log('Want to join room: ' + joinRoom[1]);

					// ChatService.socket.emit('command', { Command: 'join', User: $scope.user, Room: joinRoom[1] } ); 
					ChatService.socket.emit('switchRoom', joinRoom[1]);
					// Clear the send box
					$scope.message = '';
				}	

				// If the message is not blank	
				if ($scope.message) {
					$log.debug('sending message', $scope.message);
					// Broadcast message to all connected users	
					ChatService.socket.emit('message', nickName, Authentication.user, $scope.message);
					
					$cookies.needsRefresh = true;
					// Create the new message in the DB	
					$http.post('/api/chat', {
						User: Authentication.user,
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
