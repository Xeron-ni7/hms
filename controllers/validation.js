var express 	= require('express');
let userModel   =require('../models/user-model');
var router 		= express.Router();

router.get("/user/auth/:hash",(req,res)=>{
  let hashCode=req.params.hash;
  console.log(hashCode);
  userModel.getByHash(hashCode,function(data){
    if(data!=null){
        userModel.updateValidation(data,function(r){
            if(r){
                 data.evalid=1;
                 req.cookies['user']=data;
                 res.render("home/verified");
            }else{
               res.redirect("/signup"); 
            }
        });
    }else{
        res.redirect("/404");
        
    }
}
)  
});





module.exports=router;