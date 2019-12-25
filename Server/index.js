import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { accountDetails } from './schemas/singup'

const app = express();
const port = 443

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/config', (req, res) => {
  res.send({ features: { cuck: true } });
});

app.post('/signup', (req, res) => {
  if (req.body && req.body.email && req.body.password && req.body.membership && req.body.membershipExpiry) {
    const { email, password, membership, membershipExpiry } = req.body
    const AccountDetails = mongoose.model('enigmatest', accountDetails);
    const accountObj = new AccountDetails({ _id: email, password, membership, membershipExpiry });
    return accountObj.save((err, acc) => {
      if (err) {
        return res.status(409).json({ error: `Error When saving Account ${err}` })
      }
      return res.status(201).end(`signup Sucessful ${acc._id}`)
    })
  }
  return res.status(400).json({ error: 'Invalid Body' })
})

app.get('/account', (req, res) => {
  if (req.headers && (req.headers.email && req.headers.password || req.headers.token)) {
    const { email, password, token } = req.headers
    const AccountDetails = mongoose.model('enigmatest', accountDetails);

    if (token) {
      return AccountDetails.findOne({ token }, (err, acc) => {

        if (acc) {
          const currentTime = Math.round(new Date().getTime() / 1000);
          if (currentTime < acc.token.split('/').pop()){
            return res.status(200).json({authToken: acc})
          } else {
            const timeStampTomorrow = currentTime + (24 * 3600);
            acc.token = `${Math.random().toString(36).substring(2, 15)}/${timeStampTomorrow}`;
            acc.save(() => { "saved New Token" })
            return res.status(200).json({authToken: acc})
          }
        } else {
          return res.status(400).json({ error: 'No account found' })
        }
      })
    }

    return AccountDetails.findOne({ _id: email, password }, (err, acc) => {
      if (err) {
        return res.status(400).json({ error: `Something went wrong ${err}` })
      }
      if (!acc) {
        return res.status(401).json({ error: `Invalid Credentials ${email}, ${password}` })
      }
      const timeStamp = Math.round(new Date().getTime() / 1000);
      const timeStampTomorrow = timeStamp + (24 * 3600);
      acc.token = `${Math.random().toString(36).substring(2, 15)}/${timeStampTomorrow}`;
      acc.save(() => { "saved Token" })
      return res.status(200).json({authToken: acc.token})
    })
  }
  return res.status(400).json({ error: 'Invalid Headers' })
})

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
  return mongoose.connect('mongodb://35.246.119.118:27017/enigmatest', { keepAlive: 1, useNewUrlParser: true });
}