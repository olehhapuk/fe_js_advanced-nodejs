const cm = require('commander');

cm.program.option('-m, --message <message>', 'user message').option('...');

cm.program.parse(process.argv);

const options = cm.program.opts();

console.log(options);
