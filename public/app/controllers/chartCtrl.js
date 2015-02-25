var app = angular.module('zions');

	app.controller('chartCtrl', function($scope, chartService){

		$scope.getPair = function(){
			chartService.
		}
























//CHART FUNCTIONALITY START //////////////////////////////////////////////
	var socket = io.connect();
	var number = [];

	$scope.askPrice = number[0];

	socket.on('price', function(tick){
		number.push(tick.ask);
		$scope.askPrice = number[number.length - 1]
		$scope.$apply();
	});

	$(function(){

	    Highcharts.setOptions({
	        global : {
	            useUTC : true
	        }
	    });

	    // Create the chart
	    $('#container').highcharts('StockChart', {
	    	xAxis: {
	    		title: {
	    			text: 'Time'
	    		}
	    	},
	    	yAxis: {
	    		title: {
	    			text: 'Price'
	    		}
	    	},
	        chart : {
	            events : {
	                load : function () {

	                    // set up the updating of the chart each second
	                    var series = this.series[0];
	                    setInterval(function () {
	                        var x = (new Date()).getTime(), // current time
	                            y = $scope.askPrice
	                        series.addPoint([x, y], true, true);
	                    }, 1000);
	                }
	            }
	        },

	        rangeSelector: {
	            buttons: [{
	                count: 1,
	                type: 'minute',
	                text: '1M'
	            }, 
	            {
	            //     count: 5,
	            //     type: 'minute',
	            //     text: '5M'
	            // }, {
	                type: 'all',
	                text: 'All'
	            }],
	            inputEnabled: false,
	            selected: 0
	        },

	        title : {
	            text : 'Forex Streaming Data'
	        },

	        exporting: {
	            enabled: false
	        },

	        series : [{
	            name : 'EUR/USD',
	            type: 'line',
	            data : (function () {
	                // generate an array of random data
	                var data = [], time = (new Date()).getTime(), i;

	                for (i = -999; i <= 0; i += 1) {
	                    data.push([
	                        time + i * 1000,
	                        $scope.askPrice
	                    ]);
	                }
	                return data;
	            }())
	        }]
	    });

	});
//CHART FUNCTIONALITY END //////////////////////////////////////////////////

});

