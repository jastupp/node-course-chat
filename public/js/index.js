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
});