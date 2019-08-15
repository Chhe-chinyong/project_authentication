const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const dotenv=require('dotenv');
dotenv.config();
passport.use(
    new GoogleStrategy({
        callbackURL:'/google/redirect',
        clientID:process.env.clientID,
        clientSecret:process.env.clientSECRET
    },()=>{
       // console.log('hello dogs')
    })
);