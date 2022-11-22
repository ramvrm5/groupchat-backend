const PORT = process.env.PORT || 3000;
const INDEX = require('./index.html');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const http = require('http');
//const server = http.createServer(app);
//const { Server } = require("socket.io");

const server = express()
    //.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);


//const io = new Server(server);



/* app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); */

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', msg => {
        console.log('From client: ', msg)
        io.emit('chat message', msg)
    })
});

/* server.listen(3000, () => {
    console.log('listening on *:3000');
}); */