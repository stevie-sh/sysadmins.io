'use strict';

angular.module('welcome')
.factory('socket', ['$rootScope', '$log', '$timeout', function ($rootScope, $log, $timeout) {
				/* global io: true */
        var socket = io.connect();

        $log.log('io', io);
        $log.log('socket', socket);

        socket.on('connect', function() {
            $log.log('Connected!', arguments);
        });

        socket.on('error', function() {
            $log.log('Error!', arguments);
        });

        socket.on('disconnect', function(){
           $log.log('Disconnect!', arguments);
        });

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $timeout(function () {
                        callback.apply(socket, args);
                    }, 0);
                });
            },

            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            },

            remove: function(name) {
                socket.removeAllListeners(name);
            }
        };
}]);
