'use strict';

angular.module('chatApp')
.controller('SocketCtrl',['$log','$scope','$http', 'chatSocket', 'messageFormatter', 'Authentication', 
		function ($log, $scope, $http, chatSocket, messageFormatter, Authentication) {
			var email = Authentication.user.email || 'anonymous@nowhere.com';	
			var nickName = $scope.nickName = email.substring(0, email.indexOf('@'));

			$scope.messageLog = 'Ready to chat!\n';
			$scope.sendMessage = function() {
				var match = $scope.message.match('^\/nick (.*)');

				if (angular.isDefined(match) && 
						angular.isArray(match) && match.length === 2) {
					var oldNick = nickName;
					nickName = match[1];
					$scope.message = '';
					$scope.messageLog = $scope.messageLog + messageFormatter(new Date(), 
							nickName, 'nickname changed - from ' + 
							oldNick + ' to ' + nickName + '!'); 

					$scope.nickName = nickName;
				}

				$log.debug('sending message', $scope.message);
				chatSocket.emit('message', nickName, Authentication.user, $scope.message);
				$log.debug('message sent', $scope.message);
				$scope.message = '';
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
