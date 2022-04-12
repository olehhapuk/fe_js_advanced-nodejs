const { Command } = require('commander');
const { register, login } = require('./usersController');

const program = new Command();

program
  .option('-a, --action <type>', 'User action')
  .option('-u, --username <type>', 'Username')
  .option('-p, --password <type>', 'Password');

program.parse(process.argv);

const args = program.opts();

main(args);

function main({ action, username, password }) {
  switch (action) {
    case 'register':
      register(username, password);
      break;

    case 'login':
      login(username, password);
      break;

    default:
      console.log('This action is not supported');
      break;
  }
}
