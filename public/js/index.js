const socket = io();

// called when the user is connected
socket.on('connect', () => {
    console.log('Connected to server');
});

// called when the user disconnects
socket.on('disconnect', () => {
    console.log('Where is the server ?');
});

// called when a new message event is fired
socket.on('newMessage', (message) => {
    const time = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: time
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', (location) => {
    const time = moment(location.createdAt).format('h:mm a');
    const template = jQuery('#location-template').html();
    const html = Mustache.render(template, {
        url: location.url,
        from: location.from,
        createdAt: time
    });

    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', (event) => {
    event.preventDefault();

    const message_text = jQuery('[name=message]');

    // send a message
    socket.emit('createMessage', {
        from: 'client',
        text: message_text.val()
    }, (message) => {
        message_text.val('');
    });

});

const location_button = jQuery('#send-location');

location_button.on('click', () => {
   if(!navigator.geolocation) {
       alert("Geolocation not supported");
   } else {
       location_button.attr('disabled', 'disabled').text('Sending...');
       navigator.geolocation.getCurrentPosition((position) => {
           location_button.removeAttr('disabled').text('Send Location');
           socket.emit('createLocationMessage', {
               latitude: position.coords.latitude,
               longitude: position.coords.longitude
           });
       }, () => {
           alert("Unable to get location");
       })
   }
});
