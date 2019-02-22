const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //    from: 'john',
    //    text: 'Hello from john',
    //    createdAt: 2345
    // });
});

socket.on('disconnect', () => {
    console.log('Where is the server ?');
});

// socket.on('newEmail', (data) => {
//     console.log('newEmail: ', data);
// });

socket.on('newMessage', (message) => {
    console.log('newMessage', message);
});