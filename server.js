import { WebSocketServer,WebSocket } from "ws";
import 'dotenv/config';

const wss = new WebSocketServer({port: process.env.PORT});

wss.on('connection', (socket,request)=>{
    const ip = request.socket.remoteAddress;

    socket.on('message',(rawdata)=>{
        const message = rawdata.toString();
        //console.log(rawdata);
        console.log(rawdata.toString());

        wss.clients.forEach((client)=>{
            if(client.readyState === 1){
                client.send(`Server Broadcast : ${message}`);
            }
        })
    });

    socket.on('error',(err)=>{
        console.error(`Error : ${err.message} : ${ip}`);
    })

    socket.on('close',()=>{
        console.log(`Client Disconnected`);
    })
});


