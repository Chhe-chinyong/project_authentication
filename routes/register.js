const express=require('express');
const router=express.Router();
const user=require('../model/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Chalk=require('chalk');
const passport=require('passport')
const PassportSetup=require('../config/passport-setup')
const nodemailer=require('nodemailer');
const verify=require('../validation');
const models = require('../model/user');

//Validation
const {registerValidation,loginValidation}=require('../validation');
const {User,Token}=user;
//const {Token}=user;
//Nodemailer
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

//Register
router.post('/register',async(req,res,next)=>{
    const {error}=registerValidation(req.body);
    if(error) {return res.json({error1:error.details[0].message})};

    const emailExist=await User.findOne({email:req.body.email});
    
    if(emailExist){
      return res.status(400).send('Your email is exist');
    }

    const usernameExist=await User.findOne({username:req.body.username});
    
    if(usernameExist){
        return res.status(400).json({erro:'Your username is exist'});
    }

    const salt=await bcrypt.genSalt(12);
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
    const token=jwt.sign({_id:User._id},process.env.TOKEN_SECRET,{expiresIn:'1d'});
    var token_save=new Token({
        _userId:user._id,
        tokenUser:token,
    }).save();
   
   
    var link = req.protocol + '://' + req.get('host')+'/confirmation?id='+token;
    console.log(link);
    mailOptions={
        to :req.body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };
    transporter.sendMail(mailOptions,(err)=>{
    if(err){
        console.log('error',err);
    }
    else{
        console.log('Email Sent');
    }
});
});

// For client login 

router.post('/login',async(req,res,next)=>{
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        //check email
        const check=await User.findOne({email:req.body.email});
        if(!check) return res.status(400).send('The Username you’ve entered is incorrect.');
        //check password
        const match = await bcrypt.compare(req.body.password, check.password);
        if(!match) return res.status(400).send('The password you’ve entered is incorrect');
        //check email verification
        const email_verify=check.confirmed;
        if(email_verify==false) return res.status(400).send('pls verify your email');

       
        

        const token=  jwt.sign({_id:check._id},process.env.TOKEN_SECRET);
        //console.log('asd');
        //res.send(token);
        res.header('auth-token',token).send(token) // auth-token is name whatever u want 
        //res.header('auth-token',token).send(token);
        //res.send('Loggin');
    
});

//confirmation
router.get('/confirmation',async(req,res)=>{
    //auth();
   
    const token=await Token.findOne({tokenUser:req.query.id},(err,token)=>{
        if(!token){
            res.status(404).send('unable to find a valid token');
        }
        console.log(token._userId);
       const user= User.findOne({_id:token.tokenUser});
       user.updateOne({confirmed:true});
       console.log(user.confirmed);
      // user.save();
      //  user.confirmed=true;
        
        //console.log('win');
    });
    
});
   
//     if((req.protocol+"://"+req.get('host'))=="http://localhost:3001")
// {   
//     console.log("Domain is matched. Information is from Authentic email");

//     if(req.query.id)
//     {
//         console.log("email is verified");
//         res.end("<h1>Email "+mailOptions.to+"is been Successfully verified");
//     }
//     else
//     {
//         console.log("email is not verified");
//         res.end("<h1>Bad Request</h1>");
//     }



router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})







//For client login with Gmail

router.get('/google',passport.authenticate('google',{
    scope:['https://www.googleapis.com/auth/userinfo.email',
          "profile"
       ]
}));

router.post('/google/redirect',passport.authenticate('google'),()=>{
        console.log(_json.sub);
})

router.get('/google1',(req,res)=>{
    res.json({"hello":"hello world"});
})

router.get('/google/redirect',passport.authenticate('google'),()=>{
    console.log('bye')
})



module.exports=router;

//just testing git 
