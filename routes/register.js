const express=require('express');
const router=express.Router();
const User=require('../model/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Chalk=require('chalk');
//Validation
const {registerValidation,loginValidation}=require('../validation');


//Register
router.post('/register',async(req,res,next)=>{
    const {error}=registerValidation(req.body);
    if(error) {return res.status(400).send(error.details[0].message)};
    
    const emailExist=await User.findOne({email:req.body.email});
    
    if(emailExist){
      return res.status(400).send('Your email is exist');
    }

    const usernameExist=await User.findOne({username:req.body.username});
    
    if(usernameExist){
        return res.status(400).send('Your username is exist');
    }

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
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        const check=await User.findOne({username:req.body.username});
        if(!check) return res.status(400).send('The Username you’ve entered is incorrect.');

        const match = await bcrypt.compare(req.body.password, check.password);
        if(!match) return res.status(400).send('The password you’ve entered is incorrect');

        const token=  jwt.sign({_id:check._id},process.env.TOKEN_SECRET);
        //console.log('asd');
        //res.send(token);
        res.json({token: `${token}`}).send(token) // auth-token is name whatever u want 
        //res.header('auth-token',token).send(token);
        res.send('Loggin');
    
});

module.exports=router;
