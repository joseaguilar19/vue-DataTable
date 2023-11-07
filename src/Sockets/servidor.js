const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  allowEIO3: true,
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], 
	credentials: true,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
	console.log('Recibiendo respuesta del cliente ...' + msg);

    if(msg.toLowerCase() === 'hola'){
        socket.emit('msg personal', 'Hola, Este es un mensaje del server');
    }else socket.emit('chat message', msg);

  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});