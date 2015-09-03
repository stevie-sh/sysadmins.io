'use strict';

angular.module('chat')
.factory('ChatService', function (socketFactory, $http, messageFormatter, Authentication, $cookies) {

	var service = {
		socket : socketFactory(),
		messageLog : '',
		emailToUserName : function (email) { return email.substring(0, email.indexOf('@'));},
		listeners: [] 
	};

	var user = service.user = Authentication.user;

	service.refreshListeners = function () {
		console.log('[chat.client.service.js] ', 'Refreshing necessary listeners');
		if (service.listeners.indexOf(service.updateChat) === -1) {
			console.log('[chat.client.service.js] ', 'Refreshing updateChat listener');
			service.socket.addListener('updateChat', service.updateChat);	
			service.listeners.push(service.updateChat);
		}
		if (service.listeners.indexOf(service.refreshChat) === -1) {
			console.log('[chat.client.service.js] ', 'Refreshing refreshChat listener');
			service.socket.addListener('refreshChat', service.refreshChat);	
			service.listeners.push(service.refreshChat);
		}	

		if (service.listeners.length === 0) {
			console.log('[chat.client.service.js] ', 'Refreshing updateChat listener');
			service.socket.addListener('updateChat', service.updateChat);	
			service.listeners.push(service.updateChat);
			console.log('[chat.client.service.js] ', 'Refreshing refreshChat listener');
			service.socket.addListener('refreshChat', service.refreshChat);	
			service.listeners.push(service.refreshChat);
		}
		console.log('[chat.client.service.js] ', service.listeners);
	};

	service.matchedChatCommand = function (msg, regEx) {
		var match = msg.match(regEx);	
		if (angular.isDefined(match) && 
				angular.isArray(match) && match.length === 2){
			return match;
		}

		return false;	
	};	

	service.updateChat = function(username, data, date) {
		console.log('Updating chat ....');

		service.messageLog += messageFormatter(date? date : new Date(), username, data);
	};


	service.refreshChat = function(messages) {
		console.log('RefreshChat Messages: ');
		if (messages) {	
			service.messageLog = 'Ready to Chat!\n';	
			angular.forEach(messages, function (value, key) {	
				service.updateChat(value._User.username, value.Text, new Date(value.Timestamp));	
			});	
		}
	};

	return service;
});
