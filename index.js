const app = require('./src/app');
const mongoConnect = require('./src/config/mongoose');

const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

  mongoConnect()
    .then(() => console.log('DB connected'))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
});
