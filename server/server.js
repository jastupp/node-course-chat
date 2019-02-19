const path = require('path');
const express = require('express');

const public_path = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static(public_path));


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

