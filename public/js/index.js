var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// listens for new messages FROM server
socket.on('newMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

// submit button handler
$('#message-form').on('submit', function (event) {
  event.preventDefault();
  var txtMessage = $('#message-form input[name="message"]');

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
