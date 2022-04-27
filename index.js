const express = require('express');

const contactsRouter = require('./routes/contacts');
const callsRouter = require('./routes/calls');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// app.use(express.static(path.join(process.cwd(), 'public')));

function logHello(req, res, next) {
  console.log('Hello');
  next();
}

// app.use(logHello);

// Allow reading JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
  });
});

app.get('/about', (req, res) => {
  res.render('about-us', {
    title: 'About Us',
  })
});

app.use('/contacts', contactsRouter);
app.use('/calls', callsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
