const express=require('express');
const moment=require('moment');
const mongoose=require('mongoose');
const bodyParser =  require("body-parser")
const app= express();
const dotenv=require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>{
    console.log('Connected to DB ');
});
    // b brilliant Aglorithms
// app.use(bodyParser.json())
// let auth = (req, res, next) => {
//     if(!req.headers.authorizations || req.headers.authorizations !== "hello") {
//         res.status(403).send("Unauthorized");
//     } 
//     if(req.headers.authorizations === "hello") {
//         next()
//     }
// }
// app.use('/api',require('./routes/register'));
// app.post("/login",(req, res)=> {
//     console.log(req.body);
//     res.json({token: "asdfasdfasdfasdfasdfadsf"})
// })
// app.post("/api", auth, (req, res)=> {
//     res.json({message: "success"})
// })
 app.use(express.json());
 app.use('/api',require('./routes/register'));

const Port=process.env.port||5000;
app.listen(Port,()=> console.log(`localhost://${Port}  ${moment().format()}`));