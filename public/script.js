const socket = io();
const refs = {
  authForm: document.querySelector('#authForm'),
  messageForm: document.querySelector('#messageForm'),
  messagesList: document.querySelector('#messagesList'),
  usersList: document.querySelector('#usersList'),
  typingMessage: document.querySelector('#typingMessage'),
};
let user = null;

function createMessageHtml(message) {
  return `<div class="list-group-item ${
    message.user._id === user._id ? 'active' : ''
  }">
    <h5>${message.user.username}</h5>
    <p>${message.text}</p>
  </div>`;
}

function createUserHtml(user) {
  return `<div class="list-group-item">${user.username}</div>`;
}

const stopTyping = _.debounce(() => {
  refs.typingMessage.hidden = true;
}, 500);

refs.messageForm.elements.text.disabled = true;
refs.messageForm.elements.submitBtn.disabled = true;

refs.authForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = e.target.elements.username.value;
  const loginBtn = e.target.elements.submitBtn;

  loginBtn.disabled = true;
  socket.emit('login', username, (res) => {
    if (res.status === 200) {
      user = res.data.authUser;
      refs.messageForm.elements.text.disabled = false;
      refs.messageForm.elements.submitBtn.disabled = false;
      refs.authForm.remove();

      const messagesHtml = res.data.messages
        .reverse()
        .map((message) => createMessageHtml(message))
        .join('');
      refs.messagesList.insertAdjacentHTML('afterbegin', messagesHtml);

      const usersHtml = res.data.users
        .map((user) => createUserHtml(user))
        .join('');
      refs.usersList.insertAdjacentHTML('afterbegin', usersHtml);
    }
  });
});

refs.messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = e.target.elements.text.value;
  const sendBtn = e.target.elements.submitBtn;

  sendBtn.disabled = true;
  socket.emit('message create', text, user._id, (res) => {
    if (res.status === 200) {
      const html = createMessageHtml(res.data);
      refs.messagesList.insertAdjacentHTML('afterbegin', html);
    }

    sendBtn.disabled = false;
    e.target.elements.text.value = '';
  });
});

refs.messageForm.elements.text.addEventListener('input', () => {
  socket.emit('typing', user.username);
});

socket.on('message create', (message) => {
  const html = createMessageHtml(message);
  refs.messagesList.insertAdjacentHTML('afterbegin', html);
});

socket.on('typing', (username) => {
  refs.typingMessage.hidden = false;
  refs.typingMessage.textContent = `${username} is typing`;
  stopTyping();
});
