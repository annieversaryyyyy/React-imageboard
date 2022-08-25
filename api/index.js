const express = require("express");
const cors = require('cors');
const fileDb = require('./fileDb');
const messages = require('./Messages/Messages');

const port = 8000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/messages', messages);
fileDb.init();

app.listen(port, () => {
    console.log('we are live on  port: ' + port);
});
