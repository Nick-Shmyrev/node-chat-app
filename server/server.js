/*jshint esversion: 6 */

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // emits a message to a single user
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  // emits a message to everyone but the user
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // listen for new messages FROM clients, emit them back TO clients
  socket.on('createMessage', (message, callback) => {
    console.log('Msg from client', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('Msg from server');
  });

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
