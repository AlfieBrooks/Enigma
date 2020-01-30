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
    res.status(200).json({ user });
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

export default router;
