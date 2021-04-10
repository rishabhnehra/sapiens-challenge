const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const users = require('./routes/users');
const PORT = 4000;

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));