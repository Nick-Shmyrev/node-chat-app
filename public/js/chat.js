var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('connected to server');
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No errors');
    }


  });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>');

  users.forEach(function (user) {
    ol.append( $('<li></li>').text(user) );
  });

  $('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
});

// submit button handler
$('#message-form').on('submit', function (event) {
  event.preventDefault();
  var txtMessage = $('#message-form input[name="message"]');

  socket.emit('createMessage', {
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
