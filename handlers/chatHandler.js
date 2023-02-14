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

      callback({
        status: 200,
        message: 'OK',
        data: user,
      });
    } catch (error) {
      callback({
        status: 500,
        message: 'Server error',
        data: error.message,
      });
    }
  }

  async function onMessageCreate(text, userId) {
    const message = await Message.create({
      text,
      user: userId,
    });

    // io.emit() - Emit event to all users
    // socket.emit() - Emit event to one user
    // socket.broadcast.emit() - Emit event to all users except this one user

    io.emit('message create', await message.populate('user'));
  }

  socket.on('login', onLogin);
  socket.on('message create', onMessageCreate);
};
