import { Server } from 'socket.io';
import express from 'express';
const app = express();
app.use(express.static('.'));
const server = app.listen(8080);
const io = new Server(server);
io.on('connection', (socket) => {
  socket.on('text', ({ message, sender }) => {
    io.emit('text', { message: message, sender: sender });
  });
});
