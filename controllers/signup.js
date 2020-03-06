var express 	= require('express');
let nodemailer=require("nodemailer");
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');
let uid=require('uuid').v4;
let mailgun=require('mailgun-js');
var smtpTransport = require('nodemailer-smtp-transport'); // this is important



// router.get('*', function(req, res, next){
// 	if(req.cookies['username'] != null){
// 		res.redirect('/home');
// 	}else{
// 		next();
// 	}
// });

router.get('/', function(req, res){
	console.log('reg page requested!');
	res.render('signup/index');
});

router.post('/', function(req, res){
    let {email,name,pass,category,gender,birthday}=req.body;
    console.log(req.body);
    let data={
        name,
        email,
        pass,
        category,
        gender,
        birthday,
        evalid:false,
        hash:uid()
    };
    
   userModel.getByEmail(email,function(d){
     if(d==null){
      let r=userModel.insert(data,function(r){
        if(r){
          mailer(data);
        }
        console.log(r);

        req.flash(
          "success_msg",
          "Registration Successful please login now."
        );
        res.redirect('/login');
      });
     }else{
      req.flash(
        "error_msg",
        "User with same email already exist."
      );
      res.redirect("/signup")
     }
   })
   

	
    
    
		
});

///node mailer

async function mailer(data) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'testermrdeveloper7@gmail.com',
          pass: '@a1234567'
        }
      }));
    //Lv)rX4T3_4%Hej&
    // send mail with defined transport object
   transporter.sendMail({
      from: 'HMS', // sender address
      to: data.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: data.name, // plain text body
      html: "<h1 style='text-align:center'>Welcome</b>"+
            "<h3 style='text-align:center'>Please click this button to verify your email address</h3>"+
            "<a href='http://localhost:4000/verify/user/auth/"+data.hash+"'><button style='border:1px solid black;border-radius:5px;padding:10px;display:block;margin:0 auto;' >Click Here</button></a>" // html body
    }).then(res=>{
      console.log(res);
    }).catch(e=>{
      console.log(e);
    });
    
  
    //  console.log("Message sent: %s", info);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

module.exports = router;


