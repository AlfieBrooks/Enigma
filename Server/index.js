import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { accountDetails } from './schemas/singup'

const app = express();
//Commenting out until 443 works in gcp
//const port = 443  
const port = 8080

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
      return res.status(201).json({success: acc._id})
    })
  }
  return res.status(400).json({ error: 'Invalid Body' })
})

app.get('/account', (req, res) => {
  if (req.headers && req.headers.email && req.headers.password) {
    const { email, password } = req.headers
    const AccountDetails = mongoose.model('enigmatest', accountDetails);
    return AccountDetails.findOne({_id: email, password}, (err, acc) => {
      if (err){
        return res.status(400).json({ error: `Something went wrong ${err}`  })
      }
      if (!acc) {
        return res.status(401).json({ error: `Invalid Credentials ${email}, ${password}`  })
      }
      return res.status(200).json({success: acc._id})
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
