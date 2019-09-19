const express=require('express');
const moment=require('moment');
const mongoose=require('mongoose');
const app= express();
const dotenv=require('dotenv');
const chalk=require('chalk');
const cors = require("cors");
const bodyParser=require('body-parser');
dotenv.config();
try{
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>{
    console.log(chalk.black.bgGreen('Connected to DB '));
});}
catch(err){
    console.log(chalk.red.bold(err));
}
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

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
 app.use('/',require('./routes/post'));
 app.use('/',require('./routes/register'));


const Port=3001;
app.listen(Port,()=> console.log(`localhost://${Port}  ${moment().format()}`));