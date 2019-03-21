const socket = io();

const scrollToBottom = () => {
    const messages = jQuery('#messages');
    const new_message = messages.children('li:last-child');

    const scroll_height = messages.prop('scrollHeight');
    const scroll_top = messages.prop('scrollTop');
    const client_height = messages.prop('clientHeight');
    const new_message_height = new_message.innerHeight();
    const last_message_height = new_message.prev().innerHeight();

    if(client_height + scroll_top + new_message_height + last_message_height >= scroll_height) {
        messages.scrollTop(scroll_height);
    }
};

// called when the user is connected
socket.on('connect', () => {
    console.log('Connected to server');
    const params = jQuery.deparam();
    console.log('Connected to server', params);

    socket.emit('join', params, (error) => {
        if(error) {
            alert(error);
            window.location.href = "/";
        } else {
            console.log('No Error');
        }
    });

});

// called when the user disconnects
socket.on('disconnect', () => {
    console.log('Where is the server ?');
});

// called when the user list needs updating
socket.on('updateUserList', (users) => {
    let ol = jQuery('<ol></ol>');

    // loop for the users
    users.forEach((next) => {
       ol.append(jQuery('<li></li>').text(next));
    });

    jQuery('#users').html(ol);

    console.log('Users', users);
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
    scrollToBottom();
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
    scrollToBottom();
});

jQuery('#message-form').on('submit', (event) => {
    event.preventDefault();

    const message_text = jQuery('[name=message]');

    // send a message
    socket.emit('createMessage', {
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
