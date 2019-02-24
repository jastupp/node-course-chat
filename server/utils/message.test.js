const assert = require('expect');
const { createMessage } = require('./message');

describe('generateMesasge', () => {
    const from = 'user';
    const text = 'message';


    it('Shoud create a message', () => {
       const message = createMessage(from, text);

       assert(message.from).toBe(from);
       assert(message.text).toBe(text);
       assert(message.createdAt).toBeTruthy();
    });

});
