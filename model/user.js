const mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({
    username:{type:String,required:true,min:3,max:12},
    password: {type:String,required:true,min:3,max:12},
    email:{type:String,required:true},
    date: { type: Date, default: Date.now },
    confirmed:{type:Boolean,default:false}
});


var BlogSchema=new mongoose.Schema({
    userID:{type: String},
    title:{type:String,required:true},
    image: {type:String},
    description:{type:String,required:true},
    created:{type:Date, default:Date.now},
    tag:{type:String}
});

var Image=new mongoose.Schema({
    name:{type:String},
    UserId:{type:Number}

});

var tokenSchema=new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId,required: true},
    tokenUser:{type:String,required:true},
    createdAt: { type: Date, required: true, default: Date.now }

})

let models = {
    Image: mongoose.model('Image',Image),
    Blog: mongoose.model('Blog',BlogSchema),
    User: mongoose.model('User', UserSchema),
    Token:mongoose.model('Token',tokenSchema)
}

module.exports= models;