const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const dotenv=require('dotenv');
const user=require('../model/user');
dotenv.config();
passport.use(
    new GoogleStrategy({
        callbackURL:'/google/redirect',
        clientID:process.env.clientID,
        clientSecret:process.env.clientSECRET
    },(accessToken,refreshToken,profile,done)=>{
       // const googleid=profile.id;
        //console.log(profile._json.email)
        console.log(profile)
        //console.log(googleiD);
        //const id=await user.findone({googleID:googleid})
    })
);