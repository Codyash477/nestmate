import 'dotenv/config'; import express from 'express'; import cors from 'cors'; import mongoose from 'mongoose'; import {createServer} from 'http'; import {Server} from 'socket.io';
const app=express();const server=createServer(app);app.use(cors({origin:true}));app.use(express.json());
app.get('/api/health',(_req,res)=>res.json({ok:true,service:'Nestmate API'}));
app.get('/api/demo/matches',(_req,res)=>res.json([{name:'Aarav Mehta',compatibility:96,city:'Mumbai',budget:18000},{name:'Riya Kapoor',compatibility:92,city:'Mumbai',budget:16500},{name:'Kabir Shah',compatibility:89,city:'Mumbai',budget:20000}]));
const io=new Server(server,{cors:{origin:'*'}});io.on('connection',socket=>{socket.on('join-room',(room:string)=>socket.join(room));socket.on('send-message',(msg)=>{if(msg?.room&&msg?.text)io.to(msg.room).emit('new-message',msg);});});
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/nestmate').then(()=>server.listen(Number(process.env.PORT||4000),()=>console.log('Nestmate API ready'))).catch(err=>{console.error(err);process.exit(1)});
