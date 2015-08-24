'use strict';

angular.module('chat')
.factory('ChatService', function (socketFactory, $http, messageFormatter, Authentication, $cookies) {

	var service = {
		socket : socketFactory(),
		messageLog : '',
		emailToUserName : function (email) { return email.substring(0, email.indexOf('@'));}
	};

	var user = service.user = Authentication.user;
	
	service.matchedChatCommand = function (msg, regEx) {
		var match = msg.match(regEx);	
		if (angular.isDefined(match) && 
						angular.isArray(match) && match.length === 2){
			return match;
		}

		return false;	
	};	

	service.socket.on('refreshChat', function(messages) {
		console.log(messages);	
		angular.forEach(messages, function (value, key) {	
			var prevMsg = messageFormatter(new Date(value.Timestamp), value._User.username, value.Text);
			service.messageLog += prevMsg;	
		});	
	});	
	// Repopulate the message log with all previous messages	
	service.refreshChat = function () { 
		console.log('Refreshing chat...');	
		if ($cookies.needsRefresh !== 'true') return false;		

		console.log($cookies.firstMessage);
		if ($cookies.firstMessage) {
			console.log('Getting previous messges ...');	
			$http.get('/api/chat/messages/' + $cookies.firstMessage).then(function(resp) {
				console.log('Getting old messages');
				angular.forEach(resp.data, function(value, key) {
					var prevMsg = messageFormatter(
							new Date(value.Timestamp), user.username,
							value.Text);
					console.log('Appending to message log');
					service.messageLog += prevMsg;
				});	
			});
		}
	};

	return service;
});
