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
    console.log('newMessage', message);

    const li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);

});

socket.on('newLocationMessage', (location) => {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${location.from} `);
    a.attr('href', location.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (event) => {
    event.preventDefault();

    // send a message
    socket.emit('createMessage', {
        from: 'client',
        text: jQuery('[name=message]').val()
    }, (message) => {
        console.log('Got it ....', message)
    });

});

const location_button = jQuery('#send-location');

location_button.on('click', () => {
   if(!navigator.geolocation) {
       alert("Geolocation not supported");
   } else {
       navigator.geolocation.getCurrentPosition((position) => {
           socket.emit('createLocationMessage', {
               latitude: position.coords.latitude,
               longitude: position.coords.longitude
           });
       }, () => {
           alert("Unable to get location");
       })
   }
});
