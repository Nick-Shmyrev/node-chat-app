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
  li.text(message.from + ":" + message.text);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  console.log('newLocationMessage', message);

  var li = $('<li></li>');
  var a = $('<a target="_blank">User Location</a>');

  a.attr('href', message.url);
  li.text(message.from + ': ');
  li.append(a);

  $('#messages').append(li);
});

// submit button handler
$('#message-form').on('submit', function (event) {
  event.preventDefault();
  let txtMessage = $('#message-form input[name="message"]');

  socket.emit('createMessage', {
    from: 'User',
    text: txtMessage.val()
  }, function () {
    txtMessage.val('');
  });
});

var btnLocation = $('#send-location');

btnLocation.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported');
  }

  btnLocation.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (pos) {
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    });
    btnLocation.removeAttr('disabled').text('Send location');
  }, function () {
    alert('Unable to fetch location');
    btnLocation.removeAttr('disabled').text('Send location');
  });
});
