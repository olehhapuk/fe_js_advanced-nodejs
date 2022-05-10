const express = require('express');
const path = require('path');
const { nanoid } = require('nanoid');
const fs = require('fs').promises;

const app = express();

const viewsPath = path.join(process.cwd(), 'views');
const contactsPath = path.join(process.cwd(), 'db/contacts.json');

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

/**
 * {
 *   id, name, phone, address
 * }
 */

async function findAll() {
  const allContacts = JSON.parse(await fs.readFile(contactsPath));
  return allContacts;
}

async function create({ name, phone, address }) {
  const newContact = {
    id: nanoid(),
    name,
    phone,
    address,
  };

  const allContacts = await findAll();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
}

async function deleteContact(contactId) {
  let allContacts = await findAll();
  allContacts = allContacts.filter((item) => item.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
}

async function findById(contactId) {
  const allContacts = await findAll();
  return allContacts.find((item) => item.id === contactId);
}

app.get('/', async (req, res) => {
  res.render('index', {
    contacts: await findAll(),
  });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', async (req, res) => {
  await create(req.body);
  res.redirect('/');
});

app.get('/delete/:contactId', async (req, res) => {
  const { contactId } = req.params;
  await deleteContact(contactId);

  res.redirect('/');
});

app.get('/contact/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await findById(contactId);
  if (!contact) {
    res.redirect('/404');
    return;
  }

  res.render('info', {
    contact,
  });
});

app.get('/404', (req, res) => {
  res.render('not-found');
});

module.exports = app;
