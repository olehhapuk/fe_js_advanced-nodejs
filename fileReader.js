const fs = require('fs').promises;

async function main() {
  try {
    const data = await fs.readFile('./data.txt', {
      encoding: 'utf-8',
    });
    console.log(data);

    const jsonData = await fs.readFile('./data.json', {
      encoding: 'utf-8',
    });
    const json = JSON.parse(jsonData);
    console.log(json);
    console.log(json.name);

    const obj = {
      message: 'Replaced',
    };
    await fs.writeFile('./data.json', JSON.stringify(obj));

    await fs.appendFile('./data.txt', '\nNew text');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
