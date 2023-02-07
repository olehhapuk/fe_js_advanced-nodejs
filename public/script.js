const socket = io();

socket.emit('user connected', `john_${socket.id}`);

socket.on('user connected', (username) => {
  document.body.insertAdjacentHTML('afterbegin', `<p>${username}</p>`);
});
