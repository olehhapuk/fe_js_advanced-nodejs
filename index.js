const express = require('express');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const chatHandler = require('./handlers/chatHandler');

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  chatHandler(io, socket);
});

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
