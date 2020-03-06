var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');




router.get('/', function(req, res){
	console.log('login page requested!');
	res.render('login/index');
});

router.post('/', function(req, res){
	console.log('login post page requested!');
		var user ={
			email: req.body.email,
			pass: req.body.pass
		};

		userModel.validate(user, function(status){
			if(status!=false){
				res.cookie('user', status);
				res.redirect('/home');
			}else{
				res.redirect('/login');
			}
		});
});

module.exports = router;

