const createMessage = (from, text) => {
    return { from: from, text: text, createdAt: new Date().getTime() };
};

const createLocationMessage = (from, latitude, longitude) => {
    return { from: from, url: `https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: new Date().getTime() };
};

module.exports = {
    createMessage: createMessage,
    createLocationMessage: createLocationMessage
};