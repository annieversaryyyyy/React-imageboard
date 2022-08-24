const express = require("express");
const cors = require('cors');

const port = 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log('we are live on  port: ' + port);
});
