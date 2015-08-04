'use strict';

angular.module('chatApp')
.controller('SocketCtrl',['$log','$scope','$state','$http', 'chatSocket', 'messageFormatter', 'Authentication', 
		function ($log, $scope, $state, $http, chatSocket, messageFormatter, Authentication) {
			// If no user is logged in	
			if (!Authentication.user){
				// We do not support chat; Ask them to signin first beofore using it	
				$state.go('signin');
			}	
			var emailToUserName = function (email) { return email.substring(0, email.indexOf('@'));};

			var email = Authentication.user.email;
			// Get the part of the e-mail before the @ sign and set it as the user's nickName
			var nickName = $scope.nickName = emailToUserName(email);	


			$scope.messageLog = 'Ready to chat!\n';
			// Repopulate the message log with all previous messages	
			$http.get('/api/chat').then(function(resp) {

				angular.forEach(resp.data, function(value, key) {
					var prevMsg = messageFormatter(
							new Date(value.Timestamp), emailToUserName(value.User.email), 
							value.Text);
					$scope.messageLog += prevMsg;
				});	
			});

			$scope.sendMessage = function() {
				// Regex for matching /nick <nickname>	
				var match = $scope.message.match('^\/nick (.*)');
				// If we match, and have an array w/ len 2
				if (angular.isDefined(match) && 
						angular.isArray(match) && match.length === 2) {
					// Save the old name
					var oldNick = nickName;
					// Set the new name	
					nickName = match[1];
					// Clear the send box 
					$scope.message = '';
					// Append to the message log
					$scope.messageLog = $scope.messageLog + messageFormatter(new Date(), 
							nickName, 'nickname changed - from ' + 
							oldNick + ' to ' + nickName + '!'); 

					// Set the new nickname
					$scope.nickName = nickName;
				}

				// If the message is not blank	
				if ($scope.message) {
					$log.debug('sending message', $scope.message);
					// Broadcast message to all connected users	
					chatSocket.emit('message', nickName, Authentication.user, $scope.message);

					// Create the new message in the DB	
					$http.post('/api/chat', {
						User: Authentication.user,
						Text: $scope.message,
						Timestamp: Date.now
					});
					$scope.message = '';
					$log.debug('message sent', $scope.message);
				}
			};

			// Listen for broadcast messages
			$scope.$on('socket:broadcast', function(event, data) {
				// Log any errors	
				$log.debug('got a message', event.name);
				if (!data.payload) {
					$log.error('invalid message', 'event', event, 
							'data', JSON.stringify(data));
					return;
				}

				// Append to the message log
				$scope.$apply(function() {
					var newMessage = messageFormatter(
							new Date(), data.source, 
							data.payload);
					$scope.messageLog = $scope.messageLog + newMessage;
				});
			});
		}]);  // end of controller
