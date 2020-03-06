var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['user'] == null){
		res.redirect('/login');
	}else{
		next();
	}

	
});

router.get('/', function(req, res){	
	let udata=req.cookies['user'];
	if(udata != null){
		if(!udata.evalid){
          res.render("home/verify");
		}else{
		userModel.getById(req.cookies['user'].id, function(result){
			req.cookies['user']=result;
			if(result.category=='Patient'){
				res.redirect("/home/patient");
			}else if(result.category=='Doctor'){
				res.redirect("/home/doctor");
			}else{
				res.redirect("/home/rep");
			}
			
		});
	}
	}else{
		res.redirect('/logout');
	}
});

router.get('/profile', function(req, res){
	let id=req.cookies['user'].id;
    let p={
		address:"Not Recorded",
		cause:"Not Recorded",
		admitAt:"Not Recorded"
	};
	let d={
		address:"Not Recorded",
		time:"00:00 AM",
		dept:1,
		fee:0.00
	}

	userModel.getById(id,(result)=>{
		if(result.category=='Patient'){
			userModel.getpdata(result.id,function(r){
				if(r!=null){
					p={...p, ...r[0]};
				}
				res.render("home/index",{user:result,pdata:p}); 
			});
		}else if(result.category=='Doctor'){
			userModel.getddata(result.id,function(r){
				if(r!=null){
					d={...d, ...r};
				}
				res.render("home/index",{user:result,ddata:d}); 
			});
		}else{
			res.render("home/index",{user:result});
		}
		
	});
	
});


router.get('/patient', function(req, res){
	// userModel.getAll(function(results){
	// 	if(results.length > 0){
	// 		res.render('home/alluser', {userlist: results});
	// 	}else{
	// 		res.send('invalid username/password');
	// 	}
	// });

	let id=req.cookies['user'].id;

	userModel.getById(id,(result)=>{
		console.log(result);
		res.render("home/patient",result);
	});


	
});

router.get('/patient/doctors', function(req, res){
	// userModel.getAll(function(results){
	// 	if(results.length > 0){
	// 		res.render('home/alluser', {userlist: results});
	// 	}else{
	// 		res.send('invalid username/password');
	// 	}
	// });


	let data={
		name:"abc",
		id:"1234",
		email:"a@a.com"
	};

	res.render("home/pDoctors",data);
});

router.get('/patient/appointment', function(req, res){
	// userModel.getAll(function(results){
	// 	if(results.length > 0){
	// 		res.render('home/alluser', {userlist: results});
	// 	}else{
	// 		res.send('invalid username/password');
	// 	}
	// });


	let data={
		name:"abc",
		id:"1234",
		email:"a@a.com"
	};

	res.render("home/paitentAppointment",data);
});

router.get('/rep', function(req, res){
	// userModel.getAll(function(results){
	// 	if(results.length > 0){
	// 		res.render('home/alluser', {userlist: results});
	// 	}else{
	// 		res.send('invalid username/password');
	// 	}
	// });
    
    userModel.getPendingAllPatient((result)=>{
        res.render("home/rdashboard",{data:result});
	});
	

	
});

router.get('/rep/doctor', function(req, res){
	// userModel.getAll(function(results){
	// 	if(results.length > 0){
	// 		res.render('home/alluser', {userlist: results});
	// 	}else{
	// 		res.send('invalid username/password');
	// 	}
	// });


	let data={
		name:"abc",
		id:"1234",
		email:"a@a.com"
	};

	res.render("home/rdoctor",data);
});

router.get('/rep/addpatient/:id', function(req, res){
	// userModel.getAll(function(results){
	// 	if(results.length > 0){
	// 		res.render('home/alluser', {userlist: results});
	// 	}else{
	// 		res.send('invalid username/password');
	// 	}
	// });
   userModel.getById(req.params.id,function(r){
	if(r==null){
		res.redirect("/home");
	}else{
		res.render("home/addpatient",r);
	}
   });




	
});


router.get('/rep/bill', function(req, res){
	// userModel.getAll(function(results){
	// 	if(results.length > 0){
	// 		res.render('home/alluser', {userlist: results});
	// 	}else{
	// 		res.send('invalid username/password');
	// 	}
	// });


	let data={
		name:"abc",
		id:"1234",
		email:"a@a.com"
	};

	res.render("home/rbill",data);
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})


router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})


router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})

module.exports = router;

