'use strict';

angular.module('chatApp')
.factory('ChatService', function (socketFactory, $http, messageFormatter, Authentication, $cookies) {

	var service = {
		socket : socketFactory(),
		messageLog : '',
		emailToUserName : function (email) { return email.substring(0, email.indexOf('@'));}
	};

	service.user = Authentication.user;
	// Repopulate the message log with all previous messages	
	service.refreshChat = function () { 
		console.log('Refreshing chat...');	
		if ($cookies.needsRefresh !== 'true') return false;		

		console.log($cookies.firstMessage);
		if ($cookies.firstMessage) {
			console.log("Getting previous messges ...");	
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

	service.socket.forward('broadcast');
	return service;
});
