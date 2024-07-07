import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthUser from './routes/AuthUser.js';

const app = express();
app.use(bodyParser.json({limit: '30mb', extended: true}));


app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

dotenv.config();

mongoose.connect(process.env.MONGO_DB).
then(() => app.listen(process.env.PORT, () => console.log("Server is running"))).
catch((error) => console.log(error.message));

//rourtes auths

app.use('/auth', AuthUser);





























