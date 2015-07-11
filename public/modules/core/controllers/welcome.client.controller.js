'use strict';

angular.module('welcome').controller('WelcomeController', ['socket', function(socket){
    socket.on('myEvent', function(data){
        console.log('hello' + data);
    });
}]);



