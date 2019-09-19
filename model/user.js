const mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({
    username:{type:String,required:true,min:3,max:12},
    password: {type:String,required:true,min:3,max:12},
    email:{type:String,required:true},
    date: { type: Date, default: Date.now }
});


var BlogSchema=new mongoose.Schema({
   
    title:{type:String,required:true},
    image: { path:String,filename:String },
    description:{type:String,required:true},
    created:{type:Date, default:Date.now}
});

module.exports=mongoose.model('Blog',BlogSchema)
module.exports= mongoose.model('User', UserSchema);