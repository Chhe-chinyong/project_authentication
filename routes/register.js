const express=require('express');
const router=express.Router();
const User=require('../model/user');
const bcrypt = require('bcrypt');
//Validation
const {registerValidation,loginValidation}=require('../validation');


//Register
router.post('/register',async(req,res,next)=>{
    const {error}=registerValidation(req.body);
    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist){
        res.send('Your email is exist');
    }
    const usernameExist=await User.findOne({username:req.body.username});
    if(usernameExist){
        res.send('Your username is exist');
    }
    if(error) {return res.status(400).send(error.details[0].message);}
    const salt=await bcrypt.genSalt(10);
    const hash_pass=await bcrypt.hash(req.body.password,salt);

    const user=new User({
        username:req.body.username,
        password:hash_pass,
        email:req.body.email
    });
        
    try{
        const saveuser=await user.save();
        res.send(saveuser);
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async(req,res,next)=>{

});

module.exports=router;