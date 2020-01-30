import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import accountRoute from './routes/account';
import apiRoute from './routes/api';
import bookingRoute from './routes/booking';

const app = express();
const port = 443;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/account', accountRoute);
app.use('/api', apiRoute);
app.use('/booking', bookingRoute);

connect();

function listen() {
  app.listen(port);
  console.log('App started on port ' + port);
}

function connect() {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.connection
    .on('error', console.error)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect('mongodb://35.246.119.118:27017/Enigma', {
    keepAlive: 1,
    useNewUrlParser: true
  });
}
