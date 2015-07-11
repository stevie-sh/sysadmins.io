'use strict';

angular.module('welcome')

.factory('socket', function(){
    //setup the socket connection
    return socket;
})

.controller('WelcomeController',['socket', function(socket) {
    socket.on('myEvent'), function(data){
        console.log('hello from my event');
    })
}
