var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
// var morgan = require('morgan');
// var mongoose = require('mongoose');
// var User = require('./app/models/user');
// var jwt = require('jsonwebtoken');
var oandaAdapter = require('oanda-adapter');
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var authToken = 'idb34u864hslknfi18923k894inkrHuhGwe';
var port = 8880;




																//oanda stream start

io.on('connection', function(socket){
	var cur1 = 'EUR';
	var cur2 = 'USD';
	var client = new oandaAdapter({
		environment: 'practice',
		accessToken: '2be9ee51eb8a151263af2089ac7713a3-cff26104998f7f05e669d104e9f2e857'
	});
	client.subscribePrice('8108490', cur1+'_'+cur2, function(tick){
		console.log(tick.ask);
		socket.emit('price', tick);     //this is to emit the data to front end
	}, this);
	// socket.on('pair', function(symbol){
	// 	var currency = symbol.split('');
	// 	cur1 = currency.join(currency[0], currency[1], currency[2]);
	// 	cur2 = currency.join(currency[4], currency[5], currency[6]);
	// })
});	
														


																//oanda stream end

															



// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());

// app.use(function(req, res, next){
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
// 	next();
// });

// app.use(morgan('dev'));

// mongoose.connect('mongodb://evanpalsson:$ugu$t8E@proximus.modulusmongo.net:27017/ny7duHit');   //connecting database to modulus


// app.get('/', function(req, res){
// 	res.send('Welcome to the home page!');              this is to test if the page is working
// });

// var apiRouter = express.Router();

// apiRouter.post('/authenticate', function(req, res){
// 	User.findOne({
// 		username: req.body.username
// 	})
// 	.select('name username password').exec(function(err, user){
// 		if(err){
// 			throw err;
// 		}
// 		if(!user){
// 			res.json({
// 				success: false,
// 				message: 'Authentication failed. User not found.'
// 			});
// 		}
// 		else if(user){
// 			var validPassword = user.comparePassword(req.body.password);
// 			if(!validPassword){
// 				res.json({
// 					success: false,
// 					message: 'Authentication failed. Incorrect password.'
// 				});
// 			}
// 			else{
// 				var token = jwt.sign({
// 					name: user.name,
// 					username: user.username
// 				},
// 				authToken, {
// 					expiresInMinutes: 1140
// 				});
// 				res.json({
// 					success: true,
// 					message: 'Enjoy your token!',
// 					token: token
// 				});
// 			}
// 		}
// 	});
// });

// apiRouter.use(function(req, res, next){
// 	console.log('Somebody just came to our app!');
// 	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
// 	if(token){
// 		jwt.verify(token, authToken, function(err, decoded){
// 			if(err){
// 				return res.status(403).send({
// 					success: false,
// 					message: 'Failed to authenticate token.'
// 				});
// 			}
// 			else{
// 				req.decoded = decoded;
// 				next();
// 			}
// 		});
// 	}
// 	else{
// 		return res.status(403).send({
// 			success: false,
// 			message: 'No token provided.'
// 		});
// 	}
// 	next();
// });

// apiRouter.get('/', function(req, res){
// 	res.json({message: 'hooray! welcome to our api!'});  		this is to test if the json is sending
// });

// app.use('/api', apiRouter);

// apiRouter.route('/users')
// 	.post(function(req, res){
// 		var user = new User();
// 		user.name = req.body.name;
// 		user.username = req.body.username;
// 		user.password = req.body.password;
// 		user.save(function(err){
// 			if(err){
// 				if(err.code = 11000){
// 					return res.json({ success: false, message: 'A user with that username already exists.' });
// 				}
// 				else{
// 					return res.send(err);
// 				}
// 			}
// 			res.json({ message: 'User created!' });
// 		});
// 	})
// 	.get(function(req, res){
// 		User.find(function(err, users){
// 			if(err){
// 				res.send(err);
// 			}
// 			res.json(users);
// 		});
// 	});

// apiRouter.route('/users/:user_id')
// 	.get(function(req, res){
// 		User.findById(req.params.user_id, function(err, user){
// 			if(err){
// 				res.send(err);
// 			}
// 			res.json(user);
// 		});
// 	})
// 	.put(function(req, res){
// 		User.findById(req.params.user_id, function(err, user){
// 			if(err){
// 				res.send(err);
// 			}
// 			if(req.body.name){
// 				user.name = req.body.name;
// 			}
// 			if(req.body.username){
// 				user.username = req.body.username;
// 			}
// 			if(req.body.password){
// 				user.password = req.body.password;
// 			}
// 			user.save(function(err){
// 				if(err){
// 					res.send(err);
// 				}
// 				res.json({ message: 'User updated!' });
// 			});
// 		});
// 	})
// 	.delete(function(req, res){
// 		User.remove({
// 			_id: req.params.user_id
// 		},
// 		function(err, user){
// 			if(err){
// 				return res.send(err);
// 			}
// 			res.json({ message: 'Successfully deleted' });
// 		});
// 	});

// apiRouter.get('/me', function(req, res){
// 	res.send(req.decoded);
// });


app.use(express.static(__dirname + '/public'));

http.listen(port);
console.log('Listening on port ' + port);





