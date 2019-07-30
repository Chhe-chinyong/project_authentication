const mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({
    username:{type:String,required:true,min:3,max:12},
    password: {type:String,required:true,min:3,max:12},
    email:{type:String,required:true},
    date: { type: Date, default: Date.now }
});

module.exports= mongoose.model('User', UserSchema);