import express from 'express';
import mongoose from 'mongoose';

import { companyAccountSchema, interpreterAccountSchema } from '../schemas';

const router = express.Router();

const CompanyUsers = mongoose.model('company_users', companyAccountSchema);
const InterpreterUsers = mongoose.model('interpreter_users', interpreterAccountSchema);

router.get('/company-users', async (req, res) => {
  try {
    let users = await CompanyUsers.find();
    res.send(users);
  } catch(err) {
    res.status(400).json({ error: `Error getting company users - ${err}` });
  }
});

router.get('/interpreter-users', async (req, res) => {
  try {
    let users = await InterpreterUsers.find();
    res.send(users);
  } catch(err) {
    res.status(400).json({ error: `Error getting interpreter users - ${err}` });
  }
});

export default router;
