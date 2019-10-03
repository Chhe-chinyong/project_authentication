const express=require('express');
const router=express.Router();
const verify=require('./verifyToken');
const models = require('../model/user');
let { Blog } = models;
const fs = require('fs');
const jwt=require('jsonwebtoken')
//const User=require('../model/user');
const multer=require('multer');
const path=require('path');

// Set storage engine
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
})

function checkFileType(file,cb){
    //Aloowed ext
    const filetypes= /jpeg|jpg|png|gif/;
    //check ext
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype=filetypes.test(file.mimetype);
    if(extname&&mimetype){
        return cb(null,true);
    }
    else{
        return cb (new Error('Erro image only'));
    }
}
//Init uplord
const upload=multer({
    storage:storage,
    limits: {fileSize:1000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
}
}).single('img');

router.post('/upload',async(req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.status(401).send(err.message);
        }
        const token=req.header('auth-token');
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        console.log("verify is: ");
        console.log(verified);
            // console.log(req.file);
            // let blog = new Blog({
            //     userID:verified._id,
            //     tag:req.body.tag,
            //     title:req.body.title,
            //     description:req.body.description,
            //  // image: `http://localhost:3001/public/uploads/${req.file.filename}`,
            // });
        
            try{
                let new_blog = new Blog({
                    userID: verified._id,
                    tag: req.body.tag,
                    title: req.body.title,
                    description: req.body.description,
                    image: `http://localhost:3001/public/uploads/${req.file.filename}`
                })
             
                new_blog.save((err, doc)=>{
                    if(err) console.log(err);
                   // console.log(doc)
                    res.json(doc);
                });
                // .then(()=> console.log("done"))
            }
            catch(err){
                res.status(400).send("error o1");
            
            }
    });
});
    // const blog=new Blog({
    //     title:req.body.title,
    //     description:req.body.description,
    //     image:{filename:req.file.filename(),
    //             path:req.file.path()},
    // });

    // try{
    //     const saveBlog=await blog.save();
    //     res.send('Save sucessful');
    // }
    // catch(err){
    //     res.status(400).send(err);
    // }

module.exports=router;