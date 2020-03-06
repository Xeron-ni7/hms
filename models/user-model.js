var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getpdataById: function(id, callback){
		var sql = "select * from user,patient where user.id=patient.pid user.id=?";
		db.getResult(sql, [id], function(result){
			if(result!=null){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
	getByHash: function(hash, callback){
		var sql = "select * from user where hash=?";
		db.getResult(sql, [hash], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from user where email=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByEmail: function(email, callback){
		var sql = "select * from user where email=?";
		db.getResult(sql, [email], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where email=? and pass=?";
		db.getResult(sql, [user.email, user.pass], function(result){
			
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from user";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getpdata:function(id,callback){
		var sql = "select * from patient where pid=?";
		db.getResult(sql, [id], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getPendingAllPatient:function(callback){
		var sql = "select * from user where category='Patient' and id not in (select pid from patient)";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into user values(?,?,?,?,?,?,?,?,?)";
		console.log(user);
		db.execute(sql, [null,user.name, user.email, user.pass, user.category,user.gender,user.birthday,user.evalid,user.hash], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertPData: function(user, callback){
		var sql = "insert into patient values(?,?,?,?)";
		console.log(user);
		db.execute(sql, [user.id,user.address,user.cause,user.admitAt], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateValidation: function(user, callback){
		var sql = "update user set evalid=1 where id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update user set email=?, pass=?, category=?, gender=?, birthday=?  where id=?";
		db.execute(sql, [user.email, user.pass, user.category, user.gender,user.birthday,user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}