const { nanoid } = require('nanoid');
const fs = require('fs').promises;

const usersPath = './users.json';

async function getUsers() {
  return JSON.parse(await fs.readFile(usersPath));
}

exports.register = async (username, password) => {
  const newUser = {
    id: nanoid(),
    username,
    password,
  };

  const users = await getUsers();
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users));
  console.log('User registered');
};

exports.login = async (username, password) => {
  const users = await getUsers();
  const user = users.find(
    (item) => item.username === username && item.password === password
  );

  if (!user) {
    console.log(`No user ${username} found`);
    return;
  }

  // guard close

  console.log(user);
};

// module.exports = {
//   register,
//   login,
// };
