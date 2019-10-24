const http = require('http');
const app = require('./app');
const socket = require('socket.io');

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port,function() {
  console.log("listening on port 8000");
});

const connections = [];

const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log(socket.id);

  socket.on('disconnect' , function(data) {
    connections.splice(connections.indexOf(socket),1);
  });

  socket.on('sendingMessage', function(data) {
    io.emit('receivingMessage', data);
  });

  socket.on('oldMessage', function(data) {
    io.emit('messageList', data);
  });

  socket.on('newUser',function(data) {
    io.emit('onlineUsers',data);
  });
});
