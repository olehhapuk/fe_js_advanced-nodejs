const express = require('express');
const path = require('path');

const contactsRouter = require('./routes/contacts');
const callsRouter = require('./routes/calls');

const app = express();

// app.use(express.static(path.join(process.cwd(), 'public')));

function logHello(req, res, next) {
  console.log('Hello');
  next();
}

// app.use(logHello);

// Allow reading JSON
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send("I'm working!");
});

app.get('/123', (req, res) => {
  res.send("I'm 123");
});

app.use('/contacts', contactsRouter);
app.use('/calls', callsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
