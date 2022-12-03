const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

module.exports = () => mongoose.connect(MONGO_URI);
