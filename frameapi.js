const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

let frameData;

// Socket.IO connection
io.on('connection', socket => {
    console.log('A user connected');

    // Listen for frame update
    socket.on('frame_update', data => {
        frameData = data; // Update the frame data
    });
});

// API endpoint to get current frame
app.get('/current_frame', (req, res) => {
    if (frameData) {
        res.send(frameData); // Send the current frame data
    } else {
        res.sendStatus(204); // No Content if no frame data is available
    }  
});

// Choose your desired port
const port = 4000;
server.listen(port, () => {
    console.log(`Frame API listening on port ${port}`);
});
