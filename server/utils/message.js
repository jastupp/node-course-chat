
const moment = require('moment');


const createMessage = (from, text) => {
    return { from: from, text: text, createdAt: moment().valueOf() };
};

const createLocationMessage = (from, latitude, longitude) => {
    return { from: from, url: `https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: moment().valueOf() };
};

module.exports = {
    createMessage: createMessage,
    createLocationMessage: createLocationMessage
};