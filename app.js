//declaration
var express 		= require('express');
var bodyParser 		= require('body-parser');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var signup 			= require('./controllers/signup');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var varification    =require('./controllers/validation');
var home 			= require('./controllers/home');
var add             =require('./controllers/add');
var flash           =require('connect-flash');

var app = express();

//configuration
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());



//middleware
app.use('/ext', express.static('ext'));

 //flash Configuration
 app.use(flash());
 app.use((req, res, next) => {
	 res.locals.success_msg = req.flash("success_msg");
	 res.locals.error_msg = req.flash("error_msg");
	 res.locals.error = req.flash("error");
	 next();
   });

app.get('/',(req,res)=>{
      res.redirect("/home");
   });
app.use('/verify',varification);
app.use('/signup', signup);
app.use('/add', add);
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);
app.use((req,res,next)=>{
   res.render('404');
});



//routes
app.get('/', function(req, res){
	res.render('index');
});



//server startup
app.listen(4000, function(){
	console.log('server started at 4000');
});
