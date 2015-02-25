var app = angular.module('zions');

  app.service('chartService', function(){

    this.send = function(){
        socket.emit('pair', function(){

        })
    };

  });