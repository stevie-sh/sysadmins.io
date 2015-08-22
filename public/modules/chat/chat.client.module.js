'use strict';

ApplicationConfiguration.registerModule('chat');

angular.module('chat')
.value('messageFormatter', function(date, nick, message) {
	return date.toLocaleTimeString() + ' - ' + 
		nick + ' - ' + 
		message + '\n';
});
