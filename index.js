const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.send("I'm working!");
});

app.get('/123', (req, res) => {
  res.send("I'm 123");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
