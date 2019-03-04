const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { createMessage, createLocationMessage }= require('./utils/message');

const public_path = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(public_path));

// called when we havw a connection
io.on('connection', (socket) => {

    console.log('New User Connected');

    // send a welcome message to the new user
    socket.emit('newMessage', createMessage('Admin', 'Welcome to the message app'));

    // tell every one else about the new user
    socket.broadcast.emit('newMessage', createMessage('Admin', 'A new user has joined the chat.'));

    // called when a message is created
    socket.on('createMessage', (message, callback) => {
        // tell everyone about the new message
        io.emit('newMessage', createMessage(message.from, message.text));
        callback()
    });

    // called when a location is created
    socket.on('createLocationMessage', (location) => {
        // tell everyone about the new location
        io.emit('newLocationMessage', createLocationMessage('Admin', location.latitude, location.longitude));
    });

    // called when the user disconnects
    socket.on('disconnect', () => {
        console.log('Where is the User ?');
    });
});


// listen on the port
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

