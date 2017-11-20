var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // sends a new message TO server
  socket.emit('createMessage', {
    from: "U.N. Owen",
    text: "Here's a new message from client"
  });

});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// listens for new messages FROM server
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
