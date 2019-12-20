
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 443
app.use(cors());

app.get('/config', (req, res) => {
  res.send({features:{cuck:true}});
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);