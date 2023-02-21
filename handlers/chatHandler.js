const User = require('../models/User');
const Message = require('../models/Message');

/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
module.exports = (io, socket) => {
  async function onLogin(username, callback) {
    try {
      let user = await User.findOne({
        username,
      });

      if (!user) {
        user = await User.create({
          username,
        });

        // callback({
        //   status: 201,
        //   message: 'Created',
        //   data: user,
        // });
        // return;
      }

      const users = await User.find();
      const messages = await Message.find().populate('user');

      callback({
        status: 200,
        message: 'OK',
        data: {
          authUser: user,
          users,
          messages,
        },
      });
    } catch (error) {
      callback({
        status: 500,
        message: 'Server error',
        data: error.message,
      });
    }
  }

  async function onMessageCreate(text, userId, cb) {
    let message = await Message.create({
      text,
      user: userId,
    });
    message = await message.populate('user');

    // io.emit() - Emit event to all users
    // socket.emit() - Emit event to one user
    // socket.broadcast.emit() - Emit event to all users except this one user

    cb({
      status: 200,
      data: message,
    });

    socket.broadcast.emit('message create', message);
  }

  function onTyping(username) {
    socket.broadcast.emit('typing', username);
  }

  socket.on('login', onLogin);
  socket.on('message create', onMessageCreate);
  socket.on('typing', onTyping);
};
