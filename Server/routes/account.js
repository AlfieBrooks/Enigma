import express from 'express';
import mongoose from 'mongoose';

import { companyAccountSchema, interpreterAccountSchema } from '../schemas';

const router = express.Router();

const CompanyUsers = mongoose.model('company_users', companyAccountSchema);
const InterpreterUsers = mongoose.model('interpreter_users', interpreterAccountSchema);

router.post('/sign-up', async (req, res) => {
  let user;

  try {
    if (req.body.account_type === 'Company') {
      user = await CompanyUsers.create(req.body);
    } else {
      user = await InterpreterUsers.create(req.body);
    };
    res.send(user);
  } catch(err) {
    res.status(400).json({ error: `Error trying to sign up - ${err}` });
  }
});

router.get('/sign-in', async (req, res) => {
  const { email, password } = req.headers;

  try {
    let companyUsers = await CompanyUsers.findOne({ email, password });

    if(!companyUsers) {
      let interpreterUsers = await InterpreterUsers.findOne({ email, password });

      if(!interpreterUsers) {
        res.status(400).json({ error: `Error trying to sign in - Account not found` });
      }
      res.send(interpreterUsers);
    } else {
      res.send(companyUsers);
    }
  } catch(err) {
    res.status(400).json({ error: `Error trying to sign in - ${err}` });
  }
});

router.post('/update-details', async (req, res) => {
  let user;
  const { _id } = req.headers;

  try {
    if (req.body.account_type === 'Company') {
      user = await CompanyUsers.findByIdAndUpdate(_id, { $set: req.body }, { new: true });
    } else {
      user = await InterpreterUsers.findByIdAndUpdate(_id, { $set: req.body }, { new: true });
    };
    res.send(user);
  } catch(err) {
    res.status(400).json({ error: `Error trying to update account details - ${err}` });
  }
});

export default router;
