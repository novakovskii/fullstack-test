// const Express = require("express")();
// const Http = require("http").Server(Express);
// const Socketio = require("socket.io")(Http, {
//     cors: {
//         origin: "*"
//     }
// });

// let position = {
//     x: 0,
//     y: 0
// };

// Socketio.on("connection", socket => {
//     socket.emit("position", position);

//     socket.on("draw", data => {
//         Socketio.emit("position", data);
//     })

//     socket.on("reposition", data => {
//         Socketio.emit("reposition", data);
//     })

//     socket.on("clear", () => {
//         Socketio.emit("clear");
//     })
// });

// Http.listen(3000, () => {
//     console.log("Listening at :3000...");
// });


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = __dirname + '/views/';

app.use(express.static(path));

app.get('/', (req, res) => {
  res.sendFile(path + '/index.html');
});

let position = {
    x: 0,
    y: 0
};

io.on("connection", socket => {
    socket.emit("position", position);

    socket.on("draw", data => {
        io.emit("position", data);
    })

    socket.on("reposition", data => {
        io.emit("reposition", data);
    })

    socket.on("clear", () => {
        io.emit("clear");
    })
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});