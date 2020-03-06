var express = require('express');
var router = express.Router();
var userModel   = require.main.require('./models/user-model');

router.post('/patient', function(req, res){

    //req.session.username = null;
    let {id,address,cause,admitAt}=req.body;
    let data={
        id,address,cause,admitAt
    };
    userModel.insertPData(data,(r)=>{
        if(r){
            res.json({status:true});
        }else{
            res.json({status:false});
        }
    });

	
});

module.exports = router;

