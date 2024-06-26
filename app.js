const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URI;

if (!MONGOURL) {
    console.error('MONGO_URI environment variable is not defined.');
    process.exit(1);
}

mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the Database successfully');
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
