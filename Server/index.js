import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { companyAccountSchema, interpreterAccountSchema } from './schemas/accounts';
import { bookingSchema } from './schemas/booking';

const app = express();
const port = 443;

const CompanyUsers = mongoose.model('company_users', companyAccountSchema);
const InterpreterUsers = mongoose.model('interpreter_users', interpreterAccountSchema);
const Bookings = mongoose.model('bookings', bookingSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sign-up', async (req, res) => {
  let user;

  try {
    if (req.body.account_type === 'Company') {
      user = await CompanyUsers.create(req.body);
    } else {
      user = await InterpreterUsers.create(req.body);
    };
    res.status(200).json({ user });
  } catch(err) {
    res.status(409).json({ error: `Error trying to sign up - ${err}` });
  }
});

app.get('/sign-in', async (req, res) => {
  const { email, password } = req.headers;
  try {
    let companyUsers = await CompanyUsers.findOne({ email, password });

    if(!companyUsers) {
      let interpreterUsers = await InterpreterUsers.findOne({ email, password });

      if(!interpreterUsers) {
        res.status(409).json({ error: `Error trying to sign in - Account not found` });
      }
      res.send(interpreterUsers);
    } else {
      res.send(companyUsers);
    }
  } catch(err) {
    res.status(409).json({ error: `Error trying to sign in - ${err}` });
  }
});

app.get('/api/company-users', async (req, res) => {
  try {
    let users = await CompanyUsers.find();
    res.send(users);
  } catch(err) {
    res.status(409).json({ error: `Error getting company users - ${err}` });
  }
});

app.get('/api/interpreter-users', async (req, res) => {
  try {
    let users = await InterpreterUsers.find();
    res.send(users);
  } catch(err) {
    res.status(409).json({ error: `Error getting interpreter users - ${err}` });
  }
});

app.post('/booking-request', async (req, res) => {
  try {
    const booking = await Bookings.create(req.body);
    res.status(200).json(booking);
  } catch(err) {
    res.status(409).json({ error: `Error trying to save your booking - ${err}` });
  }
});

app.get('/availability', async (req, res) => {
  const { start_date, end_date, postcode } = req.headers;
  try {
    let bookedInterpreters = await Bookings.find({ start_date: { $gte: start_date}, end_date: { $lte: end_date } }).distinct('interpreter_id');
    let availableInterpreters = await InterpreterUsers.find({ _id: { $nin: bookedInterpreters } });

    res.send(availableInterpreters);
  } catch(err) {
    res.status(409).json({ error: `Error getting available interpreters - ${err}` });
  }
});

connect();

function listen() {
  app.listen(port);
  console.log('App started on port ' + port);
}

function connect() {
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
