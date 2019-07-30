const express=require('express');
const moment=require('moment');
const mongoose=require('mongoose');
const app= express();
const dotenv=require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>{
    console.log('Connected to DB ');
});

app.use(express.json());
app.use('/api',require('./routes/register'));
const Port=process.env.port||5000;
app.listen(Port,()=> console.log(`localhost://${Port}  ${moment().format()}`));