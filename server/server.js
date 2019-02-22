const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const public_path = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(public_path));

io.on('connection', (socket) => {
    console.log('New User Connected');



    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });


    // socket.emit('newEmail', {
    //     from: 'me',
    //     text: 'Hello',
    //     created: '123'
    // });

    // socket.on('createEmail', (email) => {
    //    console.log('createEmail..', email);
    // });

    socket.on('disconnect', () => {
        console.log('Where is the User ?');
    });
});



server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

