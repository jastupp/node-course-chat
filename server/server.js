const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { createMessage, createLocationMessage }= require('./utils/message');
const { isValidString } = require('./utils/validation');
const { Users } = require('./utils/users');

const public_path = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(public_path));

// called when we have a connection
io.on('connection', (socket) => {

    console.log('New User Connected');

    socket.on('join', (params, callback) => {
        console.log('Join Called');
        if(isValidString(params.name) && isValidString(params.room)) {
            socket.join(params.room);
            users.remove(socket.id);
            users.add(socket.id, params.name, params.room);

            //console.log(users);
            //console.log(users.getAll(params.room));

            io.to(params.room).emit('updateUserList', users.getAll(params.room));

            socket.emit('newMessage', createMessage('Admin', 'Welcome to the message app'));
            socket.broadcast.to(params.room).emit('newMessage', createMessage('Admin', `${params.name} has joined.`));
            callback();
        } else {
            callback('Name and room are required');
        }
    });

    // called when a message is created
    socket.on('createMessage', (message, callback) => {

        const user = users.get(socket.id);

        // tell everyone about the new message
        io.to(user.room).emit('newMessage', createMessage(user.name, message.text));
        callback()
    });

    // called when a location is created
    socket.on('createLocationMessage', (location) => {
        const user = users.get(socket.id);

        // tell everyone about the new location
        io.to(user.room).emit('newLocationMessage', createLocationMessage(user.name, location.latitude, location.longitude));
    });

    // called when the user disconnects
    socket.on('disconnect', () => {
        const user = users.remove(socket.id);
        io.to(user.room).emit('updateUserList', users.getAll(user.room));
        io.to(user.room).emit('newMessage', createMessage('Admin', `${user.name} has left..`));

        console.log('Where is the User ?');
    });
});


// listen on the port
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

