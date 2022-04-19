const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 5000;

const contentType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

/**
 * req: request(запит)
 * res: response(відповідь)
 */
const server = http.createServer(async (req, res) => {
  let fileName = req.url.substring(1);
  if (req.url === '/') {
    fileName = 'index.html';
  }

  const ext = path.extname(fileName);
  res.setHeader('Content-Type', contentType[ext] || 'text/plain');

  const filePath = path.join(process.cwd(), fileName);
  const data = await fs.readFile(filePath);

  res.end(data);
});

// http://localhost:5000
server.listen(PORT);
