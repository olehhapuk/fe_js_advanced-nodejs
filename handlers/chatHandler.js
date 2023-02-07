/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
module.exports = (io, socket) => {
  function userConnected(username) {
    socket.broadcast.emit('user connected', username);
  }

  socket.on('user connected', userConnected);
};
