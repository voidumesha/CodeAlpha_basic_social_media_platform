import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json({limit: '30mb', extended: true}));


app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

mongoose.connect("mongodb+srv://voidumesha:112224448@socialmedia.rggl6on.mongodb.net/socialmedia?retryWrites=true&w=majority&appName=socialmedia").
then(() => app.listen(5000, () => console.log("Server is running on port 5000"))).
catch((error) => console.log(error.message));
















