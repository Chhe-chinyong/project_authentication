const jwt=require('jsonwebtoken');

function auth(req,res,next){
    const token=req.header('auth-token');
    console.log('hello');
    if(!token) return res.status(401).send('access denied');
    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified; // when decode mok vinh mean _id, token
        next();
    }
    catch(err){
        res.status(401).send(err);
    }
}

module.exports=auth;