'use strict';

angular.module('chatApp')
.factory('chatSocket', function (socketFactory) {
	var socket = socketFactory();
	socket.forward('broadcast');
	return socket;
});

angular.module('chatApp')
.value('messageFormatter', function(date, nick, message) {
	return date.toLocaleTimeString() + ' - ' + 
		nick + ' - ' + 
		message + '\n';
});
