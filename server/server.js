/*jshint esversion: 6 */

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Display Name and Room Name are reuqired.');
    }

    socket.join(params.room);
    //socket.leave('room name');

    // io.emit -> io.to('room name').emit
    //
    // socket.broadcast.emit -> socket.broadcast.to('room name').emit

    // emits a message to a single user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    // emits a message to everyone but the user
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  // listen for new messages FROM clients, emit them back TO clients
  socket.on('createMessage', (message, callback) => {
    console.log('Msg from client', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', {lat: coords.lat, lng: coords.lng}));
  });

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
