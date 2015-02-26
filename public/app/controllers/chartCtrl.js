var app = angular.module('zions');

	app.controller('chartCtrl', function($scope){

		$scope.getPair = function(symbol){			
			socket.emit('pair', symbol);
			socket.on('price', function(tick){				
				number.push(tick.ask);
				$scope.askPrice = number[number.length - 1]
				$scope.$apply();
			});
		};

	//CHART FUNCTIONALITY START //////////////////////////////////////////////
		var socket = io.connect();
		var number = [];
		$scope.askPrice = number[0];

		$(function(){
		    Highcharts.setOptions({
		        global : {
		            useUTC : true
		        }
		    });
		    // Create the chart
		    $('#container').highcharts('StockChart', {
		    	credits: {
		    		enabled: false
		    	},
		    	navigator: {
		    		enabled: false
		    	},
		    	xAxis: {
		    		title: {
		    			text: 'Time',
		    			style: {'color': 'white', 'fontWeight': 'bold', 'font-size': '24px'}
		    		},
		    		labels: {
		    			style: {'color': 'white', 'fontWeight': 'bold'}
		    		}
		    	},
		    	yAxis: {
		    		title: {
		    			text: 'Price',
		    			style: {'color': 'white', 'fontWeight': 'bold', 'font-size': '24px'}
		    		},
		    		gridLineColor: 'white',
		    		labels: {
		    			style: {'color': 'white', 'fontWeight': 'bold'}
		    		}
		    	},
		        chart: {
		            events: {
		                load: function(){	                	
		                    var series = this.series[0];
		                    setInterval(function(){	                                       
				                var x = (new Date()).getTime(); // current time
				                var y = $scope.askPrice;
				                series.addPoint([x, y], true, true);			            
				            }, 1000);
				        }  	                
		            },	            
		            borderRadius: 15,
		            backgroundColor: '#47DAFF',
		            plotBackgroundImage: 'http://www.clker.com/cliparts/R/w/e/d/N/3/bear-bull-symbols.svg'
		        },
		        rangeSelector: {
		        	enabled: false,
		            buttons: [{
		                count: 1,
		                type: 'minute',
		                text: '1M'
		            }, 
		            {
		                count: 5,
		                type: 'minute',
		                text: '5M'
		            }, {
		                type: 'all',
		                text: 'All'
		            }],
		            inputEnabled: false,
		            selected: 0
		        },
		        title: {
		            text: 'Forex Streaming Data'
		        },
		        exporting: {
		            enabled: false
		        },
		        scrollbar: {
		        	enabled: false
		        },
		        series: [{
		            name: 'EUR/USD',
		            type: 'line',
		            color: 'yellow',
		            shadow: {
		            	color: 'red',
		            	width: '16'
		            },
		            data: (function () {
		                var data = [], time = (new Date()).getTime(), i;
		                for (i = -999; i <= 0; i += 1) {
		                    data.push([
		                        time + i * 1000,
		                        $scope.askPrice	                      
		                    ]);
		                };	                
		                return data;
		            }())
		        }]
		    });

		});
	//CHART FUNCTIONALITY END //////////////////////////////////////////////////

});

