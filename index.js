const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "vscode-webview://11puh1rgk911fukq9ade1hsgt1rsabn3f3cfqo4schec3a1nkahv",
        methods: ["GET", "POST"]
    }
});
//const io = new Server(server);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
let users = [];
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('setUsername', function (data) {
        console.log(data);
        if (users.indexOf(data.username) > -1) {
            socket.emit('userExists', data.username + ' username is taken! Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet', { username: data.username });
        }
    });
    socket.on('msg', function (data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});