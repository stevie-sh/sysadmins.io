'use strict';

ApplicationConfiguration.registerModule('chatApp');

angular.module('chatApp')
.value('messageFormatter', function(date, nick, message) {
	return date.toLocaleTimeString() + ' - ' + 
		nick + ' - ' + 
		message + '\n';
});
