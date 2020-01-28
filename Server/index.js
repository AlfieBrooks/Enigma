import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { companyAccountSchema, interpreterAccountSchema } from './schemas/singup';
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
    if (req.headers.account_type === 'Company') {
      console.log(req.headers);
      user = await CompanyUsers.create(req.headers);
    } else {
      user = await InterpreterUsers.create(req.headers);
    };
    return res.status(200).json({ user });
  } catch(err) {
    return res.status(409).json({ error: `Error trying to sign up ${err}` });
  }
});

// TODO: Make sign in check for either CompanyUsers or InterpreterUsers collections
app.get('/sign-in', async (req, res) => {
  const { email, password } = req.headers;
  try {
    let user = await Account.findOne({ email, password });
    console.log('Log: here', email, password);
    console.log('Log: user', user);
    return res.status(200).json({ user });
  } catch(err) {
    return res.status(409).json({ error: `Error trying to sign in ${err}` });
  }
});

app.get('/api/company-users', async (req, res) => {
  try {
    let users = await CompanyUsers.find();
    res.send(users);
  } catch(err) {
    return res.status(409).json({ error: `Error trying to sign in ${err}` });
  }
});

app.get('/api/interpreter-users', async (req, res) => {
  try {
    let users = await InterpreterUsers.find();
    res.send(users);
  } catch(err) {
    return res.status(409).json({ error: `Error trying to sign in ${err}` });
  }
});

app.post('/booking-request', async (req, res) => {
  try {
    const booking = await Bookings.create(req.body);
    return res.status(200).json(booking);
  } catch(err) {
    return res.status(409).json({ error: `Error trying to save your booking ${err}` });
  }
});

app.get('/availability', async (req, res) => {
  const { startdate, enddate, postcode } = req.headers;
  try {
    const bookedInterpreters = await Bookings.find({ startdate: { $gte: startdate}, enddate: { $lte: enddate } }).distinct('interpreterId');

    const availableInterpreters = await InterpreterUsers.find({ _id: { $nin: bookedInterpreters } });
    return availableInterpreters;
  } catch(err) {
    return res.status(409).json({ error: `Error getting available interpreters ${err}` });
  }
});

connect();

function listen() {
  app.listen(port);
  console.log('App started on port ' + port);
}

function connect() {
  mongoose.connection
    .on('error', console.error)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect('mongodb://35.246.119.118:27017/Enigma', {
    keepAlive: 1,
    useNewUrlParser: true
  });
}
