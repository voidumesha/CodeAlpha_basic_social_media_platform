const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/socialmedia', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const userRoutes = require('./public/routes/users');
app.use('/users', userRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
