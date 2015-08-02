'use strict';

angular.module('chatApp')
.controller('SocketCtrl',['$log','$scope','$http', 'chatSocket', 'messageFormatter', 
		function ($log, $scope, $http, chatSocket, messageFormatter) {
			var nickName = 'anonymous'; 
			$http.get('/users/me').then(function (response)
					 {
						 var email = response.data.email;
							// Set the nickname to the username
							nickName = email.substring(0, email.indexOf('@'));
							$scope.nickName = nickName;
					 });
			$scope.messageLog = 'Ready to chat!\n';
			$scope.sendMessage = function() {
				var match = $scope.message.match('^\/nick (.*)');

				if (angular.isDefined(match) && 
						angular.isArray(match) && match.length === 2) {
					var oldNick = nickName;
					nickName = match[1];
					$scope.message = '';
					$scope.messageLog = messageFormatter(new Date(), 
							nickName, 'nickname changed - from ' + 
							oldNick + ' to ' + nickName + '!') + 
						$scope.messageLog;
					$scope.nickName = nickName;
				}

				$log.debug('sending message', $scope.message);
				chatSocket.emit('message', nickName, $scope.message);
				$log.debug('message sent', $scope.message);
				$scope.message = '';
			};
			$scope.$on('socket:broadcast', function(event, data) {
				$log.debug('got a message', event.name);
				if (!data.payload) {
					$log.error('invalid message', 'event', event, 
							'data', JSON.stringify(data));
					return;
				} 
				$scope.$apply(function() {
					$scope.messageLog = $scope.messageLog + messageFormatter(
							new Date(), data.source, 
							data.payload);
				});
			});
		}]);  // end of controller
