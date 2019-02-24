const assert = require('expect');
const { createMessage, createLocationMessage } = require('./message');

describe('createMessage', () => {
    const from = 'user';
    const text = 'message';


    it('Should create a message', () => {
       const message = createMessage(from, text);

       assert(message.from).toBe(from);
       assert(message.text).toBe(text);
       assert(message.createdAt).toBeTruthy();
    });

});

describe('createLocationMessage', () => {
    const from = 'user';
    const lat = '123';
    const long = '987';

    it('Should create a location message', () => {
       const message = createLocationMessage(from, lat, long);

       assert(message.from).toBe(from);
       assert(message.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
       assert(message.createdAt).toBeTruthy();
    });

});
