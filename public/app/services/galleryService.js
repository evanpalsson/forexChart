var app = angular.module('zions');

app.service('galleryService', function(){

  var chartData = [];
  var timeData  =[];
  var socket = io.connect();

  // socket.on('connect', function(){    //checks to see if socket is connected and working
  //   console.log('connected!')
  // })


  socket.on('connect', function(){
    socket.on('price', function(tick){  
      chartData.push(tick.ask);
      timeData.push(tick.time);
      console.log(tick)
    });
  });
});



  // var streamArray = [];
  // var dataToArray = function(data) { //parses data.data.results from iTunes into songArray, in the format that ng-Grid asks for.
  //   for (var i = 0; i < data.length; i++) {
  //     var song = {};
  //     song.AlbumArt = data[i].artworkUrl100;
  //     song.Artist = data[i].artistName;
  //     song.Collection = data[i].collectionCensoredName;
  //     song.CollectionPrice = data[i].collectionPrice;
  //     song.Play = data[i].previewUrl;
  //     song.Type = data[i].kind;
  //     song.SongName = data[i].trackName;
  //     songArray.push(song);
  //   }
  //   console.log(songArray)
  // }














  // var key = '3c562d38fc330e5e0e3d9a0918aa91a3-46e2ca7d6df4e333842f52e669d7c3f6';
  // var accountId = 8108490;
  // var accountName = 'Primary';

  // this.chart = function(symbol){
  //   var deferred = $q.defer();
  //   $http({
  //     method: 'GET',
  //     url: 'https://api-fxpractice.oanda.com/v1/prices?instruments=EUR_USD'
  //   })
  //     .then(function(chartData){
  //       deferred.resolve(chartData);
  //       console.log(chartData)
  //     });
  //   return deferred.promise;
  // }





