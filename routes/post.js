const express=require('express');
const router=express.Router();
const verify=require('./verifyToken');
const Blog=require('../model/user');
const fs = require('fs');
const jwt=require('jsonwebtoken')
//const User=require('../model/user');
const multer=require('multer');
const path=require('path');
// router.post('/post',async(req,res)=>{
//     const BlogUser = new Blog;
//     BlogUser.image.data = fs.readFileSync(imgPath);
//     BlogUser.img.contentType = 'image/png';
//     var imgPath = req.body.image;
//     imgPath.data=fs.readFileSync(imgPath);
//     const BlogUser=new Blog({
//         title:req.body.title,
//         imageUrl:req.body.imageUrl,
//         image:imgPath.data,
//         image:imgPath.contentType,
//         body:req.body.body,
//     })
//     try{
//         const saveBlog=await BlogUser.save();
//         res.send(saveBlog);
//     }
//     catch(err){
//         res.status(400).send(err);
//         // should go to place create blog template
//     }

// })
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
        console.log(verified._id);
            console.log(req.file);
            const blog=new Blog({
                userID:verified._id,
                tag:req.body.tag,
                title:req.body.title,
                description:req.body.description,
             //   image: `http://localhost:3001/public/uploads/${req.file.filename}`,
            });
        
            try{
                const saveBlog= await blog.save();
                res.send('Save sucessful');
            }
            catch(err){
                res.status(400).send(err);
            
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