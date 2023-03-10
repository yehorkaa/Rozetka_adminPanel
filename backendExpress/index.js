require('dotenv').config(); //В Node.js, require('dotenv').config() загружает содержимое файла .env в переменные среды приложения.
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./router/index.js');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

// Удалите эту строку:
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const start = async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      app.listen(PORT, () => console.log('server was started at ' + PORT));
    } catch (e) {
      console.log(e);
    }
};

start();
