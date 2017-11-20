var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// listens for new messages FROM server
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

$('#message-form').on('submit', function (event) {
  event.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('#message-form input[name="message"]').val()
  }, function () {

  });
});
