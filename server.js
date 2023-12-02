const express = require('express');
const {createServer} = require('http');

const {Server} = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors:{
        origin : 'http://127.0.0.1:5500'
    }
});
io.on("connection",(socket)=>{
    console.log(`Socket is ${socket.id}`);

    socket.on('user enter',(data)=>{
        console.log('user entered', data);

        io.emit('user enter',data);
    });

    socket.on('message',(data)=>{
        io.emit('message',data);
    });

    socket.on('user exit',(username)=>{
        io.emit('user exit',username);
    })
})

httpServer.listen(3000, ()=>{
    console.log("Listening on port 3000");
});